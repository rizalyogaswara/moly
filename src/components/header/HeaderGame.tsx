import React, { useState } from "react";
import { GameTurnModalProps } from "@/types/type";
import Image from "next/image";
import clsx from "clsx";
import useSound from "use-sound";
import { rupiahFormat } from "@/helper/rupiahFormat";
import LoadingSpinner from "../loading-bar/LoadingSpinner";

const HeaderInfo = ({
  sessionGame,
  player1Name,
  player2Name,
  roleResult,
  player1Item,
  player2Item,
  isMovingPlayer1,
  isMovingPlayer2,
  roleDone,
  player1Money,
  player2Money,
}: GameTurnModalProps) => {
  const [playButton] = useSound("/assets/sounds/diceClick.mp3");
  const [playRoleDice] = useSound("/assets/sounds/rolling-dice.mp3");
  const [playInfoItem] = useSound("/assets/sounds/clickButton.mp3");
  const [onRoll, setOnRole] = useState(false);

  const roleNow = () => {
    setOnRole(true);
    playButton();
    const rndInt = Math.floor(Math.random() * 6) + 1;

    if (roleDone !== undefined) {
      playRoleDice();
      setTimeout(() => {
        roleDone(0, [rndInt]);
        setOnRole(false);
      }, 2000);
    }
  };

  return (
    <div
      className={clsx(
        "w-full fixed top-2 left-0 flex justify-between z-50 gap-2",
        "md:top-6",
        "xl:px-8"
      )}
    >
      <>
        {/* BLOCK-1 */}
        <div className={clsx("flex  gap-2 z-50 uppercase")}>
          <div
            className={clsx(
              "button px-4 py-4 text-black font-fredoka font-semibold rounded-md shadow-md",
              sessionGame === 1 ? "bg-[#93C5FD]" : "bg-[#FEF08A]"
            )}
          >
            <p className="text-black text-md">
              Sesi Pemain : {sessionGame === 1 ? player1Name : player2Name}
            </p>
          </div>
          <div
            onClick={roleNow}
            className={clsx(
              "button flex items-center flex-wrap gap-1 px-4 py-3 cursor-pointer font-fredoka font-semibold rounded-md shadow-md",
              isMovingPlayer1 || isMovingPlayer2 || onRoll
                ? "disabled pointer-events-none"
                : "",
              sessionGame === 1 ? "bg-[#93C5FD]" : "bg-[#FEF08A]"
            )}
          >
            <p className={"text-black text-md"}>
              Maju <span className={`text-xl`}>🎲 :</span>
            </p>
            <span className="lowercase text-black ">
              {onRoll ? (
                <LoadingSpinner />
              ) : (
                <p className="text-xl mt-1 text-black">{roleResult}</p>
              )}
            </span>
          </div>
        </div>
        {/* BLOCK-2 */}
        <div className={clsx("flex gap-2 z-50 uppercase")}>
          <label htmlFor="my_modal_7">
            <div className="button px-4 py-4 bg-[#93C5FD] font-fredoka font-semibold rounded-md shadow-md">
              <p className="text-black text-sm">
                {player1Name} | Barang : {player1Item.length}
              </p>
            </div>
          </label>
          <label htmlFor="my_modal_8">
            <div
              className={clsx(
                "button px-4 py-4 bg-[#FEF08A] font-fredoka font-semibold rounded-md shadow-md",
                player2Name ? "block" : "hidden"
              )}
            >
              <p className="text-black text-sm">
                {player2Name} - Barang : {player2Item?.length}
              </p>
            </div>
          </label>
        </div>
        <>
          <input
            onClick={playInfoItem}
            type="checkbox"
            id="my_modal_7"
            className="modal-toggle"
          />
          <div className="modal" role="dialog">
            <div className="modal-box">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-black dark:text-white">
                  {player1Name}
                </h3>
                <h3 className="text-md text-black dark:text-white">
                  Jumlah Uang : {rupiahFormat(player1Money)}
                </h3>
              </div>
              <p className="py-4 font-bold text-black dark:text-white">
                Total Barang di beli : {player1Item.length}
              </p>
              <div className="grid grid-cols-5 gap-4">
                {player1Item.map((item) => (
                  <div
                    key={item.nameItem}
                    className="flex flex-col justify-center items-center p-4 bg-blue-300 rounded-md"
                  >
                    <Image
                      src={item.imageSrc}
                      alt={item.nameItem}
                      width={100}
                      height={100}
                    />
                    <p className="text-center text-black text-xs font-bold uppercase">
                      {item.nameItem}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_7">
              Close
            </label>
          </div>
        </>
        <>
          <input
            onClick={playInfoItem}
            type="checkbox"
            id="my_modal_8"
            className="modal-toggle"
          />
          <div className="modal " role="dialog">
            <div className="modal-box">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-black dark:text-white">
                  {player2Name}
                </h3>
                <h3 className="text-md text-black dark:text-white">
                  Jumlah Uang : {rupiahFormat(player2Money as number)}
                </h3>
              </div>
              <p className="py-4 font-bold text-black dark:text-white">
                Total Barang di beli : {player2Item?.length}
              </p>
              <div className="grid grid-cols-5 gap-2">
                {player2Item?.map((item) => (
                  <div
                    key={item.nameItem}
                    className="flex flex-col justify-center items-center wrap p-4 bg-yellow-300 rounded-md"
                  >
                    <Image
                      src={item.imageSrc}
                      alt={item.nameItem}
                      width={100}
                      height={100}
                    />
                    <p className="text-center text-black text-xs font-bold uppercase">
                      {item.nameItem}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_8">
              Close
            </label>
          </div>
        </>
      </>
    </div>
  );
};

export default HeaderInfo;
