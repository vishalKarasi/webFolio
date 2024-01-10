import React from "react";
import "./service.scss";
import { Basic, Premium, Standard } from "@src/assets/icons/SocialIcons.jsx";

function Service() {
  return (
    <main id="service">
      <h1>Service</h1>
      <article>
        <Basic />
        <h1>Basic</h1>
        <p>Quick Website with WordPress</p>
        <ul>
          <h2>Benefits</h2>
          <li>Affordable pricing.</li>
          <li>Quick turnaround time.</li>
          <li>Easy management</li>
        </ul>
      </article>
      <article>
        <Standard />
        <h1>Standard</h1>
        <p>Web Development with Third-Party Libraries</p>
        <ul>
          <h2>Benefits</h2>
          <li>Customization to suit specific business needs.</li>
          <li>Improved performance with the use of external libraries.</li>
          <li>Greater flexibility in design and functionality.</li>
        </ul>
      </article>
      <article>
        <Premium />
        <h1>Premium</h1>
        <p>Bespoke Website Development from Scratch</p>
        <ul>
          <h2>Benefits</h2>
          <li>Unparalleled customization and uniqueness.</li>
          <li>Scalability for future growth.</li>
          <li>Top-tier performance, security, and functionality.</li>
        </ul>
      </article>
    </main>
  );
}

export default Service;
