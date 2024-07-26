import React from "react";
import clsx from "clsx";
import useSound from "use-sound";

import { ButtonProps } from "@/types/type";

const DirectButton = ({
  width,
  content,
  background,
  disabled,
}: ButtonProps) => {
  const [play] = useSound("/assets/sounds/diceClick.mp3");

  const handleClick = () => {
    play();
  };

  return (
    <>
      <button
        disabled={disabled}
        className={clsx(
          "button",
          "font-fredoka font-bold py-4 rounded text-black transition mt-4",
          background ? background : "bg-[#C5F52A]",
          width ? width : "px-8 md:px-12",
          "hover:bg-slate-200 hover:text-slate-600"
        )}
        onClick={handleClick}
      >
        {content}
      </button>
    </>
  );
};

export default DirectButton;
