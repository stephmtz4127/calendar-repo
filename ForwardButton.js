import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export const ForwardButton = ({ currentDate, setCurrentDate }) => {
  const handleForwardButton = () => {
    const newCurrentDate = currentDate.clone();
    newCurrentDate.add(1, "months");
    setCurrentDate(newCurrentDate);
  };
  return (
    <div onClick={handleForwardButton}>
      <ArrowForwardIosIcon />
    </div>
  );
};
