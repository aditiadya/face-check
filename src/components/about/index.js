// BadRequest.js
import React from 'react';

const BadRequest = () => {
  const styles = {
    container: {
      padding: '40px',
      maxWidth: '1200px',
      margin: 'auto',
      fontFamily: "'Roboto', sans-serif",
      lineHeight: '1.8',
      color: '#333',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      color: '#0056D2',
      fontSize: '2rem',
      marginBottom: '20px',
      textAlign: 'center',
    },
    subheading: {
      color: '#0056D2',
      fontSize: '1.5rem',
      margin: '20px 0 10px',
    },
    paragraph: {
      fontSize: '1rem',
      marginBottom: '15px',
    },
    list: {
      paddingLeft: '20px',
      marginBottom: '20px',
    },
    listItem: {
      fontSize: '1rem',
      marginBottom: '10px',
    },
    highlight: {
      fontWeight: 'bold',
      color: '#0056D2',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Us</h1>
      <p style={styles.paragraph}>
        Welcome to <span style={styles.highlight}>WebAttend</span>, your trusted partner in modern attendance management. 
        Whether your team is working remotely or attending in person, WebAttend provides a seamless, secure, 
        and reliable solution to track and manage attendance effectively.
      </p>
      <h2 style={styles.subheading}>Who We Are</h2>
      <p style={styles.paragraph}>
        At <span style={styles.highlight}>WebAttend</span>, we are a passionate team of tech innovators dedicated to 
        creating smarter ways to streamline attendance processes. We understand the challenges organizations face 
        in balancing remote and physical workflows, and we’re here to bridge the gap with cutting-edge technology.
      </p>
      <h2 style={styles.subheading}>What We Offer</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <span style={styles.highlight}>Hybrid Attendance Tracking:</span> Our system supports both remote and on-site attendance, ensuring that every team member is accounted for, no matter where they are.
        </li>
        <li style={styles.listItem}>
          <span style={styles.highlight}>Key-Based Security:</span> Attendance marking is safeguarded with unique keys, providing an extra layer of security against unauthorized access.
        </li>
        <li style={styles.listItem}>
          <span style={styles.highlight}>IP Address Verification:</span> For remote attendees, we implement IP-based restrictions, ensuring attendance is marked only from authorized locations.
        </li>
        <li style={styles.listItem}>
          <span style={styles.highlight}>Facial Recognition Integration:</span> Incorporating advanced facial recognition technology ensures a hassle-free, quick, and accurate attendance process.
        </li>
      </ul>
      <h2 style={styles.subheading}>Why Choose WebAttend?</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <span style={styles.highlight}>Flexibility:</span> Support for both remote and physical attendance.
        </li>
        <li style={styles.listItem}>
          <span style={styles.highlight}>Accuracy:</span> Advanced technology to ensure error-free tracking.
        </li>
        <li style={styles.listItem}>
          <span style={styles.highlight}>Security:</span> Robust measures, including key-based validation and IP restrictions.
        </li>
        <li style={styles.listItem}>
          <span style={styles.highlight}>Scalability:</span> Suitable for organizations of any size, from small teams to large enterprises.
        </li>
      </ul>
      <h2 style={styles.subheading}>Our Vision</h2>
      <p style={styles.paragraph}>
        We envision a world where attendance management is effortless, secure, and adaptable to every 
        organization’s unique needs. At WebAttend, we are committed to empowering businesses and institutions 
        with the tools to focus on growth and productivity while leaving attendance challenges behind.
      </p>
      <p style={styles.paragraph}>
        Let <span style={styles.highlight}>WebAttend</span> redefine how you manage attendance—securely, efficiently, and with confidence.
      </p>
    </div>
  );
};

export default BadRequest;
