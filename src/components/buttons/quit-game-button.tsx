import React, { useState } from "react";
import Image from "next/image";
import useSound from "use-sound";

import QuitIcon from "/public/assets/icon/cancel-btn.png";

// import Swal from "sweetalert2";
import ExitGameModal from "../modal/ExitGameModal";

const QuitGameButton = () => {
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [play] = useSound("/assets/sounds/clickButton.mp3");

  // const quitHandler = () => {
  //   play();
  //   Swal.fire({
  //     text: "Kamu yakin ingin keluar dari permainan ?",
  //     icon: "warning",
  //     confirmButtonColor: "#fa0101",
  //     confirmButtonText: "YA",
  //     showCancelButton: true,
  //     cancelButtonText: "TIDAK",
  //     backdrop: true,
  //     allowOutsideClick: false,
  //     allowEscapeKey: false,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       router.push("option-mode");
  //     }
  //   });
  // };

  return (
    <>
      <div className="cursor-pointer transition-all">
        <Image
          src={QuitIcon}
          alt="quit-game-button"
          width={59}
          onClick={() => {
            play();
            setIsExitModalOpen((open) => !open);
          }}
        />
      </div>
      <ExitGameModal
        content="Kamu yakin ingin keluar dari permainan ?"
        isOpenModal={isExitModalOpen}
        setIsOpenModal={setIsExitModalOpen}
      />
    </>
  );
};

export default QuitGameButton;
