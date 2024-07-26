"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import clsx from "clsx";
import useSound from "use-sound";

import Penguin from "@/assets/avatar/penguin.png";
import Kangoroo from "@/assets/avatar/kangoroo.png";
import Bajai from "@/assets/avatar/bajai.png";
import Kapal from "@/assets/avatar/ship.png";

import CharacterModal from "../modal/CharacterModal";

const FormSinglePlayer = () => {
  const [player1Name, setPlayer1Name] = useState("");
  const [player1Avatar, setPlayer1Avatar] = useState<StaticImageData>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [whoChooseAvatar, setWhoChooseAvatar] = useState(1);
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
    setPlayer1Name(e.target.value);

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
          whoChooseAvatar={whoChooseAvatar}
        />
      )}
      <div className="flex items-center basis-1/2 gap-10 mt-4">
        <div className="bg-slate-100 border-2 border-white w-[400px] rounded-lg p-8 flex flex-col shadow-2xl">
          <h1 className="text-2xl text-slate-800 text-center ">Pemain 1</h1>
          <p className="text-center text-black font-fredoka">
            Isi nama pemain & pilih karakter anda
          </p>
          <form className="my-6 grid">
            <input
              type="text"
              placeholder="Nama Pemain 1"
              onChange={(e) => handleChangeName(e, "player-1")}
              className={clsx(
                "w-full py-2 border rounded-md p-4 font-fredoka font-semibold text-slate-600",
                "focus:border-indigo-300 dark:bg-slate-100"
              )}
              required
            />
            <span
              className={clsx(
                "border mt-4 min-h-[160px] rounded-lg flex justify-center items-center bg-slate-500 text-8xl cursor-pointer transition",
                "hover:bg-slate-400"
              )}
              onClick={() => modalController()}
            >
              {player1Avatar ? (
                <Image src={player1Avatar} alt="pemain-1-avatar" width={120} />
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

export default FormSinglePlayer;
