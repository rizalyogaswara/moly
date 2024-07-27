"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

import "../style/style.css";
import MonoplyLogo from "@/assets/home-icon.png";

import DirectButton from "../components/buttons/direct-button";

export default function Home() {
  return (
    <main>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.75 }}
        className="flex min-h-screen flex-col items-center justify-center p-24 home-background"
      >
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-9xl text-[#FCD1ED] lg:mt-20"
        >
          <Image
            className="-mb-10 md:mt-8"
            src={MonoplyLogo}
            alt="logo-monopoly"
            placeholder="blur"
            width={400}
          ></Image>
        </motion.div>
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex justify-center items-center flex-col gap-10 -"
        >
          <Link className="mt-2" href={"/splash"}>
            <DirectButton background="bg-[#597BF6]" content="Mulai Permainan" />
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
