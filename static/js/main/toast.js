function myToastFunction(data) {
  // Get the snackbar DIV
  const alram = document.createElement("div");
  const other = document.createElement("div");
  const content = document.createElement("div");
  alram.classList.add("snackbar");
  const msg = data.msg.split(".");
  other.innerText = `${msg[0]}의 메세지`;
  content.innerText = `${msg[1]}  ${msg[2]}`;
  content.classList.add("content");
  alram.append(other);
  alram.append(content);
  // Add the "show" class to DIV
  alram.classList.add("show");

  document.querySelector("nav").append(alram);
  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    alram.className = alram.className.replace("show", "");
  }, 3000);
}
