// ScrollMagic 사용
// init controller
const controller = new ScrollMagic.Controller();

const spyEls = document.querySelectorAll("section.scroll-spy");
//console.log(spyEls);

spyEls.forEach(function (spyEl, index) {
  // create a scene
  console.log(spyEl, index);
  new ScrollMagic.Scene({
    triggerElement: spyEl, //감시할 장면 추가 및 옵션 지정
    triggerHook: 0.5, // 화면의 50% 지점에서 보여짐 여부 감시 (0~1 지정)\
  })
    .setClassToggle(spyEl, "show") // 요소가 화면에 보이면 show 클래스 추가
    .addTo(controller); // 컨트롤ㄹ에 장면을 할당 (필수!)
});

const swiper = new Swiper(".project .swiper", {
  // 슬라이드 옵션 지정
  direction: "horizontal",
  loop: true, //반복 재생 여부 1->2->3 -> 다시 1
  /*autoplay: {
    // 자동 재생 여부
    delay: 5000, // 슬라이드가 5초마다 바뀜 
  }, */
  // 페이지네이션 옵션
  pagination: {
    el: ".project .swiper-pagination",
    clickable: true, // 사용자의 페이지네이션 요소 제어 가능 여부
  },

  // 이전/다음 슬라이드 버튼 옵션
  navigation: {
    nextEl: ".project .swiper-button-next",
    prevEl: ".project .swiper-button-prev",
  },
});

// 모달창 띄우기
const imageModal = document.querySelector("#imageModal");
const imageModalBtnList = document.querySelectorAll(".btn-modal-image");
const imageCloseBtn = document.querySelector("#imageModal .btn-close");
const imageEl = document.querySelector("#imageModal img");
//1.
/*for (const btn of imageModalBtnList) {
  btn.addEventListener("click", function () {
    imageModal.style.display = "flex";
  });*/

//2.
imageModalBtnList.forEach(function (imageModalBtn) {
  imageModalBtn.addEventListener("click", function () {
    imageModal.style.display = "flex";
    imageEl.src = imageModalBtn.dataset.imageSrc;
  });
});

imageCloseBtn.addEventListener("click", function () {
  imageModal.style.display = "none";
});

// ESX 키로 닫기

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    //e.key는 입력된 문자 자체
    imageModal.style.display = "none";
  }
});

//모달 바깥 영역 클릭 시 닫기
/*
window.addEventListener("click", function (event) {
  if (event.target === imageModal) {
    imageModal.style.display = "none";
  }
});*/

imageModal.addEventListener("click", function (event) {
  console.log(event.target); //현재 이벤트가 발생된 대상 (사용자가 실제로 클릭한 가장 안쪽 요소)
  console.log(event.currentTarget); // 이벤트가 바인딩된 요소 (여기선 imageModal), this와 동일
  event.stopPropagation(); // 부모 요소로의 확산 차단
  if (event.target === event.currentTarget) {
    imageModal.style.display = "none";
  }
});

// 현재 연도 표시
// 날짜 정보를 가진 JS의 Date 객체를 활용

let box = document.querySelector(".this-year");
let now = new Date();
let currentYear = now.getFullYear();
box.innerHTML = currentYear;

// 페이지 최상단으로 이동
const toTopEl = document.querySelector("#toTop");

// 페이지에 스크롤 이벤트 감지를 추가!
// 브라우저는 문서 전체의 스크롤을 window 기준을 처리
// window : 브라우저 창 객체

//const flashEls = document.querySelectorAll(".animate-flash");
const flashEls = document.querySelectorAll(".visual .inner h1 span");

window.addEventListener("scroll", function (event) {
  //console.log(window.scrollY);
  // Quiz: 페이지 스크롤 위치가 500 px 을 넘으면 요소를 보이고, 넘지 않으면 숨기기
  const scrollY = window.scrollY;
  if (scrollY <= 500) {
    toTopEl.style.opacity = "0";
    toTopEl.style.transform = "translateX(100px)";
    flashEls.forEach((e) => e.classList.add("animate-flash"));
  } else {
    toTopEl.style.opacity = "1";
    toTopEl.style.transform = "translateX(0)";
    flashEls.forEach((e) => e.classList.remove("animate-flash"));
  }
});
