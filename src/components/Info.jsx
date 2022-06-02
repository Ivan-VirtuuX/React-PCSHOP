import React, { useContext } from "react";
import { AppContext } from "../context";
import backArrow from "./../assets/images/back-arrow.svg";

export const Info = ({ title, image, description, isOrderComplete }) => {
  const { setCartOpened } = useContext(AppContext);

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width={120} src={image} alt="" />
      {isOrderComplete ? (
        <h2 style={{ color: "#647CD3" }}>{title}</h2>
      ) : (
        <h2>{title}</h2>
      )}
      <p className="opacity-6">{description}</p>
      <button onClick={() => setCartOpened(false)} className="blueButton">
        <img src={backArrow} alt="" />
        Вернуться назад
      </button>
    </div>
  );
};
