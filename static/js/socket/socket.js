function back() {
  location.href = "/roomlist";
}

let messages = document.getElementById("messages");
let form = document.getElementById("form");
let input = document.getElementById("input");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!input.value) return;
  const nowClockLog = nowTimeLog();
  const userName = sessionStorage.getItem("id");
  myMsg(nowClockLog, input.value);
  socket.emit("chat message", {
    target: target,
    room_id: `room${room_id}`,
    msg: `${userName}.${nowClockLog}.${input.value}`,
  });
  input.value = "";
});

socket.on("chat message", function (data) {
  otherMsg(data.msg);
});

function nowTimeLog() {
  let today = new Date();

  let clock = "";
  let hours = today.getHours(); // 시
  let minutes = today.getMinutes(); // 분
  if (hours > 12) {
    hours -= 12;
    clock = "오후";
  } else {
    clock = "오전";
  }
  if (minutes.length == 1) minutes = "0" + minutes;
  return `${clock} ${hours} : ${minutes}`;
}

function myMsg(nowClockLog, data) {
  let item = document.createElement("li");
  let msg_span = document.createElement("span");
  let clock_span = document.createElement("span");

  item.classList.add("mymsg");
  clock_span.textContent = `${nowClockLog}`;
  msg_span.classList.add("msg");
  msg_span.classList.add("chat__custom");
  msg_span.classList.add("all");
  msg_span.textContent = `${data}`;
  item.append(clock_span);
  item.append(msg_span);
  messages.appendChild(item);
  messages.scrollTo(0, messages.scrollHeight);
}

function otherMsg(data) {
  let item = document.createElement("li");
  let div = document.createElement("div");
  let msg_span = document.createElement("span");
  let clock_span = document.createElement("span");
  const data_list = data.split(".");
  let userName = data_list[0];
  let msgClock = data_list[1];
  let msgContent = data_list[2];
  div.textContent = `${userName}`;
  msg_span.classList.add("chat__custom");
  msg_span.classList.add("msg");
  msg_span.textContent = `${msgContent}`;
  msg_span.classList.add("all");
  clock_span.textContent = `${msgClock}`;
  item.append(div);
  item.append(msg_span);
  item.append(clock_span);
  messages.appendChild(item);
  messages.scrollTo(0, messages.scrollHeight);
}
