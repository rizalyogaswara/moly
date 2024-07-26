// const checkContentPlayer = (): void => {
//   if (changePlayer === 1) {
//     const positionNow: ContentBlockInterface[] | undefined =
//       CONTENT_BLOCK.filter((block) => {
//         return block["block-number"] == player1Position;
//       });

//     if (
//       player1Position != 0 &&
//       typeof positionNow[0]["content-block"] === "number"
//     ) {
//       ToastMoney(dataPlayer1?.name!, positionNow[0]["content-block"]);
//       setMoneyPlayer1(moneyPlayer1 + positionNow[0]["content-block"]);
//       playResult();
//       setChangePlayer(2);
//     } else if (
//       player1Position != 0 &&
//       typeof positionNow[0]["content-block"] === "string" &&
//       positionNow[0]["content-block"] == "toko"
//     ) {
//       setIsShopModalOpen(true);
//       setChangePlayer(2);
//     } else if (positionNow[0]["content-block"] == "") {
//       setChangePlayer(2);
//     }
//   } else {
//     const positionNow: ContentBlockInterface[] | undefined =
//       CONTENT_BLOCK.filter((block) => {
//         return block["block-number"] == player2Position;
//       });

//     if (
//       player2Position != 0 &&
//       typeof positionNow[0]["content-block"] === "number"
//     ) {
//       ToastMoney(dataPlayer2?.name!, positionNow[0]["content-block"]);
//       setMoneyPlayer2(moneyPlayer2 + positionNow[0]["content-block"]);
//       playResult();
//       setChangePlayer(1);
//     } else if (
//       player2Position != 0 &&
//       typeof positionNow[0]["content-block"] === "string" &&
//       positionNow[0]["content-block"] == "toko"
//     ) {
//       setIsShopModalOpen(true);
//       setChangePlayer(1);
//     } else if (positionNow[0]["content-block"] == "") {
//       setChangePlayer(1);
//     }
//   }
// };
