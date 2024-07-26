"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import useSound from "use-sound";
import clsx from "clsx";

import { AlertModalProps } from "@/types/type";

import DiceGameBoard from "@/assets/information-game/dice-game.png";
import SessionInfoGameBoard from "@/assets/information-game/sesi-game.png";
import ModalItemGameBoard from "@/assets/information-game/list-item-game.png";
import ResultDice from "@/assets/information-game/dice-result-w-game.png";

interface InstructionModalProps extends AlertModalProps {
  content?: string;
}

const InstructionModal = ({
  isOpenModal,
  setIsOpenModal,
}: InstructionModalProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [play] = useSound("/assets/sounds/clickButton.mp3");
  const instructionModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpenModal) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [isOpenModal]);

  useEffect(() => {
    const modalElement = document.getElementById(
      "my_modal_9"
    ) as HTMLDialogElement;

    if (modalOpen && modalElement) {
      scrollToTop();
      modalElement.showModal();
    } else if (!modalOpen && modalElement) {
      modalElement.close();
    }
  }, [modalOpen]);

  const closeHandler = () => {
    play();
    setIsOpenModal((prevValue) => !prevValue);
  };

  const scrollToTop = () => {
    window.requestAnimationFrame(() => {
      if (instructionModalRef.current !== null) {
        instructionModalRef.current.scrollTop = 0;
      }
    });
  };

  return (
    <dialog id="my_modal_9" className="modal">
      <div
        className={clsx(
          "modal-box w-11/12 max-w-full max-h-[96%] font-fredoka bg-slate-100 shadow-lg",
          "animate-show-content-animation text-black"
        )}
        ref={instructionModalRef}
      >
        <h3 className="font-bold text-lg text-back mb-3 underline">
          Pentunjuk Permainan
        </h3>
        <br />
        <ul>
          <li>
            <h3 className="pt-2 font-bold text-lg text-back">Cara Bermain</h3>
            <p>
              Untuk membuat karakter berjalan cukup <b>klik tombol DADU</b> yang
              ada ditengah papan permainan, atau <b>klik tombol MAJU</b> di
              pojok kiri atas.
            </p>
            <Image
              className="m-auto my-4"
              src={DiceGameBoard}
              alt="tombol-dadu"
              width={500}
            />

            <p>
              Hasil kocokan dadu dapat dilihat pada kotak <b>MAJU</b> yang ada
              pojok kiri atas.
            </p>
            <Image
              className="m-auto my-4"
              src={ResultDice}
              alt="tombol-dadu"
              width={180}
            />
          </li>
          <li>
            <h3 className="pt-2 font-bold text-lg text-back">
              Giliran Bermain
            </h3>
            <p>
              Untuk melihat giliran siapa yang berjalan, cukup perhatikan kotak{" "}
              <b>SESI PEMAIN</b> yang berada di pojok kiri atas.
            </p>

            <Image
              className="m-auto my-4"
              src={SessionInfoGameBoard}
              alt="tombol-dadu"
              width={250}
            />
          </li>
          <li>
            <h3 className="pt-2 font-bold text-lg text-back">
              Informasi Barang yang dibeli
            </h3>
            <p>
              Untuk melihat alat tulis yang dimiliki / berhasil dibeli, klik
              tombol nama pemain di pojok kanan atas.
            </p>
            <Image
              className="m-auto my-4"
              src={ModalItemGameBoard}
              alt="tombol-dadu"
              width={500}
            />
          </li>
          <li>
            <h3 className="font-bold text-lg text-back">Penentu kemenangan</h3>
            <p>
              Penentu kemenangan adalah jumlah alat tulis yang berhasil dibeli
              pemain
              <span className="italic font-semibold">
                (5 alat tulis untuk permainan mode 2 orang dan 3 alat tulis
                untuk permainan mode 1 orang)
              </span>
            </p>
          </li>
        </ul>

        <div className="w-full flex justify-end mt-6 transition-all">
          <button
            className={clsx(
              "close-button button btn bg-red-400 text-white px-12 ",
              "hover:bg-slate-500"
            )}
            onClick={closeHandler}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default InstructionModal;
