$(".post-wrapper").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
});

function heart(product_id, btn) {
  var myheart = $(btn).children("i");
  if ($(myheart).hasClass("heart1")) {
    $(myheart).removeClass("heart1").addClass("heart-click");
    alert("관심목록에 추가되었습니다.");
    axios({
      url: "/api/like",
      method: "post",
      data: {
        user_id: sessionStorage.getItem("id"),
        product_id: product_id,
      },
    }).then((result) => {});
  } else {
    axios({
      url: "/api/like_delete",
      method: "delete",
      data: {
        user_id: sessionStorage.getItem("id"),
        product_id: product_id,
      },
    }).then((result) => {});
    $(myheart).removeClass("heart-click").addClass("heart1");
  }
}

axios({
  url: "/api/products",
  method: "post",
  data: {
    id: sessionStorage.getItem("id"),
  },
}).then((result) => {
  var product = result.data;
  for (var i = 0; i < 7; i++) {
    var imglist = product[i].img.split("..");
    var money = product[i].price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (sessionStorage.getItem("id")) {
      $(".new-first")
        .append(`<div class="newb col-xs-6 col-sm-6 col-md-4 col-lg-3">
      <div class="new-box2">
      <a class="link-wrap" href="/product/${
        product[i].id
      }"><img class="box-image" src="${imglist[0]}">
      </div>
      <div class="box-title">${product[i].title}</div>
      <div class="box-price">${money}<span>원</span></div></a>
      <button class="heart" type="button" onclick="heart(${
        product[i].id
      }, this)">
        <i class="${
          product[i].product_like_users.length ? "heart-click" : "heart1"
        } fa-solid fa-heart fa-xl"></i>
      </button>
    </div>`);
    } else {
      $(".new-first")
        .append(`<div class="newb col-xs-6 col-sm-6 col-md-4 col-lg-3">
      <div class="new-box2">
      <a class="link-wrap" href="/product/${product[i].id}"><img class="box-image" src="${imglist[0]}">
      </div>
      <div class="box-title">${product[i].title}</div>
      <div class="box-price">${money}<span>원</span></div></a>
      <button class="heart d-none" type="button" onclick="heart(${product[i].id}, this)">
        <i class="heart1 fa-solid fa-heart fa-xl"></i>
      </button>
    </div>`);
    }
  }
});

axios({
  url: "/api/products/popular",
  method: "post",
  data: {
    user_id: sessionStorage.getItem("id"),
  },
}).then((result) => {
  result = result.data.sort((a, b) => {
    return -(a.product_like_users.length - b.product_like_users.length);
  });
});
