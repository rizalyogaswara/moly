"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSound from "use-sound";

import clsx from "clsx";

import { motion } from "framer-motion";

import DirectButton from "../../components/buttons/direct-button";
import FormMultiPlayer from "@/components/multi-player-content/FormMultiPlayer";
import AlertModal from "@/components/modal/AlertModal";
import LoadingBar from "@/components/loading-bar/LoadingBar";

const SetingTwoPlayer = () => {
  const router = useRouter();
  const [play] = useSound("/assets/sounds/clickButton.mp3");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [waitDirectionPage, setWaitDirectPage] = useState(false);

  const startGame = () => {
    play();
    const dataPlayer1 = JSON.parse(
      sessionStorage.getItem("player-1") as string
    );
    const dataPlayer2 = JSON.parse(
      sessionStorage.getItem("player-2") as string
    );
    sessionStorage.setItem("playing", JSON.stringify({ playing: true }));

    if (dataPlayer1 && dataPlayer2) {
      setWaitDirectPage((prevState) => !prevState);
      router.push("main-game");
    } else {
      setIsOpenModal((prev) => !prev);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.75 }}
        className="flex min-h-screen min-w-screen flex-col items-center justify-center p-24 overflow-auto"
      >
        <h1 className="text-white text-4xl mt-4 mb-4 drop-shadow-xl md:mt-10 md:mb-10 md:text-6xl">
          Permainan 1 Lawan 1
        </h1>

        <FormMultiPlayer />

        <div className={clsx("mt-10", waitDirectionPage ? "block" : "hidden")}>
          <p className="font-fredoka text-center text-white font-bold text-lg">
            Mohon Tunggu Sebentar ...
          </p>
          <LoadingBar />
        </div>

        <button
          className={clsx(
            "button bg-[#597BF6] w-[240px] py-4 font-fredoka font-bold rounded-md transition mt-8 cursor-pointer",
            "md:mt-4 md:w-[240px]",
            "hover:bg-slate-200 hover:text-slate-600",
            waitDirectionPage ? "hidden" : "block"
          )}
          onClick={startGame}
        >
          Mulai
        </button>
        <div
          className={clsx(
            "flex justify-center items-center",
            waitDirectionPage ? "hidden" : "block"
          )}
        >
          <Link href={"/option-mode"}>
            <DirectButton
              content="⬅️ kembali"
              width="w-[240px]"
              background="bg-orange-400"
            />
          </Link>
        </div>
      </motion.div>
      {isOpenModal && (
        <AlertModal
          content="Silahkan lengkapi data pemain terlebih dahulu 🙂"
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
      )}
    </>
  );
};

export default SetingTwoPlayer;
