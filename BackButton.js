import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export const BackButton = ({ currentDate, setCurrentDate }) => {
  const handleBackButton = () => {
    const newCurrentDate = currentDate.clone();
    newCurrentDate.subtract(1, "months");
    setCurrentDate(newCurrentDate);
  };

  return (
    <div onClick={handleBackButton}>
      <ArrowBackIosIcon />
    </div>
  );
};
