import React, { useEffect } from "react";
import clsx from "clsx";

import { AlertModalProps } from "@/types/type";

const AlertModal = ({
  content,
  isOpenModal,
  setIsOpenModal,
}: AlertModalProps) => {
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
        <h3 className="font-bold text-2xl text-black">Mohon maaf</h3>
        <p className="py-4 text-xl text-black">{content}</p>
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

export default AlertModal;
