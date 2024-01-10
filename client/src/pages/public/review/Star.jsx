import * as ButtonIcon from "@assets/icons/ButtonIcons";

export const Star = (rating) => {
  const star = Array.from({ length: 5 }, (ele, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {rating >= index + 1 ? (
          <ButtonIcon.StarFull />
        ) : rating >= number ? (
          <ButtonIcon.StarHalf />
        ) : (
          <ButtonIcon.StarEmpty />
        )}
      </span>
    );
  });
  return <span className="rating">{star}</span>;
};
