const number = 5;
let angka = 1;

for (let i = 1; i <= number; i++) {
  setTimeout(() => {
    console.log(angka + i);
  }, i * 1000); // i * 1000 akan mengatur delay setiap console log selama 1 detik
}
