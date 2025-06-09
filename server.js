const express = require('express');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const md = require("machine-digest");
const utils = require("./license/utils");
const config = require("./license/config");
const logger = require("./license/logger");
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Redis = require('redis');

// Initialize Express App
const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from the frontend
    credentials: true, // Allow cookies to be sent
}));
app.use(express.json({ limit: '5mb' }));

const saltRounds = 10;
const session = require('express-session');
const PORT = process.env.PORT || 3003;

// Temporary user storage (replace with actual database later)
const users = [];

// Session Middleware
app.use(session({
    secret: 'your_secret_key',  // Replace with a secure key
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
const redisClient = Redis.createClient();
redisClient.on('error', (err) => console.log('Redis Client Error', err));

// Passport Local Strategy for login
passport.use(new LocalStrategy(async (username, password, done) => {
    redisClient.hgetall(username, async (err, user) => {
        if (err || !user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    redisClient.hgetall(username, (err, user) => {
        done(err, user);
    });
});
 
const ip = require('ip');

// Middleware to check if the request is from a local IP (Wi-Fi network)
const isIpAllowed = (req, res) => {
    let userIp = req.ip;
    console.log("Raw IP:", userIp);  // Debugging line

    // If behind a proxy, use the X-Forwarded-For header (which can be an array)
    if (req.headers['x-forwarded-for']) {
        userIp = req.headers['x-forwarded-for'].split(',')[0]; // Get the first IP in the list
        console.log("Forwarded IP:", userIp);  // Debugging line
    }

    // If it's IPv6 to IPv4, strip the ::ffff: part
    if (userIp.startsWith('::ffff:')) {
        userIp = userIp.slice(7);
        console.log("Stripped IPv6 IP:", userIp);  // Debugging line
    }

    // Define allowed subnet (assuming your local network uses 192.168.0.0/24)
    const allowedSubnet = '192.168.0.0/24';

    // Check if the user's IP is in the allowed subnet or is localhost
    const isLocalhost = userIp === '127.0.0.1' || userIp === 'localhost';
    const isInAllowedSubnet = ip.cidrSubnet(allowedSubnet).contains(userIp);
    
    console.log("Is Localhost:", isLocalhost); // Debugging line
    console.log("Is IP in Allowed Subnet:", isInAllowedSubnet); // Debugging line

    if (isLocalhost || isInAllowedSubnet) {
        return res.status(200).json({ success: true }); // IP is allowed
    } else {
        return res.status(403).json({ success: false }); // IP is not allowed
    }
};

// Define the route that will be hit by the React component
app.get('/check-ip', isIpAllowed);


// Define Paths and Key Variables
const keyPath = path.join(__dirname, 'key.txt');
const licenseServer = "http://localhost:3002/v1/license";
const publicKeyPath = path.join(__dirname, "license", "sample.public.pem");
let PublicKey;

// Load Public Key
try {
    const publicKeyBuffer = fs.readFileSync(publicKeyPath);
    PublicKey = publicKeyBuffer.toString("utf8");
    logger.info("Public key loaded successfully.");
} catch (err) {
    logger.error(`Failed to read public key file: ${err.message}`);
    process.exit(1); // Exit process if reading fails
}

// License Check Function
const checkLicense = async (licenseKey) => {
    logger.info("Verifying license");

    const machineId = md.get().digest;
    let _license;

    try {
        const params = {
            method: "POST",
            body: JSON.stringify({ id: machineId, key: licenseKey }),
            headers: { "Content-Type": "application/json" },
        };

        const res = await fetch(licenseServer, params);
        const resData = await res.json();

        if (resData.status !== 0) {
            throw new Error(`License server error. Status code: ${resData.status}`);
        }
        _license = resData.license;
    } catch (fetchErr) {
        throw new Error(`License server fetch error: ${fetchErr.message}`);
    }

    try {
        const buf = Buffer.from(_license, "hex");
        const decryptedLicense = utils.crypt(PublicKey, buf, false).toString();
        const license = JSON.parse(decryptedLicense);

        const isValid = license.key === licenseKey &&
                        license.machine === machineId &&
                        license.identity === config.identity &&
                        (license.meta.persist || 
                         (license.meta.startDate < Date.now() && 
                          license.meta.endDate > Date.now()));

        return isValid;
    } catch (decryptErr) {
        throw new Error(`License decryption/validation error: ${decryptErr.message}`);
    }
};
app.get("/check-ip", (req, res) => {
    const clientIp = req.ip || req.connection.remoteAddress;
    if (isIpAllowed(clientIp)) {
      res.status(200).send("IP allowed");
    } else {
      res.status(403).send("Forbidden");
    }
  });
  
// Check License on Startup
const validateKeyOnStartup = async () => {
    if (fs.existsSync(keyPath)) {
        try {
            const key = fs.readFileSync(keyPath, 'utf8');
            const isValid = await checkLicense(key);
            return isValid;
        } catch (error) {
            return false;
        }
    } else {
        return false;
    }
};

// Routes
app.get("/license/checkkey", async (req, res) => {
    try {
        const isValid = await validateKeyOnStartup();
        res.json({ valid: isValid });
    } catch (error) {
        res.status(500).json({ valid: false });
    }
});

app.post("/license/validatekey", async (req, res) => {
    const { key } = req.body;
    if (!key) {
        return res.status(400).json({ success: false, message: 'No key provided' });
    }

    fs.writeFile(keyPath, key, async (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Failed to save key' });
        }

        try {
            const isValid = await checkLicense(key);
            if (isValid) {
                res.json({ success: true });
            } else {
                res.status(400).json({ success: false, message: 'License validation failed' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'License validation error' });
        }
    });
});



// Routes
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Fetch the user's data from Redis
        client.hgetall(username, async (err, user) => {
            if (err || !user) {
                return res.status(401).json({ message: "User not found" });
            }

            // Verify the password
            const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
            if (isPasswordValid) {
                res.json({ message: "Login successful" });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});



app.post("/save-image", async (req, res) => {
    const { image } = req.body;

    if (!image) {
        return res.status(400).json({ success: false, message: "No image provided" });
    }

    try {
        const imageId = Date.now().toString(); // Unique ID for the image
        const base64Image = image.split(",")[1]; // Remove the prefix if present
        await redisClient.set(imageId, base64Image); // Store image in Redis

        res.json({ success: true, message: "Image saved successfully", id: imageId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to save image" });
    }
});
    

  app.get("/image/:id", async (req, res) => {
    const imageId = req.params.id;

    try {
        // Retrieve the image from Redis
        redisClient.get(imageId, (err, image) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Error retrieving image" });
            }
            if (!image) {
                return res.status(404).json({ success: false, message: "Image not found" });
            }

            // Send the image data back
            res.set('Content-Type', 'image/png'); // Adjust based on your image type
            res.send(Buffer.from(image, 'base64')); // Assuming you stored the image as base64
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to retrieve image" });
    }
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
