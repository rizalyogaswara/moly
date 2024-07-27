"use client";

import "@/style/BoardGame.css";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";
import useSound from "use-sound";

import ContentBlock from "@/data/content-block.json";
import { ContentBlockInterface, PlayerData, itemPlayer } from "@/types/type";

import { ReactDiceRef } from "react-dice-complete";
import { ToastMoney } from "@/components/modal/ToastGame";
import HeaderInfo from "@/components/header/HeaderGame";
import ShopModal from "../modal/ShoopModal";

import { rupiahFormat, rupiahFormatBoard } from "@/helper/rupiahFormat";
import dynamic from "next/dynamic";
import { speakNow } from "@/helper/speak";
const DynamicDiceComponent = dynamic(() => import("react-dice-complete"), {
  ssr: false,
});

const BoardGame1Player = () => {
  const CONTENT_BLOCK: ContentBlockInterface[] = ContentBlock;
  const [playDice] = useSound("/assets/sounds/diceClick.mp3");
  const [playResult] = useSound("/assets/sounds/result.mp3");
  const [playOhMyGod] = useSound("/assets/sounds/oh-my-god.mp3");
  const [playWalk] = useSound("/assets/sounds/walk.mp3");
  const [playRoleDice] = useSound("/assets/sounds/rolling-dice.mp3");

  const reactDice = useRef<ReactDiceRef>(null);
  const player1Ref = useRef<HTMLDivElement>(null);

  const [roleResult, setRoleResult] = useState(0);
  const [onRoll, setOnRoll] = useState(false);

  const [changePlayer, setChangePlayer] = useState(1);
  const [gameStatus, setGameStatus] = useState("not-starting");

  const [isMovingPlayer1, setIsMovingPlayer1] = useState(false);

  const [dataPlayer1, setDataPlayer1] = useState<PlayerData>();

  const [player1Position, setPlayer1Position] = useState(1);

  const [moneyPlayer1, setMoneyPlayer1] = useState(4000);

  const [player1Item, setPlayer1Item] = useState<itemPlayer[]>([]);

  const [isShopModalOpen, setIsShopModalOpen] = useState(false);

  useEffect(() => {
    const player1Data = JSON.parse(
      sessionStorage.getItem("player-1") as string
    );
    setDataPlayer1(player1Data);

    if (player1Ref.current) {
      player1Ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, []);

  const checkContentPlayer = (): void => {
    if (changePlayer === 1) {
      const positionNow: ContentBlockInterface[] | undefined =
        CONTENT_BLOCK.filter((block) => {
          return block["block-number"] == player1Position;
        });

      if (
        player1Position !== 0 &&
        positionNow &&
        positionNow.length > 0 &&
        typeof positionNow[0]["content-block"] === "number"
      ) {
        ToastMoney(dataPlayer1?.name!, positionNow[0]["content-block"]);
        setMoneyPlayer1(moneyPlayer1 + positionNow[0]["content-block"]);
        if (positionNow[0]["content-block"] > 0) {
          playResult();
        } else {
          // playOhMyGod();
          speakNow(
            `Maaf anda harus membayar denda sebesar ${Math.abs(
              positionNow[0]["content-block"]
            )} rupiah.`
          );
        }
      } else if (
        player1Position !== 0 &&
        positionNow &&
        positionNow.length > 0 &&
        typeof positionNow[0]["content-block"] === "string" &&
        positionNow[0]["content-block"] === "toko"
      ) {
        setIsShopModalOpen(true);
      } else if (
        positionNow &&
        positionNow.length > 0 &&
        positionNow[0]["content-block"] === ""
      ) {
      } else if (
        positionNow &&
        positionNow.length > 0 &&
        positionNow[0]["content-block"] === "start"
      ) {
      }
    }
  };

  useEffect(() => {
    if (!isMovingPlayer1 && gameStatus == "on-play") {
      checkContentPlayer();
    }

    if (player1Position == 29) {
      setPlayer1Position((prevPosition) => prevPosition - 28);
    }

    if (player1Position !== 1 && player1Ref.current && changePlayer == 1) {
      player1Ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [player1Position, isMovingPlayer1]);

  const rollDice = () => {
    playDice();
    setOnRoll((prev) => !prev);
    playRoleDice();

    setTimeout(() => {
      setOnRoll((prev) => !prev);
    }, 3000);
  };

  const rollDone = (totalValue: number, values: number[]) => {
    if (changePlayer == 1 && gameStatus === "not-starting") {
      setGameStatus("on-play");
    } else if (changePlayer == 1 && gameStatus === "on-play") {
      setRoleResult(values[0]);
      setIsMovingPlayer1(true);

      for (let i = 1; i <= values[0]; i++) {
        setTimeout(() => {
          setPlayer1Position((prev) => prev + 1);
          playWalk();
          if (i === values[0]) setIsMovingPlayer1(false); // Pemain 1 selesai bergerak
        }, i * 600);
      }
    }
  };

  return (
    <>
      <div className="inner-wrapper pt-20">
        <div className="board-game">
          <div className="center-block relative">
            <HeaderInfo
              sessionGame={changePlayer}
              player1Name={dataPlayer1?.name!}
              player1Item={player1Item}
              isMovingPlayer1={isMovingPlayer1}
              roleResult={roleResult}
              player1Money={moneyPlayer1}
              roleDone={rollDone}
            />
            <div className="backdrop-blur-lg text-black text-center px-6 rounded-md  gap-2 mr-36">
              <div className="flex items-center flex-col justify-center ">
                <p className="font-semibold text-base bg-[#c488fc] p-4 rounded-md shadow-md md:text-lg">
                  Uang {dataPlayer1?.name} <br />
                  {rupiahFormat(moneyPlayer1)}
                </p>
                <span
                  className={`mt-2 ${
                    onRoll ? "disabled pointer-events-none" : ""
                  }`}
                  onClick={() => rollDice()}
                >
                  <DynamicDiceComponent
                    numDice={1} // jumlah dadu
                    defaultRoll={2} // angka default
                    ref={reactDice}
                    rollDone={rollDone} // fungsi yang dijalankan
                    dotColor="#FFF"
                    faceColor="#e0485c"
                    dieSize={90} // ukuran komponen dadu
                    rollTime={2} // waktu animasi
                    // disableRandom={true}
                  />
                </span>
              </div>
            </div>
          </div>
          {CONTENT_BLOCK.map((block) => (
            <div
              key={block["block-number"]}
              ref={
                player1Position === block["block-number"] ? player1Ref : null
              }
              className={clsx(
                `relative div${block["block-number"]} block-board text-black w-[140px] h-[120px]`,
                player1Position === block["block-number"] ? "active1" : "",
                block["content-block"] === "toko" ? "toko-block" : "",
                block["content-block"] === "" ? "empty-block" : "",
                block["content-block"] === "start" ? "start-block" : "",
                (block["content-block"] as number) < 0 ? "minus-block" : "",
                typeof block["content-block"] != "string" ? "money-block" : ""
              )}
              style={{
                backgroundImage:
                  block["bg-source"] !== "" ? `url(${block["bg-source"]})` : "",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              {player1Position === block["block-number"] ? (
                <Image
                  className="caracter"
                  src={dataPlayer1?.avatar?.src as string}
                  alt="player-caracter"
                  width={100}
                  height={80}
                />
              ) : (
                <></>
              )}

              <p
                className={clsx(
                  "absolute bg-white/50 w-full text-center bottom-0"
                )}
              >
                {block["content-block"] == "start"
                  ? "mulai"
                  : block["content-block"] != "toko"
                  ? rupiahFormatBoard(block["content-block"] as number)
                  : block["content-block"]}
              </p>
            </div>
          ))}
        </div>
      </div>
      <ShopModal
        isOpenModal={isShopModalOpen}
        setIsOpenModal={setIsShopModalOpen}
        content="Silahkan pilih barang yang ingin anda beli. 😊"
        money={moneyPlayer1}
        setNewMoney={setMoneyPlayer1}
        namePlayer={dataPlayer1?.name!}
        setItem={setPlayer1Item}
        playerItem={player1Item}
      />
    </>
  );
};

export default BoardGame1Player;
