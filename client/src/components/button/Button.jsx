import React, { memo, useCallback } from "react";
import "./button.scss";

function Button(props) {
  const { label, icon, type, disabled, onClick, className } = props;
  const handleClick = useCallback(onClick, [onClick]);
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={className}
    >
      {icon && icon}
      {label && <label>{label}</label>}
    </button>
  );
}

export default memo(Button);
