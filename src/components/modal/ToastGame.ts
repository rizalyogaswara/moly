import Swal from "sweetalert2";
import { rupiahFormat } from "@/helper/rupiahFormat";

export const AlertBuying2 = (namaBarang: string, status: boolean) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
      const alertElement = document.querySelector(
        ".swal2-toast-shown"
      ) as HTMLElement;
      if (alertElement) {
        alertElement.style.zIndex = "9999";
      }
    },
  });
  Toast.fire({
    icon: status ? "success" : "error",
    title: !status
      ? `Maaf uang anda tidak cukup 😅`
      : `Selamat ${namaBarang}  berhasil dibeli 😉`,
  });
};

export const ToastMoney = (playerName: string, nominal: number) => {
  Swal.fire({
    position: "center",
    title: nominal < 0 ? "😭 MOHON MAAF 😭" : "🎉 SELAMAT 🎉",
    text:
      nominal < 0
        ? `Ahh, ${playerName?.toUpperCase()} kamu harus membayar denda sebesar ${nominal} rupiah 😢`
        : `Selamat, ${playerName?.toUpperCase()} mendapat uang sebesar ${nominal} rupiah 😉`,
    showConfirmButton: false,
    timer: 7000,
  });
};

export const FailedBuying = (namaBarang: string, status: boolean) => {
  Swal.fire({
    position: "center",
    title: !status ? "😭 MOHON MAAF 😭" : "🎉 SELAMAT 🎉",
    text: !status
      ? `Uang kamu tidak cukup untuk membeli ${namaBarang} 😅`
      : `Selamat kamu sudah berhasil membeli ${namaBarang} 😉`,
    showConfirmButton: false,
    timer: 2400,
    customClass: {
      container: "alert-buying",
    },
    didRender: () => {
      const alertElement = document.querySelector(
        ".swal2-container"
      ) as HTMLElement;
      if (alertElement) {
        alertElement.style.zIndex = "9999"; // Menetapkan z-index yang lebih tinggi dari ShopModal
      }
    },
  });
};

export const WinningAlert = (playerName: string, money: number) => {
  Swal.fire({
    title: `🎉 KAMU MENANG 🎉`,
    text: `Selamat ${playerName.toLocaleUpperCase()}, kamu mencapai jumlah batas item dengan sisa uang ${rupiahFormat(
      money
    )}. Kamu layak jadi pemenang 🎉🎉🎉`,
    icon: "success",
    confirmButtonColor: "#7793F8",
    confirmButtonText: "KEMBALI",
    backdrop: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
  }).then((result) => {
    if (result.isConfirmed) {
      sessionStorage.clear();
      window.location.href = "/";
    }
  });
};
