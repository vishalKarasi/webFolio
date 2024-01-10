import React from "react";
import { Link } from "react-router-dom";
import school from "@assets/img/school.png";
import college from "@assets/img/college.png";

function AboutMe() {
  const EDUCATION = [
    {
      image: school,
      name: "Infant Jesus High School",
      year: "2006-2018",
      education: "Secondary School Certification",
      grade: "84%",
    },
    {
      image: college,
      name: "L.S Raheja College",
      year: "2018-2020",
      education: "Higher Secondary Certification",
      grade: "79%",
    },
    {
      image: college,
      name: "L.S Raheja College",
      year: "2020-2023",
      education: "Bachelor's of Science in Information and Technology",
      grade: "8.1cgpa",
    },
  ];
  return (
    <>
      <h1>AboutMe</h1>
      <article className="intro">
        <h2>Intro</h2>
        Looking for a web developer with a passion for creating exceptional user
        experiences? Look no further than me,
        <span> Vishal Karasi</span>. I discovered my interest for web
        development after creating my first navbar in high school. Since then,
        I've been an active member of the web development community and have
        honed my skills in creating intuitive, user-friendly websites. My
        greatest strengths are my
        <span> creativity and quick learning </span>
        abilities, which have helped me extend my expertise to backend
        development and logo design. I'm a<span> perfectionist </span>at heart
        and am always striving to make things better. From simple, small
        projects to large and complex ones, I've worked on a{" "}
        <Link to="/work">
          <u>variety of projects</u>
        </Link>
        . I'm excited to collaborate with you and help bring your vision to
        life.
      </article>
      <h2 className="quote">
        "Web Development is my <span>Hobby</span> Passion"
      </h2>
      <article className="info">
        <ul>
          <h2>Strengths</h2>
          <li>Creativity</li>
          <li>Perfectionist</li>
          <li>Quick Learner</li>
        </ul>
        <ul>
          <h2>Hobbies</h2>
          <li>Cooking</li>
          <li>Anime/Games</li>
          <li>Cycling</li>
        </ul>
      </article>
      <section className="education">
        <h2>Education</h2>
        {EDUCATION.map((edu, index) => (
          <article key={index}>
            <img src={edu.image} />
            <h2>{edu.name}</h2>
            <strong>{edu.education}</strong>
            <div className="row">
              <p>{edu.year}</p>
              <p>{edu.grade}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

export default AboutMe;
