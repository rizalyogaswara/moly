import React from "react";

const Offline = () => {
  return (
    <section className="min-h-screen w-full flex justify-center items-center flex-col">
      <article>
        <h1 className="text-center text-2xl  text-white">
          Internet anda sekarang sedang offline
        </h1>

        <p className="text-white text-xl text-center mt-4">
          Mohon hidupkan internet anda dan mainkan game beberapa saat dengan
          kondisi online guna aplikasi dapat mengunduh keseluruhan konten game.
          <br />
          Terima kasih.
        </p>
      </article>
    </section>
  );
};

export default Offline;
