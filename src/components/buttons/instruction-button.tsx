import React, { useState } from "react";
import Image from "next/image";
import useSound from "use-sound";

import WarningIcon from "/public/assets/icon/warning.png";
import InstructionModal from "../modal/InstructionModal";

const InstructionButton = () => {
  const [isOpenModalInstruction, setIsOpenModalInstruction] = useState(false);
  const [play] = useSound("/assets/sounds/clickButton.mp3");

  return (
    <>
      <div className="cursor-pointer transition-all">
        <Image
          src={WarningIcon}
          alt="quit-game-button"
          width={62}
          onClick={() => {
            play();
            setIsOpenModalInstruction((prev) => !prev);
          }}
        />
      </div>
      <InstructionModal
        isOpenModal={isOpenModalInstruction}
        setIsOpenModal={setIsOpenModalInstruction}
      />
    </>
  );
};

export default InstructionButton;
