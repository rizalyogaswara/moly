import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";
import useSound from "use-sound";
import { usePathname } from "next/navigation";

import ListBarangToko from "@/data/list-barang-toko.json";

import { rupiahFormat } from "@/helper/rupiahFormat";

import {
  AlertBuying2,
  WinningAlert,
  FailedBuying,
} from "@/components/modal/ToastGame";

import { AlertModalProps, itemPlayer } from "@/types/type";
interface ShopModalProps extends AlertModalProps {
  money: number;
  namePlayer: string;
  setNewMoney: React.Dispatch<React.SetStateAction<number>>;
  setItem: React.Dispatch<React.SetStateAction<itemPlayer[]>>;
  playerItem: itemPlayer[];
}

const ShopModal = ({
  isOpenModal,
  setIsOpenModal,
  content,
  money,
  setNewMoney,
  setItem,
  namePlayer,
  playerItem,
}: ShopModalProps) => {
  const [play] = useSound("/assets/sounds/clickButton.mp3");
  const [playFailedBuying] = useSound("/assets/sounds/diceClick.mp3");
  const [playWinning] = useSound("/assets/sounds/yay.mp3");
  const [errorMessage, setErrorMessage] = useState("");

  const shopModalRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const modalElement = document.getElementById(
      "my_modal_4"
    ) as HTMLDialogElement;

    if (isOpenModal && modalElement) {
      scrollToTop();
      modalElement.showModal();
      play();
    } else if (!isOpenModal && modalElement) {
      modalElement.close();
    }
  }, [isOpenModal, play]);

  const buyFunction = (price: number, name: string, srcImage: string) => {
    if (money >= price) {
      play();
      setNewMoney((prevMoney) => prevMoney - price);
      AlertBuying2(name, true);
      setItem((prevItem) => [
        ...prevItem,
        { nameItem: name, imageSrc: srcImage },
      ]);
      if (playerItem.length === 2 && pathname === "/main-game-single") {
        setTimeout(() => {
          WinningAlert(namePlayer, money);
          playWinning();
        }, 500);
      } else if (playerItem.length === 4 && pathname === "/main-game") {
        setTimeout(() => {
          WinningAlert(namePlayer, money);
          playWinning();
        }, 500);
      }
      setIsOpenModal(false);
    } else {
      playFailedBuying();
      FailedBuying(name, false);
      alert("Maaf uang anda tidak cukup 😅");

      setErrorMessage("Maaf uang anda tidak cukup 😅");

      setTimeout(() => {
        setErrorMessage("");
      }, 7000);
    }
  };

  const scrollToTop = () => {
    window.requestAnimationFrame(() => {
      if (shopModalRef.current !== null) {
        shopModalRef.current.scrollTop = 0;
      }
    });
  };

  return (
    <>
      <dialog id="my_modal_4" className="modal" style={{ zIndex: 999 }}>
        <div
          className={clsx(
            "modal-box w-11/12 max-w-6xl max-h-[96%] font-fredoka shadow-lg bg-slate-50",
            "animate-show-content-animation"
          )}
        >
          <h3 className="font-bold text-xl text-center uppercase text-black">
            Selamat datang di toko kami
          </h3>
          <p className="py-4 text-center text-lg text-black">{content}</p>
          <div className="text-center font-bold text-xl flex justify-between gap-4">
            <span className="flex text-black gap-2">
              <p>Uang {namePlayer?.toUpperCase()} : </p>
              <p>{rupiahFormat(money)}</p>
            </span>
            <span>
              <p className="text-red-500 transition text-2xl">{errorMessage}</p>
            </span>
          </div>
          <div className="grid grid-cols-5 gap-4 mt-6 transition-all">
            {ListBarangToko.map((barang) => (
              <div
                key={barang.name}
                className={clsx(
                  "rounded-md flex flex-col border border-slate-300 justify-center items-center p-4 transition cursor-pointer ",
                  `${barang.background} hover:bg-red-400`,
                  {
                    "bg-violet-300": barang.background === "bg-violet-300",
                    "bg-pink-300": barang.background === "bg-pink-300",
                    "bg-orange-300": barang.background === "bg-orange-300",
                  }
                )}
                onClick={() =>
                  buyFunction(barang.price, barang.name, barang["src-image"])
                }
              >
                <Image
                  src={barang["src-image"]}
                  alt={barang.name}
                  width={100}
                  height={100}
                />
                <p className="uppercase text-center font-bold text-black">
                  {barang.name}
                </p>
                <p className="font-bold text-black">
                  {rupiahFormat(barang.price)}
                </p>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-end mt-6 transition-all">
            <button
              className={clsx(
                "close-button button btn bg-red-400 text-white px-12 ",
                "hover:bg-slate-500"
              )}
              onClick={() => {
                setIsOpenModal(false);
                play();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ShopModal;
