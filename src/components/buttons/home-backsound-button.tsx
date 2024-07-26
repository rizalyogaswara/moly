"use client";

import React from "react";
import "../../style/style.css";
import { usePathname } from "next/navigation";

import AudioPlayer from "react-h5-audio-player";
import clsx from "clsx";

const HomeBacksoundButton = () => {
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        pathname.includes("main-game") ? "" : "fixed right-6 bottom-4"
      )}
    >
      {pathname === "/main-game" || pathname === "/main-game-single" ? (
        <AudioPlayer
          // autoPlay={true}
          src="/assets/sounds/Lobby-Times.mp3"
          loop={true}
        />
      ) : (
        <AudioPlayer
          // autoPlay={true}
          src="/assets/sounds/Clown-com.mp3"
          loop={true}
        />
      )}
    </div>
  );
};

export default HomeBacksoundButton;
