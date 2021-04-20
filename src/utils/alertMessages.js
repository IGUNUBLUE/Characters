import Swal from "sweetalert2";

export function autoCloseMessage(inputValue) {
  let timerInterval;
  Swal.fire({
    icon: "warning",
    title: `No results found for the search criteria: ${inputValue}`,
    html: "I will close in <b></b> milliseconds.",
    timer: 3500,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      timerInterval = setInterval(() => {
        const content = Swal.getContent();
        if (content) {
          const b = content.querySelector("b");
          if (b) {
            b.textContent = Swal.getTimerLeft();
          }
        }
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  });
}
