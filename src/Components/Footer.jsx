import React from "react";
import "../Components/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} Mern Series Project. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://github.com/AbhiishekTyagi" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/abhishek-tyagi-514716223/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;