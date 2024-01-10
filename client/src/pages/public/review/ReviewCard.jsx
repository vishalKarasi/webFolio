import React from "react";
import { Star } from "./Star.jsx";
import Button from "@src/components/button/Button.jsx";
import { Cancel } from "@assets/icons/ButtonIcons.jsx";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "@src/app/services/reviewSlice.js";

function ReviewCard(props) {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  const { _id, name, image, description, rating, message } = props;
  return (
    <article className="reviewCard" key={_id}>
      <img src={image} alt="pfp" />
      <h1>{name}</h1>
      <div className="rating">{Star(rating)}</div>
      <h2>{description}</h2>
      <p className="reviewMess">{message}</p>

      {accessToken && (
        <Button
          icon={<Cancel />}
          className="closeBtn"
          onClick={() => dispatch(deleteReview(_id))}
        />
      )}
    </article>
  );
}

export default ReviewCard;
