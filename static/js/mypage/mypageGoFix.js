if (sessionStorage.id == sessionStorage.id) {
  var nameposition = document.querySelector("#id");
  nameposition.value = sessionStorage.id;
}

// 오류 메세지 사전을 만든다
const validityMessage = {
  badInput: "잘못된 입력입니다.",
  patternMismatch: "패턴에 맞게 입력하세요.",
  rangeOverflow: "비밀번호가 일치하지 않습니다.",
  rangeUnderflow: "우편번호 찾기를 눌러주세요.",
  stepMismatch: "우편번호 찾기로 등록해주세요.",
  tooLong: "[커스텀 메세지] 최대 글자 미만으로 입력하세요",
  tooShort: "[커스텀 메세지] 최소 글자 미만으로 입력하세요",
  typeMismatch: "[커스텀 메세지] 형식에 맞게 입력하세요",
  valueMissing: "[커스텀 메세지] 이 필드를 반드시 입력하세요",
};

$(document).ready(function () {
  $("#id").focus();
});
// 우편번호 찾기 찾기 화면을 넣을 element
var element_wrap = document.getElementById("wrap");

function closebtn() {
  // iframe을 넣은 element를 안보이게 한다.
  element_wrap.style.display = "none";
}

function findAdress() {
  // 현재 scroll 위치를 저장해놓는다.
  var currentScroll = Math.max(
    document.body.scrollTop,
    document.documentElement.scrollTop
  );
  new daum.Postcode({
    oncomplete: function (data) {
      // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ""; // 주소 변수
      var extraAddr = ""; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === "R") {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        // document.getElementById("etc").value = extraAddr;
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById("adress").value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("adress_more").focus();

      // iframe을 넣은 element를 안보이게 한다.
      // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
      element_wrap.style.display = "none";

      // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
      document.body.scrollTop = currentScroll;
    },
    // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
    onresize: function (size) {
      element_wrap.style.height = size.height + "px";
    },
    width: "100%",
    height: "100%",
  }).embed(element_wrap);

  // iframe을 넣은 element를 보이게 한다.
  element_wrap.style.display = "block";
}

let id = document.getElementById("id");
let pw = document.getElementById("pw");
let pwconfirm = document.getElementById("pwconfirm");
let name = document.getElementById("name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let adress = document.getElementById("adress");
///////////////////////////////////////////////
let idval = document.querySelector(".validid");
let pwval = document.querySelector(".validpw");
let pwconfirmval = document.querySelector(".validpwconfirm");
let nameval = document.querySelector(".validname");
let emailval = document.querySelector(".validemail");
let phoneval = document.querySelector(".validephone");

var valconfirm = /^[a-zA-Z0-9]{4,12}$/; //id와 pwassword 유효성 검사 정규식
var name_valconfirm = /^[가-힣]{2,15}$/; //이름 유효성검사 정규식
var email_valconfirm =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; //이메일 유효성검사
var phone_valconfirm = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
var adress_valconfirm = /^[가-힣0-9 ]{2,30}$/; //주소 유효성검사 (내가만듬)

//////개인 정보 수정하기//////
function fixInfo() {
  var form = document.querySelector("form");

  var id_key = 0;
  var pw_key = 0;
  var name_key = 0;
  var email_key = 0;
  var phone_key = 0;
  var adress_key = 0;

  if (pw.value == "") {
    pw.setCustomValidity(validityMessage["badInput"]);
  } else if (!valconfirm.test(pw.value)) {
    pw.setCustomValidity(validityMessage["patternMismatch"]);
  } else {
    pw.setCustomValidity("");
    pw_key = 1;
  }

  if (pwconfirm.value == "") {
    pwconfirm.setCustomValidity(validityMessage["badInput"]);
  } else if (pw.value !== pwconfirm.value) {
    pwconfirm.setCustomValidity(validityMessage["rangeOverflow"]);
  } else {
    pwconfirm.setCustomValidity("");
    pwconfirm_key = 1;
  }

  if (name.value == "") {
    name.setCustomValidity(validityMessage["badInput"]);
  } else if (!name_valconfirm.test(name.value)) {
    name.setCustomValidity(validityMessage["patternMismatch"]);
  } else {
    name.setCustomValidity("");
    name_key = 1;
  }

  if (phone.value == "") {
    phone.setCustomValidity(validityMessage["badInput"]);
  } else if (!phone_valconfirm.test(phone.value)) {
    phone.setCustomValidity(validityMessage["patternMismatch"]);
  } else {
    phone.setCustomValidity("");
    phone_key = 1;
  }

  if (adress.value == "") {
    adress.setCustomValidity(validityMessage["rangeUnderflow"]);
  } else if (!adress_valconfirm.test(adress.value)) {
    adress.setCustomValidity(validityMessage["stepMismatch"]);
  } else {
    adress.setCustomValidity("");
    adress_key = 1;
  }

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (id_key == 1 && pw_key == 1 && name_key == 1 && phone_key == 1);

  var data = {
    id: form.id.value,
    pw: form.pw.value,
    email: form.email.value,
    name: form.name.value,
    position: form.adress.value,
  };
  axios({
    url: "/api/user/update",
    method: "put",
    data: data,
  }).then((response) => {
    if (response.data) {
      alert("수정 완료");
      window.location.href = "/myfix";
    } else {
      alert("실패");
    }
  });
}

id.addEventListener("input", function (event) {
  if (valconfirm.test(id.value)) {
    id.setCustomValidity("");
    idval.classList.add("d-none");
  } else {
    idval.classList.remove("d-none");
  }
});
pw.addEventListener("input", function (event) {
  if (valconfirm.test(pw.value)) {
    pw.setCustomValidity("");
    pwval.classList.add("d-none");
  } else {
    pwval.classList.remove("d-none");
  }
});
pwconfirm.addEventListener("input", function (event) {
  if (pw.value !== pwconfirm.value) {
    pwconfirm.setCustomValidity("");
    pwconfirmval.classList.remove("d-none");
  } else {
    pwconfirmval.classList.add("d-none");
  }
});
name.addEventListener("input", function (event) {
  if (name_valconfirm.test(name.value)) {
    name.setCustomValidity("");
    nameval.classList.add("d-none");
  } else {
    nameval.classList.remove("d-none");
  }
});
phone.addEventListener("input", function (event) {
  if (phone_valconfirm.test(phone.value)) {
    phone.setCustomValidity("");
    phoneval.classList.add("d-none");
  } else {
    phoneval.classList.remove("d-none");
  }
});

axios({
  url: "/api/signup/idcheck",
  method: "post",
  data: { id: sessionStorage.getItem("id") },
}).then((result) => {
  const form = document.querySelector("form");
  form.id.value = result.data.id;
  form.name.value = result.data.name;
  form.email.value = result.data.email;
  form.adress.value = result.data.position;
});
