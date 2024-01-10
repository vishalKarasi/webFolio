import React, { useEffect } from "react";
import { getExpertise } from "@src/app/services/expertiseSlice.js";
import SkillCard from "@src/components/SkillCard/SkillCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import Model from "@src/components/model/Model.jsx";

function Expertise() {
  const dispatch = useDispatch();
  const { EXPERTISES, status } = useSelector((state) => state.expertise);

  useEffect(() => {
    dispatch(getExpertise());
  }, [dispatch]);

  return (
    <>
      <h1>Expertise</h1>
      {EXPERTISES.length === 0 ? (
        <Model type="error" messaage="No Skills" />
      ) : (
        EXPERTISES.map((expertise) => {
          return (
            <SkillCard
              key={expertise._id}
              level={expertise.level}
              image={expertise.image}
            />
          );
        })
      )}
    </>
  );
}

export default Expertise;
