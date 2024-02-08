import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Model from "@src/components/model/Model.jsx";
import { getExperience } from "@app/services/experienceSlice.js";

function Experience() {
  const dispatch = useDispatch();
  const { EXPERIENCES, status } = useSelector((state) => state.experience);

  useEffect(() => {
    dispatch(getExperience());
  }, [dispatch]);
  return (
    <>
      <h1>Expertise</h1>
      {EXPERIENCES.length === 0 ? (
        <Model type="error" messaage="No Experience :(" />
      ) : (
        EXPERIENCES.map((experience) => {
          return (
            <article key={experience.id}>
              <img src={experience.image} alt="" />
              <div>
                <label>Company:</label>
                <p>{experience.company}</p>
              </div>
              <div>
                <label>Position:</label>
                <p>{experience.position}</p>
              </div>
              <div>
                <label>Technologies:</label>
                <p>{experience.technologies}</p>
              </div>
              <div>
                <label>StartData:</label>
                <p>{experience.startDate}</p>
              </div>
              <div>
                <label>EndDate:</label>
                <p>{experience.endDate}</p>
              </div>
            </article>
          );
        })
      )}
    </>
  );
}

export default Experience;
