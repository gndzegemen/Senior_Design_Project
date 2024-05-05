import React from "react";
import './Footer.scss'

const Footer = () => {
  return (
    
   
    <div className="footer">
      <div className="top">
        <div className="item">
          <h1>Catogaries</h1>
          <span>Work</span>
          <span>Creative</span>
          <span>Game</span>
        </div>
        <div className="item">
          <h1>Links</h1>
          <span>FAQ</span>
          <span>Compare</span>
          <span>Cookies</span>
        </div>
        <div className="item">
          <h1>About</h1>
          <span>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Ipsa quod explicabo consequuntur earum velit, et unde quo deleniti nulla quasi.
            Ipsa facilis ea optio nobis perferendis fugit beatae voluptates earum.
          </span>
        </div>
        <div className="item">
          <h1>Contact</h1>
          <span>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Ipsa quod explicabo consequuntur earum velit, et unde quo deleniti nulla quasi.
            Ipsa facilis ea optio nobis perferendis fugit beatae voluptates earum.
          </span>
        </div>
      </div>

      <div className="bottom">
        <div className="left">
          <span className="logo">Ejderyaa</span>
          <span className="copyright">
            © Copyright 2023. All Rights Reserved
          </span>
        </div>
        <div className="right">
          <img src="images/payment.png" alt="" />
        </div>
      </div>
    </div>
    
  );
};

export default Footer;
