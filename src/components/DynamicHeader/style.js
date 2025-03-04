import styled from "styled-components";

export const StyledDynamicHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #bfeaf5;

  .logo {
    width: 60px;
    margin: 16px;
  }
  /* 
  .heading {
    padding: 10px;
    margin: 10px;
    font-size: 24px;
    font-weight: 600;
  } */
  .nav-items {
    padding: 0px 20px;
  }
  .nav-items-list {
    display: flex;
    list-style-type: none;
  }

  .nav-items > ul > li {
    padding: 10px;
    margin: 10px;
    font-size: 24px;
    font-weight: 600;
  }

  .li-item {
    text-decoration: none;
    color: black;
  }
`;
