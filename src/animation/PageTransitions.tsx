"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { usePathname } from "next/navigation";
import HomeBacksoundButton from "@/components/buttons/home-backsound-button";
import SettingButton from "@/components/buttons/setting-button";

const PageTransitions = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  useEffect(() => {
    const gamePath = ["/main-game", "/main-game-single"];
    const isGameInProgreess = JSON.parse(
      sessionStorage.getItem("playing") as string
    );

    if (!gamePath.includes(pathname) && isGameInProgreess) {
      sessionStorage.clear();
    }
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        // initial="initialState"
        // animate="animateState"
        // exit="exitState"
        // className="base-page-size"
        // transition={{
        //   duration: 0.5,
        // }}
        // variants={{
        //   initialState: {
        //     opacity: 0,
        //     clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%) ",
        //   },
        //   animateState: {
        //     opacity: 1,
        //     clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%) ",
        //   },
        //   exitState: {
        //     // clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
        //     clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        //     background: "#252839",
        //   },
        // }}
      >
        {children}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.75 }}
        >
          {pathname.includes("main-game") ? (
            <SettingButton />
          ) : (
            <HomeBacksoundButton />
          )}
        </motion.div>
        <motion.div
          className="slide-in"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        ></motion.div>
        <motion.div
          className="slide-out"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        ></motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransitions;
