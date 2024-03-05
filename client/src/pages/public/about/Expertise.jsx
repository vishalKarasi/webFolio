import React, { useEffect } from "react";
import { getExpertise } from "@src/app/services/expertiseSlice.js";
import SkillCard from "@src/components/SkillCard/SkillCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import Model from "@src/components/model/Model.jsx";

function Expertise() {
  const dispatch = useDispatch();
  const { EXPERTISES, status, message } = useSelector(
    (state) => state.expertise
  );

  const expertise = EXPERTISES.map((expertise) => {
    return (
      <SkillCard
        key={expertise._id}
        level={expertise.level}
        image={expertise.image}
      />
    );
  });

  useEffect(() => {
    dispatch(getExpertise());
  }, [dispatch]);

  return (
    <>
      {status === "loading" && <Model type="loading" />}
      <h1>Expertise</h1>
      {status === "success" && expertise}
      {status === "error" && <Model type="error" messaage={message} />}
    </>
  );
}

export default Expertise;
