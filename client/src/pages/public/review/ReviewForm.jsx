import React from "react";
import "@components/form/form.scss";
import Input from "@components/Input.jsx";
import { Cancel, Send } from "@assets/icons/ButtonIcons.jsx";
import Button from "@src/components/button/Button.jsx";
import { toggle } from "@src/app/services/uiSlice.js";
import { useDispatch } from "react-redux";
import { createReview } from "@src/app/services/reviewSlice.js";

function ReviewForm() {
  const dispatch = useDispatch();

  const INPUTS = [
    {
      type: "file",
      name: "image",
      errorMessage: "Image Require",
    },
    {
      label: "Name",
      type: "text",
      name: "name",
      errorMessage: "Name Require",
    },
    {
      label: "Description",
      type: "text",
      name: "description",
      errorMessage: "Description required",
    },
    {
      label: "Rating",
      type: "number",
      name: "rating",
      errorMessage: "Rating required",
      pattern: /^[1-5]$/,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    dispatch(createReview(formData));
    dispatch(toggle("form"));
  };

  return (
    <section className="overlay">
      <div className="formContainer">
        <h1>Review</h1>
        <form
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="form"
        >
          {INPUTS.map((input) => (
            <Input key={input.label} {...input} />
          ))}
          <div className="inputField">
            <textarea
              rows="4"
              className="input"
              name="message"
              required
            ></textarea>
            <label className="inputLabel">Message</label>
          </div>
          <Button
            type="submit"
            label="Submit"
            icon={<Send />}
            className="btnPrimary"
          />
        </form>
        <Button
          icon={<Cancel />}
          className="closeBtn"
          onClick={() => {
            dispatch(toggle("form"));
          }}
        />
      </div>
    </section>
  );
}

export default ReviewForm;
