import React from "react";
import * as SocialIcon from "@assets/icons/SocialIcons.jsx";
import "./footer.scss";
import Redirect from "@components/Redirect.jsx";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer id="footer">
      <ul className="socialLink">
        <Redirect icon={<SocialIcon.Facebook />} link="" />
        <Redirect icon={<SocialIcon.Instagram />} link="" />
        <Redirect icon={<SocialIcon.Twitter />} link="" />
        <Redirect icon={<SocialIcon.Github />} link="" />
        <Redirect icon={<SocialIcon.Linkedin />} link="" />
      </ul>

      <nav className="sitemap">
        <Link to="/about">About</Link>
        <Link to="/work">Work</Link>
        <Link to="/service">Service</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <article>
        <div className="policy">
          <Link to="/terms">Privacy</Link>
          <span className="divider"></span>
          <Link to="/security">Security</Link>
        </div>

        <p className="copyright">
          All rights reserved under copyright &#169; 2023
          <span> Vishal Karasi</span>
        </p>

        <Link to="/" className="logo">
          <span>&lt;</span>
          <b>web</b>
          <span>Folio&gt;</span>
        </Link>
      </article>
    </footer>
  );
}

export default Footer;
