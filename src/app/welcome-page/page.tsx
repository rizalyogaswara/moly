"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import DirectButton from "@/components/buttons/direct-button";

const WelcomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.75 }}
      className="min-h-screen bg-gradient-to-r from-blue-300 via-purple-400 to-indigo-500 "
    >
      <div className="min-h-screen flex justify-center items-center flex-col line-background ">
        <article className="p-10 m-2 bg-white/75 rounded-xl max-w-screen-lg lg:m-0">
          <h1 className="text-xl text-center text-black font-medium  mb-8 md:text-3xl">
            Selamat datang di MOLY!
          </h1>
          <span className="indent-5 text-black text-base md:text-lg font-medium">
            <p>
              Kami sangat senang menyambut kalian di dunia yang penuh
              petualangan dan pengetahuan ini. <b>MOLY</b> adalah permainan yang
              dirancang khusus untuk teman-teman autis agar bisa belajar tentang
              nilai mata uang Rupiah dan transaksi jual beli dengan cara yang
              menyenangkan dan interaktif.
            </p>
            <br />

            <p>
              Dalam permainan ini, kalian akan diajak untuk membeli berbagai
              alat tulis dan belajar mengelola uang dengan bijak. Setiap langkah
              yang kalian ambil akan mengajarkan konsep penting tentang nilai
              uang, perencanaan keuangan, dan pentingnya membuat keputusan yang
              tepat.
            </p>
            <br />

            <p>
              Kami memahami bahwa setiap anak memiliki cara belajar yang unik,
              terutama teman-teman autis yang kami kasihi. Oleh karena itu,
              permainan ini didesain dengan fitur-fitur khusus yang memastikan
              setiap pemain dapat belajar dengan nyaman dan menyenangkan.
            </p>
            <br />

            <p>
              Ayo, siapkan dirimu untuk petualangan yang seru dan mendidik di{" "}
              <b>MOLY</b>. Jadilah master dalam mengelola keuangan dan rasakan
              kegembiraan dalam setiap transaksi yang kamu lakukan. Selamat
              bermain dan belajar!
            </p>
          </span>
          <div className="flex justify-end items-center mt-3 -mb-4 gap-2">
            <Link href={"/"}>
              <DirectButton content="⬅️ Kembali" background="bg-orange-400" />
            </Link>
            <Link href={"/option-mode"}>
              <DirectButton content="Lanjut ➡️" background="bg-[#597BF6]" />
            </Link>
          </div>
        </article>
      </div>
    </motion.div>
  );
};

export default WelcomePage;
