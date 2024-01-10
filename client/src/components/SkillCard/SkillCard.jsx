import React, { useCallback } from "react";
import "./skillCard.scss";

function SkillCard(props) {
  const { level, image } = props;

  const getLevels = useCallback(() => {
    const levels = [
      {
        name: "beginner",
        color: "rgb(255, 255, 178)",
        width: "40%",
        visible: true,
      },
      {
        name: "intermediate",
        color: "rgb(254, 204, 92)",
        width: "60%",
        visible: true,
      },
      {
        name: "advanced",
        color: "rgb(253, 141, 60)",
        width: "80%",
        visible: true,
      },
      {
        name: "expert",
        color: "rgb(240, 59, 32)",
        width: "100%",
        visible: true,
      },
    ];

    if (level === "beginner") {
      levels[1].visible = false;
      levels[2].visible = false;
      levels[3].visible = false;
    } else if (level === "intermediate") {
      levels[2].visible = false;
      levels[3].visible = false;
    } else if (level === "advanced") {
      levels[3].visible = false;
    }

    return levels;
  }, [level]);

  const levels = getLevels();

  return (
    <article className="skillCard">
      <img src={image} alt="skill" />
      <div className="levels">
        {levels.map((level) => (
          <div
            level-label={level.name}
            className={`${level.name}`}
            key={level.name}
            style={{
              backgroundColor: level.visible ? level.color : "var(--clr-btn)",
              width: level.width,
            }}
          ></div>
        ))}
      </div>
    </article>
  );
}

export default SkillCard;
