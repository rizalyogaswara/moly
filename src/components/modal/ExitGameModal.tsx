import React, { useEffect } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import useSound from "use-sound";

import { AlertModalProps as ExitGameModalProps } from "@/types/type";

const ExitGameModal = ({
  content,
  isOpenModal,
  setIsOpenModal,
}: ExitGameModalProps) => {
  const router = useRouter();
  const [playTouch] = useSound("/assets/sounds/clickButton.mp3");

  useEffect(() => {
    const modalElement = document.getElementById(
      "exit-modal"
    ) as HTMLDialogElement;

    if (isOpenModal && modalElement) {
      modalElement.showModal();
    } else if (!isOpenModal && modalElement) {
      modalElement.close();
    }
  }, [isOpenModal]);

  return (
    <dialog
      id="exit-modal"
      className="modal font-fredoka animate-show-content-animation"
    >
      <div className="modal-box bg-slate-100">
        <h3 className="font-bold text-2xl text-black">Keluar Permainan</h3>
        <p className="py-4 text-xl text-black">{content}</p>
        <div className="modal-action">
          <button
            className={clsx(
              "close-button button btn bg-green-600 text-white px-12 ",
              "hover:bg-slate-500"
            )}
            onClick={() => {
              playTouch();
              setIsOpenModal((prev) => !prev);
            }}
          >
            Tutup
          </button>
          <button
            className={clsx(
              "close-button button btn bg-red-600 text-white px-12 ",
              "hover:bg-red-500"
            )}
            onClick={() => {
              playTouch();
              router.push("option-mode");
            }}
          >
            Keluar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ExitGameModal;
