import React from "react";
import "./home.scss";
import profile from "@assets/img/Vishal_Photo.jpg";
import * as SocialIcon from "@assets/icons/SocialIcons.jsx";
import * as ButtonIcon from "@assets/icons/ButtonIcons.jsx";
import resume from "@assets/Vishal_Karasi_Resume.pdf";
import useTyping from "@components/TextTyping.jsx";
import Redirect from "@components/Redirect.jsx";
import Navlink from "@components/Navlink.jsx";

function Home() {
  const animatedText = useTyping([
    "frontend developer",
    "backend developer",
    "ui/ux designer",
    "logo designer",
  ]);

  return (
    <main id="home">
      <img src={profile} lt="" srcSet="" />
      <section className="info">
        <strong className="intro">
          <p>
            Hey there, <span>Welcome!</span>
          </p>
          <p>
            My name is <span>Vishal Karasi</span>
          </p>
          <p>
            I'm a <span>{animatedText}</span>
          </p>
        </strong>

        <ul className="socialLink">
          <Redirect icon={<SocialIcon.Facebook />} link="" />
          <Redirect icon={<SocialIcon.Instagram />} link="" />
          <Redirect icon={<SocialIcon.Twitter />} link="" />
          <Redirect
            icon={<SocialIcon.Github />}
            link="https://github.com/vishalKarasi"
          />
          <Redirect
            icon={<SocialIcon.Linkedin />}
            link="https://www.linkedin.com/in/vishal-karasi-0557a8282"
          />
        </ul>

        <div className="redirect">
          <Navlink
            path="/about"
            label="Expertise"
            icon={<ButtonIcon.Expertise />}
          />
          <Navlink path="/work" label="Project" icon={<ButtonIcon.Project />} />

          <a href={resume} download>
            <ButtonIcon.Download />
            <p>Download CV</p>
          </a>
        </div>
      </section>
    </main>
  );
}

export default Home;
