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

const BoardGame = () => {
  const CONTENT_BLOCK: ContentBlockInterface[] = ContentBlock;
  const [playDice] = useSound("/assets/sounds/diceClick.mp3");
  const [playResult] = useSound("/assets/sounds/result.mp3");
  const [playOhMyGod] = useSound("/assets/sounds/oh-my-god.mp3");
  const [playWalk] = useSound("/assets/sounds/walk.mp3");
  const [playRoleDice] = useSound("/assets/sounds/rolling-dice.mp3");

  const reactDice = useRef<ReactDiceRef>(null);
  const player1Ref = useRef<HTMLDivElement>(null);
  const player2Ref = useRef<HTMLDivElement>(null);

  const [roleResult, setRoleResult] = useState(0);
  const [onRoll, setOnRoll] = useState(false);

  const [changePlayer, setChangePlayer] = useState(1);
  const [gameStatus, setGameStatus] = useState("not-starting");

  const [isMovingPlayer1, setIsMovingPlayer1] = useState(false);
  const [isMovingPlayer2, setIsMovingPlayer2] = useState(false);

  const [dataPlayer1, setDataPlayer1] = useState<PlayerData>();
  const [dataPlayer2, setDataPlayer2] = useState<PlayerData>();

  const [player1Position, setPlayer1Position] = useState(1);
  const [player2Position, setPlayer2Position] = useState(1);

  const [moneyPlayer1, setMoneyPlayer1] = useState(4000);
  const [moneyPlayer2, setMoneyPlayer2] = useState(4000);

  const [player1Item, setPlayer1Item] = useState<itemPlayer[]>([]);
  const [player2Item, setPlayer2Item] = useState<itemPlayer[]>([]);

  const [isShopModalOpen, setIsShopModalOpen] = useState(false);

  useEffect(() => {
    const player1Data = JSON.parse(
      sessionStorage.getItem("player-1") as string
    );
    const player2Data = JSON.parse(
      sessionStorage.getItem("player-2") as string
    );

    setDataPlayer1(player1Data);
    setDataPlayer2(player2Data);
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

        setChangePlayer(2);
      } else if (
        player1Position !== 0 &&
        positionNow &&
        positionNow.length > 0 &&
        typeof positionNow[0]["content-block"] === "string" &&
        positionNow[0]["content-block"] === "toko"
      ) {
        setIsShopModalOpen(true);
        setChangePlayer(2);
      } else if (
        positionNow &&
        positionNow.length > 0 &&
        positionNow[0]["content-block"] === ""
      ) {
        setChangePlayer(2);
      } else if (
        positionNow &&
        positionNow.length > 0 &&
        positionNow[0]["content-block"] === "start"
      ) {
        setChangePlayer(2);
      }
    } else {
      const positionNow: ContentBlockInterface[] | undefined =
        CONTENT_BLOCK.filter((block) => {
          return block["block-number"] == player2Position;
        });

      if (
        player2Position !== 0 &&
        positionNow &&
        positionNow.length > 0 &&
        typeof positionNow[0]["content-block"] === "number"
      ) {
        ToastMoney(dataPlayer2?.name!, positionNow[0]["content-block"]);
        setMoneyPlayer2(moneyPlayer2 + positionNow[0]["content-block"]);

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

        setChangePlayer(1);
      } else if (
        player2Position !== 0 &&
        positionNow &&
        positionNow.length > 0 &&
        typeof positionNow[0]["content-block"] === "string" &&
        positionNow[0]["content-block"] === "toko"
      ) {
        setIsShopModalOpen(true);
        setChangePlayer(1);
      } else if (
        positionNow &&
        positionNow.length > 0 &&
        positionNow[0]["content-block"] === ""
      ) {
        setChangePlayer(1);
      } else if (
        positionNow &&
        positionNow.length > 0 &&
        positionNow[0]["content-block"] === "start"
      ) {
        setChangePlayer(1);
      }
    }
  };

  useEffect(() => {
    if (!isMovingPlayer1 && !isMovingPlayer2 && gameStatus == "on-play") {
      checkContentPlayer();
    }

    if (player1Position == 29) {
      setPlayer1Position((prevPosition) => prevPosition - 28);
    } else if (player2Position == 29) {
      setPlayer2Position((prevPosition) => prevPosition - 28);
    }

    if (player1Position !== 1 && player1Ref.current && changePlayer == 1) {
      player1Ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    if (player2Position !== 1 && player2Ref.current && changePlayer == 2) {
      player2Ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [player1Position, player2Position, isMovingPlayer1, isMovingPlayer2]);

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
    } else if (changePlayer == 2 && gameStatus === "on-play") {
      setRoleResult(values[0]);
      setIsMovingPlayer2(true);

      for (let i = 1; i <= values[0]; i++) {
        setTimeout(() => {
          setPlayer2Position((prev) => prev + 1);
          playWalk();
          if (i === values[0]) setIsMovingPlayer2(false); // Pemain 2 selesai bergerak
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
              player2Name={dataPlayer2?.name!}
              player1Item={player1Item}
              player2Item={player2Item}
              isMovingPlayer1={isMovingPlayer1}
              isMovingPlayer2={isMovingPlayer2}
              player1Money={moneyPlayer1}
              player2Money={moneyPlayer2}
              roleResult={roleResult}
              roleDone={rollDone}
            />
            <div className="backdrop-blur-sm text-black text-center px-6 rounded-md gap-2 mr-36 -mt-16 ml-4">
              <div className="flex items-center justify-center flex-col">
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
                    defaultRoll={1} // angka default
                    ref={reactDice}
                    rollDone={rollDone} // fungsi yang dijalankan
                    dotColor="#FFF"
                    faceColor="#e0485c"
                    dieSize={90} // ukuran komponen dadu
                    rollTime={2} // waktu animasi
                    // disableRandom={true}
                  />
                </span>
                <p className="font-semibold text-base bg-yellow-200 p-4 rounded-md shadow-md md:text-lg">
                  Uang {dataPlayer2?.name} <br /> {rupiahFormat(moneyPlayer2)}
                </p>
              </div>
            </div>
          </div>
          {CONTENT_BLOCK.map((block) => (
            <div
              key={block["block-number"]}
              ref={
                player1Position === block["block-number"]
                  ? player1Ref
                  : player2Position === block["block-number"]
                  ? player2Ref
                  : null
              }
              className={clsx(
                `relative div${block["block-number"]} block-board lg:w-[140px] lg:h-[120px]`,
                player1Position === block["block-number"] ? "active1" : "",
                player2Position === block["block-number"] ? "active2" : "",
                block["content-block"] === "toko" ? "toko-block" : "",
                block["content-block"] === "" ? "empty-block" : "",
                block["content-block"] === "start" ? "start-block" : "",
                (block["content-block"] as number) < 0 ? "minus-block" : "",
                typeof block["content-block"] != "string"
                  ? "money-block text-black"
                  : ""
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
              )}{" "}
              {player2Position === block["block-number"] ? (
                <Image
                  className="caracter"
                  src={dataPlayer2?.avatar?.src as string}
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
                  ? rupiahFormatBoard(+block["content-block"])
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
        money={changePlayer == 1 ? moneyPlayer2 : moneyPlayer1}
        setNewMoney={changePlayer == 1 ? setMoneyPlayer2 : setMoneyPlayer1}
        namePlayer={changePlayer == 1 ? dataPlayer2?.name! : dataPlayer1?.name!}
        setItem={changePlayer == 1 ? setPlayer2Item : setPlayer1Item}
        playerItem={changePlayer == 1 ? player2Item : player1Item}
      />
    </>
  );
};

export default BoardGame;
