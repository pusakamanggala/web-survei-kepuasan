import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SummaryCard = (props) => {
  const navigate = useNavigate();
  //function to animate number on card
  function useAnimatedNumber(duration = 1000, startValue = 0, endValue = 100) {
    const [value, setValue] = useState(startValue);

    useEffect(() => {
      let startTime;
      let requestId;

      function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;

        const progress = Math.min(elapsedTime / duration, 1);
        const currentValue = Math.round(
          startValue + progress * (endValue - startValue)
        );
        setValue(currentValue);

        if (progress < 1) {
          requestId = requestAnimationFrame(animate);
        }
      }

      requestId = requestAnimationFrame(animate);

      return () => {
        cancelAnimationFrame(requestId);
      };
    }, [duration, startValue, endValue]);

    return value;
  }

  const cardValue = useAnimatedNumber(2000, 0, `${props.cardValue}`);

  return (
    <button
      className="rounded-md shadow-md overflow-hidden grid lg:grid-cols-5 bg-white justify-center text-primary-color hover:scale-105 transform transition duration-500 ease-in-out"
      onClick={() => navigate(props.route)}
      title="Klik untuk melihat detail"
    >
      <div className="h-24 lg:col-span-2 justify-center flex items-center md:p-6 p-4">
        <FontAwesomeIcon icon={props.icon} className="h-full" />
      </div>
      <div className="pb-4 md:p-4 lg:col-span-3  text-center md:text-start text-3xl font-bold">
        {props.cardValue === "..."
          ? "..."
          : props.cardValue === "Error"
          ? "Error"
          : cardValue}
        <h2 className="text-base font-semibold ">{props.cardTitle}</h2>
      </div>
    </button>
  );
};

export default SummaryCard;
