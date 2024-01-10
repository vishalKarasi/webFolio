import React, { useEffect } from "react";
import "./review.scss";
import ReviewCard from "./ReviewCard.jsx";
import Carousel from "@src/components/carousel/Carousel.jsx";
import ReviewForm from "./ReviewForm.jsx";
import { useDispatch, useSelector } from "react-redux";
import Button from "@src/components/button/Button.jsx";
import { Add } from "@src/assets/icons/ButtonIcons.jsx";
import { toggle } from "@src/app/services/uiSlice.js";
import { getReview } from "@src/app/services/reviewSlice.js";
import Model from "@src/components/model/Model.jsx";

function Review() {
  const dispatch = useDispatch();
  const { form } = useSelector((state) => state.ui);
  const { REVIEWS } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getReview());
  }, [dispatch]);

  return (
    <main id="review">
      <h1>Review</h1>
      {REVIEWS.length === 0 ? (
        <Model type="error" messaage="No Reviews" />
      ) : (
        <Carousel>
          {REVIEWS.map((review) => (
            <ReviewCard {...review} key={review._id} />
          ))}
        </Carousel>
      )}
      <div className="flex">
        <Button
          icon={<Add />}
          label="Add Review"
          onClick={() => dispatch(toggle("form"))}
          className="btnPrimary"
        />
      </div>
      {form && <ReviewForm />}
    </main>
  );
}

export default Review;
