"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import BoardGame2Player from "@/components/board-game/BoardGame2Player";
import clsx from "clsx";

const MainGame = () => {
  const router = useRouter();

  useEffect(() => {
    const onGame = sessionStorage.getItem("playing");

    if (!onGame) {
      router.push("/option-mode");
    }
  }, [router]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.75 }}
      className={clsx(
        "pb-4 overflow-auto main-bg scrollbar-hide",
        "xl:flex xl:min-h-screen xl:flex-col xl:items-center xl:justify-center xl:pt-0"
      )}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.85 }}
      >
        <div className={clsx("mt-8", "md:mt-4")}>
          <BoardGame2Player />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MainGame;
