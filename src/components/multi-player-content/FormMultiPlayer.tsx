"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import clsx from "clsx";
import useSound from "use-sound";

import VersusImage from "@/assets/VS-Font.png";
import Penguin from "@/assets/avatar/penguin.png";
import Kangoroo from "@/assets/avatar/kangoroo.png";
import Bajai from "@/assets/avatar/bajai.png";
import Kapal from "@/assets/avatar/ship.png";

import CharacterModal from "../modal/CharacterModal";

const FormMultiPlayer = () => {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [player1Avatar, setPlayer1Avatar] = useState<StaticImageData>();
  const [player2Avatar, setPlayer2Avatar] = useState<StaticImageData>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [whoChooseAvatar, setWhoChooseAvatar] = useState(0);
  const [play] = useSound("/assets/sounds/clickButton.mp3");

  const modalController = () => {
    setIsOpenModal((open) => !open);
    play();
  };

  const handleChangeName = (
    e: React.ChangeEvent<HTMLInputElement>,
    player: string
  ) => {
    const savedData = JSON.parse(sessionStorage.getItem(player) as string);

    if (player == "player-1") {
      setPlayer1Name(e.target.value);
    } else {
      setPlayer2Name(e.target.value);
    }

    const whosEditName = (player: string) => {
      if (player == "player-1") {
        return "Pemain-1";
      }

      return "Pemain-2";
    };

    if (savedData) {
      sessionStorage.setItem(
        player,
        JSON.stringify({
          ...savedData,
          name:
            e.target.value.length <= 0 ? whosEditName(player) : e.target.value,
        })
      );
    }
  };

  const setAvatarForPlayer1 = (avatarURL: string) => {
    setPlayer1Avatar(determineImagePath(avatarURL));

    setTimeout(() => {
      sessionStorage.setItem(
        "player-1",
        JSON.stringify({
          name: player1Name.length > 0 ? player1Name : "Pemain-1",
          avatar: determineImagePath(avatarURL),
          money: 1000,
          purchasedItem: [],
          avatarName: avatarURL,
        })
      );
    }, 200);
  };

  const setAvatarForPlayer2 = (avatarURL: string) => {
    setPlayer2Avatar(determineImagePath(avatarURL));

    setTimeout(() => {
      sessionStorage.setItem(
        "player-2",
        JSON.stringify({
          name: player2Name.length > 0 ? player2Name : "Pemain-2",
          avatar: determineImagePath(avatarURL),
          money: 1000,
          purchasedItem: [],
          avatarName: avatarURL,
        })
      );
    }, 200);
  };

  const determineImagePath = (avatar: string) => {
    switch (avatar) {
      case "Penguin":
        return Penguin;
      case "Kangoroo":
        return Kangoroo;
      case "Bajai":
        return Bajai;
      case "Kapal":
        return Kapal;
      default:
        break;
    }
  };

  return (
    <>
      {isOpenModal && (
        <CharacterModal
          isOpenModal={isOpenModal}
          modalController={modalController}
          setAvatarForPlayer1={setAvatarForPlayer1}
          setAvatarForPlayer2={setAvatarForPlayer2}
          whoChooseAvatar={whoChooseAvatar}
        />
      )}
      <div className="min-w-screen flex items-center justify-center gap-2 mt-4 md:gap-10">
        <div className="bg-slate-100 border-2 border-white w-[320px] rounded-lg p-4 flex flex-col shadow-2xl md:w-[400px] md:p-8">
          <h1 className="text-xl text-slate-800 text-center md:text-2xl">
            Pemain 1
          </h1>
          <p className="text-center text-black font-fredoka">
            Isi nama pemain & pilih karakter anda
          </p>
          <form className="my-6 grid">
            <input
              type="text"
              placeholder="Nama Pemain 1"
              // value={player1Name}
              onChange={(e) => handleChangeName(e, "player-1")}
              className={clsx(
                "w-full py-2 border rounded-md p-4 font-fredoka font-semibold text-slate-600",
                "focus:border-indigo-300 dark:bg-slate-100"
              )}
              required
            />
            <span
              className={clsx(
                "border mt-4 min-h-[120px] rounded-lg flex justify-center items-center bg-slate-500 text-6xl cursor-pointer transition",
                "md:min-h-[160px] md:text-8xl",
                "hover:bg-slate-400"
              )}
              onClick={() => {
                modalController();
                setWhoChooseAvatar(1);
              }}
            >
              {player1Avatar ? (
                <Image src={player1Avatar} alt="pemain-1-avatar" width={120} />
              ) : (
                <p>❔</p>
              )}
            </span>
          </form>
        </div>
        <Image
          src={VersusImage}
          alt="versus-image"
          placeholder="blur"
          width={0}
          height={0}
          sizes="100vw"
          className={clsx("w-[180px]", "md:w-[300px]")}
        />
        <div className="bg-slate-100 border-2 border-white w-[320px] rounded-lg p-4 flex flex-col shadow-2xl md:w-[400px] md:p-8">
          <h1 className="text-xl text-slate-800 text-center md:text-2xl">
            Pemain 2
          </h1>
          <p className="text-center text-black font-fredoka">
            Isi nama pemain & pilih karakter anda
          </p>
          <form className="my-6 grid">
            <input
              type="text"
              placeholder="Nama Pemain 2"
              // value={player2Name}
              onChange={(e) => handleChangeName(e, "player-2")}
              className={clsx(
                "w-full py-2 border rounded-md p-4 font-fredoka font-semibold text-slate-600",
                "focus:border-indigo-300 dark:bg-slate-100"
              )}
              required
            />
            <span
              className={clsx(
                "border mt-4 min-h-[120px] rounded-lg flex justify-center items-center bg-slate-500 text-6xl cursor-pointer transition",
                "md:min-h-[160px] md:text-8xl",
                "hover:bg-slate-400"
              )}
              onClick={() => {
                modalController();
                setWhoChooseAvatar(2);
              }}
            >
              {player2Avatar ? (
                <Image src={player2Avatar} alt="pemain-1-avatar" width={120} />
              ) : (
                <p>❔</p>
              )}
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormMultiPlayer;
