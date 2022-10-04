axios({
  url: "/api/roomlist",
  method: "post",
  data: {
    user_id: sessionStorage.getItem("id"),
  },
}).then((res) => {
  const ul = document.querySelector(".area");

  res.data.map((el) => {
    const content_list = el.content.split("/");
    let last = content_list[content_list.length - 1].split(".");
    let lastClock = last[1];
    let lastContent = last[2];
    if (!lastClock) {
      last = "";
      lastContent = "";
    }

    const li = document.createElement("li");
    li.innerHTML = `<div class="room">
    <div class="imgbox">
      <img src="${el.img}" alt="" />
    </div>
    <div class="roomnickcon">
      <div class="roomnickname">${el["participations.target"]}</div>
      <div class="roomcontents">
      ${lastContent}
      </div>
    </div>
  </div>
  <div class="roomtimenoti">
    <div class="roomtime">${lastClock}</div>
    <div class="roomnotice">
      <div class="notibox"></div>
    </div>
  </div>`;
    li.classList.add("item");
    li.addEventListener("click", function () {
      goChatting(el.id);
    });
    ul.append(li);
  });
});

function goChatting(room_id) {
  location.href = `/socket/${room_id}`;
}
function back() {
  location.href = `/`;
}
