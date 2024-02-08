import React, { useEffect } from "react";
import "./popup.scss";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Button from "../button/Button.jsx";
import { Cancel } from "@src/assets/icons/ButtonIcons.jsx";
import { getDataById, toggle } from "@src/app/services/uiSlice.js";

function Popup() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id, popupData } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(getDataById({ id, pathname }));
  }, [id]);

  return (
    <section className="overlay">
      <article className="popup">
        <img src={popupData.image} alt="image" />
        <div className="details">
          <h1>{popupData.title}</h1>
          <p>{popupData.description}</p>
          <p>{popupData.technologies}</p>
          <p>{popupData.date}</p>
          <a href={popupData.url}>Demo</a>
        </div>
        <Button
          icon={<Cancel />}
          className="closeBtn"
          onClick={() => {
            dispatch(toggle("popup"));
          }}
        />
      </article>
    </section>
  );
}

export default Popup;
