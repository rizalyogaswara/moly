export const rupiahFormat = (nominal: number) => {
  const newFormat = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(nominal);

  return newFormat;
};

export const rupiahFormatBoard = (nominal: number) => {
  const newFormat = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(nominal);

  const formattedWithoutCents = newFormat.replace(/,00$/, "");

  return formattedWithoutCents;
};
