import React, { useState } from "react";
import Image from "next/image";
import useSound from "use-sound";

import SettingModal from "../modal/SettingModal";

const SettingButton = () => {
  const [isOpenSettingModal, setIsOpenSettingModal] = useState(false);
  const [playTouch] = useSound("/assets/sounds/diceClick.mp3");

  return (
    <>
      <div className="fixed quit-btn right-6 bottom-4 cursor-pointer transition-all">
        <Image
          src={"/assets/icon/setting.png"}
          width={55}
          height={55}
          alt="setting-button"
          onClick={() => {
            setIsOpenSettingModal((prev) => !prev);
            playTouch();
          }}
          title="setting"
        />
      </div>
      <SettingModal
        content=""
        isOpenModal={isOpenSettingModal}
        setIsOpenModal={setIsOpenSettingModal}
      />
    </>
  );
};

export default SettingButton;
