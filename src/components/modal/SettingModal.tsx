import React, { useEffect } from "react";
import clsx from "clsx";

import InstructionButton from "../buttons/instruction-button";
import HomeBacksoundButton from "../buttons/home-backsound-button";
import QuitGameButton from "../buttons/quit-game-button";

import { AlertModalProps as SettingModalProps } from "@/types/type";

const SettingModal = ({
  content,
  isOpenModal,
  setIsOpenModal,
}: SettingModalProps) => {
  useEffect(() => {
    const modalElement = document.getElementById(
      "my_modal_1"
    ) as HTMLDialogElement;

    if (isOpenModal && modalElement) {
      modalElement.showModal();
    } else if (!isOpenModal && modalElement) {
      modalElement.close();
    }
  }, [isOpenModal]);

  return (
    <dialog
      id="my_modal_1"
      className="modal font-fredoka animate-show-content-animation"
    >
      <div className="modal-box bg-slate-100">
        <h3 className="font-bold text-2xl text-black">Setting</h3>
        <p className="py-4 text-xl">{content}</p>
        <div className="relative flex justify-evenly gap-4 mb-2">
          <div className="flex flex-col justify-center items-center">
            <HomeBacksoundButton />
            <p className="text-center text-black">
              Backsound <br /> Permainan
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <InstructionButton />
            <p className="text-center mt-2 text-black">
              Instruksi <br /> Permainan
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <QuitGameButton />
            <p className="text-center mt-2 text-black">
              Keluar <br /> Permainan
            </p>
          </div>
        </div>
        <div className="modal-action">
          <button
            className={clsx(
              "close-button button btn bg-red-400 text-white px-12 ",
              "hover:bg-slate-500"
            )}
            onClick={() => setIsOpenModal((prev) => !prev)}
          >
            Tutup
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default SettingModal;
