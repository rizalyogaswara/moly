"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";
import useSound from "use-sound";

import "../../style/style.css";

import DirectButton from "../../components/buttons/direct-button";

const OptionMode = () => {
  const [play] = useSound("/assets/sounds/clickButton.mp3");

  const soundHandler = () => {
    play();
  };

  useEffect(() => {
    const player1Data = JSON.parse(
      sessionStorage.getItem("player-1") as string
    );
    const player2Data = JSON.parse(
      sessionStorage.getItem("player-2") as string
    );

    if (player1Data || player2Data) {
      sessionStorage.clear();
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.75 }}
      className="min-h-screen bg-gradient-to-r from-blue-300 via-purple-400 to-indigo-500 "
    >
      <div className="min-h-screen flex justify-center items-center flex-col line-background ">
        <h1 className="text-3xl text-center text-white font-bold mb-8 pt-4 md:text-6xl md:pt-0">
          PILIH MODE PERMAINAN
        </h1>
        <div className="flex justify-center items-center gap-12 ">
          <Link
            className={clsx(
              "button bg-orange-400 text-white text-center text-lg font-bold rounded-lg p-4 my-8 border-solid border-4 border-opacity-70 transition-all",
              "md:p-12",
              "hover:border-yellow-200 hover:border-opacity-40"
            )}
            href={"setting-single-player"}
            onClick={soundHandler}
          >
            <h1 className="text-4xl mb-2 md:text-6xl">🧍</h1>1 Pemain
          </Link>

          <div className="h-2 w-[50px] bg-white rounded-full md:w-[100px]"></div>
          <h1 className="text-xl text-white -mr-10 -ml-10 md:text-5xl">ATAU</h1>
          <div className="h-2 w-[50px] bg-white rounded-full md:w-[100px]"></div>

          <Link
            className={clsx(
              "button bg-orange-400 text-white text-center text-lg font-bold rounded-lg p-4 my-8 border-solid border-4 border-opacity-70 transition-all",
              "md:p-12",
              "hover:border-yellow-200 hover:border-opacity-40"
            )}
            href={"setting-two-player"}
            onClick={soundHandler}
          >
            <h1 className="text-4xl mb-2 md:text-6xl">👫</h1>2 Pemain
          </Link>
        </div>

        <div className="flex justify-center items-center flex-wrap pb-4 gap-2 -mt-4 md:pb-3">
          <Link href={"/welcome-page"}>
            <DirectButton
              content="⬅️ Kembali"
              width="w-[160px]"
              background="bg-orange-400"
            />
          </Link>
          <Link href={"/game-instruction"}>
            <DirectButton
              content="🧑‍💻 Info Game"
              width="w-[160px]"
              background="bg-[#5778EF]"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OptionMode;
