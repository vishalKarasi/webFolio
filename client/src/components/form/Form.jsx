import React from "react";
import "./form.scss";
import { useDispatch, useSelector } from "react-redux";
import Input from "@src/components/input/Input.jsx";
import Button from "@src/components/button/Button.jsx";
import { Cancel, Tick } from "@assets/icons/ButtonIcons.jsx";
import { setEditMode, toggle } from "@src/app/services/uiSlice.js";
import { getInput } from "./formData.js";
import {
  createExperience,
  updateExperience,
} from "@src/app/services/experienceSlice";
import {
  createExpertise,
  updateExpertise,
} from "@src/app/services/expertiseSlice";
import { createProject, updateProject } from "@app/services/projectSlice";
import { useLocation } from "react-router-dom";

function Form({ type }) {
  const dispatch = useDispatch();
  const { id, editMode } = useSelector((state) => state.ui);
  const INPUTS = getInput(type);
  const { pathname } = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (editMode) {
      if (pathname === "/admin/editExperience")
        dispatch(updateExperience({ id, formData }));
      if (pathname === "/admin/editExpertise")
        dispatch(updateExpertise({ id, formData }));
      if (pathname === "/admin/editProject")
        dispatch(updateProject({ id, formData }));
      dispatch(setEditMode(false));
    } else {
      if (pathname === "/admin/editExperience")
        dispatch(createExperience(formData));
      if (pathname === "/admin/editExpertise")
        dispatch(createExpertise(formData));
      if (pathname === "/admin/editProject") dispatch(createProject(formData));
    }

    dispatch(toggle("form"));
  };

  let head = "";
  editMode ? (head += "Edit") : (head += "Add");
  if (pathname === "/admin/editExperience") head += "Experience";
  if (pathname === "/admin/editExpertise") head += "Expertise";
  if (pathname === "/admin/editProject") head += "Project";

  return (
    <section className="overlay">
      <div className="formContainer">
        <h1>{head}</h1>
        <form
          method="POST"
          encType="multipart/form-data"
          className="form adminForm"
          onSubmit={handleSubmit}
        >
          {INPUTS.map((input, index) => (
            <Input key={index} {...input} />
          ))}
          <Button
            type="submit"
            label="Confirm"
            icon={<Tick />}
            className="btnPrimary"
          />
        </form>
        <Button
          icon={<Cancel />}
          className="closeBtn"
          onClick={() => {
            dispatch(toggle("form"));
            dispatch(setEditMode(false));
          }}
        />
      </div>
    </section>
  );
}

export default Form;
