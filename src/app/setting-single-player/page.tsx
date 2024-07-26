"use client";

import React, { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import useSound from "use-sound";

import { motion } from "framer-motion";

import DirectButton from "../../components/buttons/direct-button";
import FormSinglePlayer from "@/components/singel-player-content/FormSinglePlayer";
import AlertModal from "@/components/modal/AlertModal";
import LoadingBar from "@/components/loading-bar/LoadingBar";

const SetingSinglePlayer = () => {
  const router = useRouter();
  const [play] = useSound("/assets/sounds/clickButton.mp3");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [waitDirectionPage, setWaitDirectPage] = useState(false);

  const startGame = () => {
    play();
    const dataPlayer1 = JSON.parse(
      sessionStorage.getItem("player-1") as string
    );

    sessionStorage.setItem("playing", JSON.stringify({ playing: true }));

    if (dataPlayer1) {
      setWaitDirectPage((prevState) => !prevState);
      router.push("main-game-single");
    } else {
      setIsOpenModal(true);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.75 }}
        className="flex min-h-screen flex-col items-center justify-center p-24 "
      >
        <h1 className="text-white text-center text-6xl drop-shadow-xl my-8">
          Permainan 1 Orang
        </h1>

        <FormSinglePlayer />

        <div className={clsx("mt-10", waitDirectionPage ? "block" : "hidden")}>
          <p className="font-fredoka text-center text-white font-bold text-lg">
            Mohon Tunggu Sebentar ...
          </p>
          <LoadingBar />
        </div>

        <button
          className={clsx(
            "button bg-[#597BF6] w-[240px] py-4 font-fredoka font-bold rounded-md transition mt-8 cursor-pointer",
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
              disabled={waitDirectionPage}
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

export default SetingSinglePlayer;
