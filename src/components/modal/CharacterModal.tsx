import React, { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import useSound from "use-sound";

import Penguin from "@/assets/avatar/penguin.png";
import Kangoroo from "@/assets/avatar/kangoroo.png";
import Bajai from "@/assets/avatar/bajai.png";
import Kapal from "@/assets/avatar/ship.png";

import { ModalChooseCharacterProps } from "@/types/type";

const CharacterModal = ({
  isOpenModal,
  modalController,
  setAvatarForPlayer1,
  setAvatarForPlayer2,
  whoChooseAvatar,
}: ModalChooseCharacterProps) => {
  const [play] = useSound("/assets/sounds/clickButton.mp3");

  const dataPlayer1 = JSON.parse(sessionStorage.getItem("player-1") as string);
  const dataPlayer2 = JSON.parse(sessionStorage.getItem("player-2") as string);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (isOpenModal) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [isOpenModal]);

  useEffect(() => {
    const modalElement = document.getElementById(
      "my_modal_4"
    ) as HTMLDialogElement;

    if (modalOpen && modalElement) {
      modalElement.showModal();
    } else if (!modalOpen && modalElement) {
      modalElement.close();
    }
  }, [modalOpen]);

  const setImageController = (imageUrl: string) => {
    play();

    if (whoChooseAvatar == 1) {
      setAvatarForPlayer1(imageUrl);
    } else if (whoChooseAvatar == 2) {
      setAvatarForPlayer2?.(imageUrl);
    }

    modalController();
  };

  return (
    <dialog id="my_modal_4" className="modal">
      <div
        className={clsx(
          "modal-box w-11/12 max-w-5xl font-fredoka bg-slate-100 shadow-lg",
          "animate-show-content-animation"
        )}
      >
        <h3 className="font-bold text-lg text-black md:text-2xl">Hallo ! 😊</h3>
        <p className="py-4 text-black md:text-xl">
          Silahkan pilih karakter anda dengan melakukan klik pada salah satu
          gambar di bawah ini.
        </p>

        <div className="modal-action flex justify-center items-center gap-8 transition-all">
          <div className="flex items-center flex-wrap">
            {dataPlayer1?.avatarName === "Penguin" ||
            dataPlayer2?.avatarName === "Penguin" ? (
              <></>
            ) : (
              <Image
                src={Penguin}
                alt="Penguin-image"
                width={200}
                className={clsx(
                  "cursor-pointer transition duration-150",
                  "hover:drop-shadow-lg hover:[filter:drop-shadow(0px_3px_10px_#3e86e3)]"
                )}
                onClick={() => setImageController("Penguin")}
              />
            )}

            {dataPlayer1?.avatarName === "Kangoroo" ||
            dataPlayer2?.avatarName === "Kangoroo" ? (
              <></>
            ) : (
              <Image
                src={Kangoroo}
                alt="Kangoroo-image"
                width={200}
                className={clsx(
                  "cursor-pointer transition duration-150",
                  "hover:drop-shadow-lg hover:[filter:drop-shadow(0px_3px_10px_#3e86e3)]"
                )}
                onClick={() => setImageController("Kangoroo")}
              />
            )}

            {dataPlayer1?.avatarName === "Bajai" ||
            dataPlayer2?.avatarName === "Bajai" ? (
              <></>
            ) : (
              <Image
                src={Bajai}
                alt="Bajai-image"
                width={200}
                className={clsx(
                  "cursor-pointer transition duration-150",
                  "hover:drop-shadow-lg hover:[filter:drop-shadow(0px_3px_10px_#3e86e3)]"
                )}
                onClick={() => setImageController("Bajai")}
              />
            )}

            {dataPlayer1?.avatarName === "Kapal" ||
            dataPlayer2?.avatarName === "Kapal" ? (
              <></>
            ) : (
              <Image
                src={Kapal}
                alt="Kapal-image"
                width={200}
                className={clsx(
                  "cursor-pointer transition duration-150",
                  "hover:drop-shadow-lg hover:[filter:drop-shadow(0px_3px_10px_#3e86e3)]"
                )}
                onClick={() => setImageController("Kapal")}
              />
            )}
          </div>
        </div>
        <div className="w-full flex justify-end mt-6 transition-all">
          <button
            className={clsx(
              "close-button button btn bg-red-400 text-white px-12 ",
              "hover:bg-slate-500"
            )}
            onClick={modalController}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default CharacterModal;
