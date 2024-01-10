import React, { useEffect } from "react";
import "./work.scss";
import { useDispatch, useSelector } from "react-redux";
import { ViewMore } from "@assets/icons/ButtonIcons.jsx";
import Button from "@src/components/button/Button.jsx";
import { getProject } from "@src/app/services/projectSlice.js";
import Popup from "@src/components/Popup/Popup.jsx";
import { setId, toggle } from "@src/app/services/uiSlice.js";
import Model from "@src/components/model/Model.jsx";

function Work() {
  const dispatch = useDispatch();
  const { popup } = useSelector((state) => state.ui);
  const { PROJECTS } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(getProject());
  }, [dispatch]);

  return (
    <main id="work">
      <h1>Work</h1>
      <section className="projectContainer">
        {PROJECTS.length === 0 ? (
          <Model type="error" messaage="No Projects" />
        ) : (
          PROJECTS.map((project) => (
            <article key={project._id} className="card">
              <img src={project.image} className="cardImg" />
              <div className="cardContent">
                <h1 className="cardTitle">{project.title}</h1>
                <Button
                  label="More&nbsp;Info"
                  icon={<ViewMore />}
                  className="btnPrimary"
                  onClick={() => {
                    dispatch(toggle("popup"));
                    dispatch(setId(project._id));
                  }}
                />
              </div>
            </article>
          ))
        )}
      </section>
      {popup && <Popup />}
    </main>
  );
}

export default Work;
