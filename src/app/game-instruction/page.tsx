"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";
import BlockGameBoard from "@/assets/information-game/blok-game.png";
import DiceGameBoard from "@/assets/information-game/dice-game.png";
import SessionInfoGameBoard from "@/assets/information-game/sesi-game.png";
import ModalItemGameBoard from "@/assets/information-game/list-item-game.png";
import ResultDice from "@/assets/information-game/dice-result-w-game.png";
import DirectButton from "@/components/buttons/direct-button";
import Link from "next/link";

const InstruksiDame = () => {
  return (
    <section className="flex justify-center items-center min-h-screen p-4 lg:p-10 ">
      <article
        className={clsx(
          "max-w-full p-8 font-fredoka rounded-xl bg-white shadow-lg",
          "animate-show-content-animation text-black"
        )}
      >
        <h3 className="font-bold text-lg text-back underline mb-2">
          Informasi Permainan
        </h3>
        <p>
          Dalam permainan monopoly-slb ini, pemain akan berlomba untuk
          mendapatkan 5 item terlebih dahulu guna memenangkan atau menyelesaikan
          permainan
          <span className="italic font-semibold">
            (5 item untuk permainan mode 2 orang dan 3 item untuk permainan mode
            1 orang)
          </span>
          . Item - item ini berupa alat tulis yang dapat dibeli di Toko. Untuk
          dapat masuk ke toko, pemain harus mendapat nilai dadu yang tepat agar
          karakter pemain dapat berhenti di blok toko yang ada di papan
          permainan.
        </p>
        <br />
        <p>Pada papan permainan terdapat 3 jenis blok, antara lain :</p>
        <ul className="list-disc list-inside mt-2">
          <li>
            <b>Blok berwarna biru</b>, ketika karakter mendapat blok ini, maka
            pemain akan mendapat uang sebesar yang tertera pada blok tersebut.
          </li>
          <li>
            <b>Blok berwarna merah</b>, ketika karakter mendapat blok ini, maka
            pemain wajib membayar uang sebesar yang tertera pada blok tersebut.
          </li>
          <li>
            <b>Blok berwarna hijau</b>, blok ini adalah blok toko, ketika
            karakter mendapat blok toko, maka pemain berhak untuk membeli item
            alat tulis yang tersedia. Perlu diingat juga bahwa item hanya bisa
            dibeli apabila uang pemain lebih besar dari harga item.
          </li>
        </ul>
        <Image
          className="m-auto mt-4"
          src={BlockGameBoard}
          alt="jenis-blok"
          width={500}
        />

        <h3 className="pt-2 font-bold text-lg text-back">Cara Bermain</h3>
        <p>
          Untuk memulai permainan pemain hanya perlu menekan / melakukan klik
          pada gambar dadu yang berada di tengah papan permainan. Selanjutnya
          karakter pemain akan secara otomatis bergerak sesuai hasil kocokan
          dadu.
        </p>
        <Image
          className="m-auto mt-4"
          src={DiceGameBoard}
          alt="tombol-dadu"
          width={500}
        />
        <br />

        <p>
          Hasil kocokan dadu dapat dilihat pada kotak kedua berwarna kuning yang
          ada pojok kiri atas. Setelah karakter pemain selesai bergerak maka
          giliran pemain akan secara otomatis berpindah ke pemain selanjutnya.
          Sebagai tambahan, kotak ini juga bisa digunakan untuk melakukan
          rolling atau mengocok dadu jika anda menekannya.
        </p>
        <Image
          className="m-auto mt-4"
          src={ResultDice}
          alt="tombol-dadu"
          width={180}
        />

        <h3 className="pt-2 font-bold text-lg text-back">Giliran Bermain</h3>
        <p>
          Dalam permainan monopoly ini, kedua pemain akan mendapat giliran
          secara bergantian. Dimulai dari pemain-1 yang diwakili warna biru dan
          selanjutnya akan bergantian secara otomatis dengan pemain-2 yang
          diwakili dengan warna kuning.
        </p>
        <br />
        <p>
          Guna memudahkan pemain dalam melihat siapa yang mendapat giliran untuk
          bermain, para pemain dapat melihat kotak{" "}
          <span className="font-bold">sesi pemain</span> yang terdapat pada
          pojok kiri atas. kotak tersebut akan secara otomatis melakukan update
          terhadap nama pemain yang mendapat giliran bermain saat itu, dan warna
          kotak tersebut akan secara otomatis berubah mengikuti pemain yang
          mendapat giliran bermain (warna biru untuk pemain-1 dan warna kuning
          untuk pemain-2).
          <Image
            className="m-auto mt-4"
            src={SessionInfoGameBoard}
            alt="tombol-dadu"
            width={250}
          />
        </p>

        <h3 className="pt-2 font-bold text-lg text-back">Informasi Item</h3>
        <p>
          Untuk melihat item yang dimiliki / berhasil dibeli oleh pemain,
          terdapat kotak informasi item yang berada pada pojok kanan atas. kotak
          tersebut berisi info berapa banyak item yang telah dibeli oleh pemain,
          dan jika kotak tersebut ditekan, maka akan muncul modal yang berisi
          detail gambar dan nama dari item item yang dimiliki.
        </p>
        <Image
          className="m-auto mt-4"
          src={ModalItemGameBoard}
          alt="tombol-dadu"
          width={500}
        />

        <div className="w-full flex justify-end mt-6 transition-all">
          <Link href={"/option-mode"}>
            <DirectButton content="⬅️ Kembali" background="bg-orange-400" />
          </Link>
        </div>
      </article>
    </section>
  );
};

export default InstruksiDame;
