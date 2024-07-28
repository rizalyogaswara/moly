"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import LoadingProgressBar from "@/components/loading-bar/LoadingProgress";
import Image from "next/image";
import useSound from "use-sound";
import SplashImage from "@/assets/background/splash.webp";

const Splash = () => {
  const router = useRouter();
  const [play] = useSound("/assets/sounds/clickButton.mp3");

  useEffect(() => {
    const timeOut = setTimeout(() => {
      router.push("/welcome-page");
      play();
    }, 4500);

    return () => {
      clearInterval(timeOut);
    };
  }, [router, play]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.75 }}
      className="min-h-screen bg-gradient-to-r from-blue-300 via-purple-400 to-indigo-500 flex justify-center items-center line-background "
    >
      <div className="flex justify-center items-center my-4 gap-4 lg:flex-col">
        <figure className="mb-3 shadow-lg lg:mb-8">
          <Image
            className="rounded-md"
            src={SplashImage}
            height={500}
            width={500}
            alt="splash"
          />
        </figure>
        {/* <h1 className="text-4xl font-bold text-white mb-6">Selamat datang</h1> */}
        <LoadingProgressBar />
      </div>
    </motion.div>
  );
};

export default Splash;
