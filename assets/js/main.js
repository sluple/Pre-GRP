/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
if(navClose){
  navClose.addEventListener('click', () =>{
      navMenu.classList.remove('show-menu')
  })
}

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== CHANGE BACKGROUND HEADER. 스크롤 할 때 어느순간 navbar 배경이 흰색으로 변경 ====================*/
function scrollHeader(){
  const header = document.getElementById('header')
  // When the scroll is greater than 100 viewport height, add the scroll-header class to the header tag
  if(this.scrollY >= 100){ 
    header.classList.add('scroll-header');
   } else { 
     header.classList.remove('scroll-header')
   }
}
window.addEventListener('scroll', scrollHeader)

/*==================== SWIPER DISCOVER ====================*/

var swiper = new Swiper(".discover__container", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: true,
  spaceBetween: 32,
  coverflowEffect: {
    rotate: 0
  }
});

/*==================== VIDEO ====================*/
const videoFile = document.getElementById('video-file'),
      videoButton = document.getElementById('video-button'),
      videoIcon = document.getElementById('video-icon')

function playPause(){ 
  if (videoFile.paused){
      // Play video
      videoFile.play()
      // We change the icon
      videoIcon.classList.add('ri-pause-line')
      videoIcon.classList.remove('ri-play-line')
  }
  else {
      // Pause video
      videoFile.pause(); 
      // We change the icon
      videoIcon.classList.remove('ri-pause-line')
      videoIcon.classList.add('ri-play-line')

  }
}

videoButton.addEventListener('click', playPause)

function finalVideo(){
    // Video ends, icon change
    videoIcon.classList.remove('ri-pause-line')
    videoIcon.classList.add('ri-play-line')
}
// ended, when the video ends
videoFile.addEventListener('ended', finalVideo)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
  const scrollUp = document.getElementById('scroll-up');
  // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if(this.scrollY >= 200){
    scrollUp.classList.add('show-scroll');
  } else{ 
    scrollUp.classList.remove('show-scroll')
  }
}
window.addEventListener('scroll', scrollUp)

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
  distance: '60px',
  duration: 2500,
  // reset: true,
})


sr.reveal(`.home__data, .home__social-link, .home__info,
          .section__title,
         .discover__container,
         .experience__data, .experience__overlay,
         .place__card,
         .sponsor__content,
         .footer__data, .footer__rights`,{
  origin: 'top',
  // interval: 100,
})

sr.reveal(`.about__data,
         .video__description,
         .subscribe__description`,{
  origin: 'left',
  interval: 100,
})

sr.reveal(`.about__img-overlay, 
         .video__content,
         .subscribe__form`,{
  origin: 'right',
  interval: 100,
})
/*새로추가한 달력 부분 */
document.addEventListener('DOMContentLoaded', function () {
  // 7월 달력만 표시하기 위해 필요한 부분만 남김
  const renderCalendar = () => {
    const viewYear = 2024;
    const viewMonth = 6; // 7월은 6(0부터 시작하므로)

    document.querySelector('.current-year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

    const thisLast = new Date(viewYear, viewMonth + 1, 0);
    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    const prevDates = [30]; // 6월 30일 포함
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [1, 2, 3]; // 8월 1, 2, 3일 포함

    const dates = prevDates.concat(thisDates, nextDates);

    dates.forEach((date, i) => {
      const condition = i >= 1 && i <= TLDate ? 'this' : 'other';
      const eventIndicator = (date >= 12 && date <= 18 && condition === 'this') ? '<div class="event-indicator"></div>' : '';
      dates[i] = `<div class="date ${condition} ${eventIndicator ? 'special' : ''}" data-date="${date}"><span class=${condition}>${date}</span>${eventIndicator}</div>`;
    });

    document.querySelector('.calendar-body').innerHTML = dates.join('');
  };

  renderCalendar();

  // 모달 관련 기능
  const modal = document.getElementById("scheduleModal");
  const span = document.getElementsByClassName("close")[0];

  // Event listener for dates with special class
  document.querySelectorAll('.date.special').forEach(dateElement => {
    dateElement.addEventListener('click', function () {
      const date = this.getAttribute('data-date');
      document.getElementById('modalTitle').innerText = `${date}일 일정`;
      document.getElementById('modalDescription').innerText = `${date}일의 일정에 대한 간략한 소개입니다.`;
      document.getElementById('modalImage').src = "path/to/your/image.jpg"; // 적절한 이미지 경로로 수정
      modal.style.display = "block";
    });
  });

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
document.addEventListener("DOMContentLoaded", function () {
  // 팝업 모달 요소
  var modal = document.getElementById("scheduleModal");
  var modalTitle = document.getElementById("modalTitle");
  var modalDescription = document.getElementById("modalDescription");
  var modalImage = document.getElementById("modalImage");
  var modalSpan = document.getElementById("modalSpan");
  var span = document.getElementsByClassName("close")[0];

  // 날짜 셀에 클릭 이벤트 추가
  document.querySelectorAll('.date.special').forEach(function (dateCell) {
    dateCell.addEventListener('click', function () {
      var date = this.getAttribute('data-date');
      // 이 부분에서 날짜에 맞는 팝업 내용을 설정합니다.
        if(date == "12") {
            modalTitle.textContent = date + " 일정";
            modalDescription.textContent = "뮌헨 박물관, 빅투알리엔";
            modalImage.src = "assets/img/place" + date + ".jpg"; // 예시 이미지 소스
            modalSpan.textContent = "뮌헨 독일 박물관 -> 컴퓨터에 역사적 발전과 함께 현재의 기술적 진보를 이해(컴퓨터 역사, 암호학, 정보통신기술, 로봇 공학 등) 빅투알리엔 -> 독일 전통 시장을 방문하여 독일 전통 식문화와 생활 방식을 보면서 독일 문화를 이해하고 시장 운영방식을 보면서 한국과 다른 점을 찾아 비교";

            modal.style.display = "block";
        }
        if(date == "13") {
            modalTitle.textContent = date + " 일정";
            modalDescription.textContent = "김우석 병장과 만남";
            modalImage.src = "assets/img/place" + date + ".jpg"; // 예시 이미지 소스
            modalSpan.textContent = "김우석 기상!!!";

            modal.style.display = "block";
        }
        if(date == "14") {
            modalTitle.textContent = date + " 일정";
            modalDescription.textContent = "뮌헨 박물관";
            modalImage.src = "assets/img/place" + date + ".jpg"; // 예시 이미지 소스
            modalSpan.textContent = "설명은 대충 이렇게 적으면 됨 ㅇㅇ";

            modal.style.display = "block";
        }
    });
  });

  // 화살표 버튼 클릭 이벤트 추가
  document.querySelectorAll('.place__button').forEach(function (arrowButton) {
    arrowButton.addEventListener('click', function () {
      var placeCard = this.closest('.place__card');
      var title = placeCard.querySelector('.place__title').textContent;
      var subtitle = placeCard.querySelector('.place__subtitle').textContent;
      var imageSrc = placeCard.querySelector('.place__img').src;
      var spanData = placeCard.querySelector('.place__price').textContent;

      // 모달 내용 설정
      modalTitle.textContent = title;
      modalDescription.textContent = subtitle;
      modalImage.src = imageSrc;
      modalSpan.textContent = spanData;

      modal.style.display = "block";
    });
  });

  // 닫기 버튼 클릭 이벤트
  span.onclick = function () {
    modal.style.display = "none";
  }

  // 모달 외부 클릭 시 닫기
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
});
