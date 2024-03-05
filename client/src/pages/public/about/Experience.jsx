import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Model from "@src/components/model/Model.jsx";
import { getExperience } from "@app/services/experienceSlice.js";

function Experience() {
  const dispatch = useDispatch();
  const { EXPERIENCES, status, message } = useSelector(
    (state) => state.experience
  );

  function FDate(date) {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  const experience = EXPERIENCES.map((experience) => {
    return (
      <article key={experience.id}>
        <img src={experience.image} alt="" />
        <p label="Company:">{experience.company}</p>
        <p label="Positon:">{experience.position}</p>
        <p label="Technologies:">{experience.technologies}</p>
        <p label="StartDate:">{FDate(experience.startDate)}</p>
        <p label="StartDate:">{FDate(experience.endDate)}</p>
      </article>
    );
  });

  useEffect(() => {
    dispatch(getExperience());
  }, [dispatch]);
  return (
    <>
      {status === "loading" && <Model type="loading" />}
      <h1>Experience</h1>
      {status === "success" && experience}
      {status === "error" && <Model type="error" messaage={message} />}
    </>
  );
}

export default Experience;
