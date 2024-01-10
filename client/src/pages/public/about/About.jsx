import React from "react";
import "./about.scss";
import { Info, Education, Skill } from "@src/assets/icons/ButtonIcons.jsx";
import Tabs from "@src/components/Tabs/Tabs.jsx";
import AboutMe from "./AboutMe.jsx";
import Expertise from "./Expertise.jsx";
import Experience from "./Experience.jsx";

function About() {
  const TABS = [
    {
      label: "AboutMe",
      icon: <Info />,
      content: <AboutMe />,
    },

    {
      label: "Experience",
      icon: <Education />,
      content: <Experience />,
    },
    {
      label: "Expertise",
      icon: <Skill />,
      content: <Expertise />,
    },
  ];

  return (
    <main id="about">
      <Tabs tabs={TABS} />
    </main>
  );
}

export default About;
