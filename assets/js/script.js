// navbar section
const znHamburger = document.getElementById("znHamburger");
const znMenu = document.getElementById("znMenu");
const znDropdown = document.querySelector(".zn-dropdown");
const znDropdownToggle = document.getElementById("znDropdownToggle");

znHamburger.addEventListener("click", () => {
  znMenu.classList.toggle("active");
});

znDropdownToggle.addEventListener("click", (e) => {
  if (window.innerWidth <= 992) {
    e.preventDefault();
    znDropdown.classList.toggle("active");
  }
});

// hero section

const znSlides = document.querySelectorAll(".zn-hero-slide");
const znDots = document.querySelectorAll(".zn-dot");

let znCurrent = 0;
let znInterval;

function znShowSlide(index) {
  znSlides.forEach((slide) => slide.classList.remove("active"));
  znDots.forEach((dot) => dot.classList.remove("active"));

  znSlides[index].classList.add("active");
  znDots[index].classList.add("active");

  znCurrent = index;
}

function znNextSlide() {
  let next = (znCurrent + 1) % znSlides.length;
  znShowSlide(next);
}

function znStartAutoSlide() {
  znInterval = setInterval(znNextSlide, 5000);
}

function znResetAutoSlide() {
  clearInterval(znInterval);
  znStartAutoSlide();
}

/* Klik dots */
znDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const slideIndex = parseInt(dot.getAttribute("data-slide"));
    znShowSlide(slideIndex);
    znResetAutoSlide();
  });
});

/* Init */
znStartAutoSlide();

// service section

const serviceTrack = document.querySelector(".zn-service-track");
const serviceCards = document.querySelectorAll(".zn-service-card");
const serviceNext = document.querySelector(".zn-service-next");
const servicePrev = document.querySelector(".zn-service-prev");

let serviceIndex = 0;
let cardsPerView = 3;

function getCardsPerView() {
  if (window.innerWidth <= 576) return 1;
  if (window.innerWidth <= 992) return 2;
  return 3;
}

function updateServiceSlider() {
  cardsPerView = getCardsPerView();

  const cardWidth = serviceCards[0].offsetWidth + 25;
  serviceTrack.style.transform = `translateX(-${serviceIndex * cardWidth}px)`;
}

function nextSlide() {
  const maxIndex = serviceCards.length - cardsPerView;
  if (serviceIndex < maxIndex) {
    serviceIndex++;
    updateServiceSlider();
  }
}

function prevSlide() {
  if (serviceIndex > 0) {
    serviceIndex--;
    updateServiceSlider();
  }
}

serviceNext.addEventListener("click", nextSlide);
servicePrev.addEventListener("click", prevSlide);

window.addEventListener("resize", () => {
  serviceIndex = 0;
  updateServiceSlider();
});

updateServiceSlider();

// modal section

const modal = document.getElementById("znServiceModal");
const modalOverlay = document.querySelector(".zn-modal-overlay");
const modalClose = document.querySelector(".zn-modal-close");

const modalTitle = document.getElementById("znModalTitle");
const modalDesc = document.getElementById("znModalDesc");
const therapistContainer = document.getElementById("znTherapistContainer");

document.querySelectorAll(".zn-service-card").forEach((card) => {
  card.addEventListener("click", () => {
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.full;

    const therapists = JSON.parse(card.dataset.therapists);

    therapistContainer.innerHTML = "";

    therapists.forEach((therapist) => {
      therapistContainer.innerHTML += `
        <div class="zn-therapist-item">
          <img src="${therapist.img}" alt="">
          <h4>${therapist.name}</h4>
        </div>
      `;
    });

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

// ===== Touch Swipe Functionality =====
let startx = 0;
let currentX = 0;
let isDragging = false;
let dragDiff = 0;

serviceTrack.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
  serviceTrack.style.transition = "none";
});

serviceTrack.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  currentX = e.touches[0].clientX;
  dragDiff = currentX - startX; // ubah arah

  const cardWidth = serviceCards[0].offsetWidth + 25;
  let tempTranslate = -serviceIndex * cardWidth + dragDiff;

  const maxTranslate = 0;
  const minTranslate = -(serviceCards.length - cardsPerView) * cardWidth;

  if (tempTranslate > maxTranslate) tempTranslate = maxTranslate;
  if (tempTranslate < minTranslate) tempTranslate = minTranslate;

  serviceTrack.style.transform = `translateX(${tempTranslate}px)`;
});

serviceTrack.addEventListener("touchend", () => {
  isDragging = false;
  serviceTrack.style.transition = "transform 0.6s ease";

  if (dragDiff < -50) {
    // swipe ke kiri → card selanjutnya
    nextSlide();
  } else if (dragDiff > 50) {
    // swipe ke kanan → card sebelumnya
    prevSlide();
  } else {
    updateServiceSlider();
  }

  dragDiff = 0;
});

// expert section

const teamTabs = document.querySelectorAll(".zn-team-tab");
const teamContents = document.querySelectorAll(".zn-team-content");

teamTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    teamTabs.forEach((btn) => btn.classList.remove("active"));
    tab.classList.add("active");

    teamContents.forEach((content) => {
      content.classList.remove("active");
    });

    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// testimoni section

const znTestimonialTrack = document.querySelector(".zn-testimonial-track");
const znTestimonialCards = document.querySelectorAll(".zn-testimonial-card");
const znTestimonialNext = document.querySelector(".zn-testimonial-next");
const znTestimonialPrev = document.querySelector(".zn-testimonial-prev");

let znTestimonialIndex = 0;
let znCardsPerView = getCardsPerView();

function getCardsPerView() {
  if (window.innerWidth <= 767) return 1;
  if (window.innerWidth <= 1199) return 2;
  return 3;
}

function updateTestimonialSlider() {
  znCardsPerView = getCardsPerView();

  const cardWidth = znTestimonialCards[0].offsetWidth;
  const maxIndex = znTestimonialCards.length - znCardsPerView;

  if (znTestimonialIndex > maxIndex) {
    znTestimonialIndex = maxIndex;
  }

  znTestimonialTrack.style.transform = `translateX(-${znTestimonialIndex * cardWidth}px)`;
}

znTestimonialNext.addEventListener("click", () => {
  const maxIndex = znTestimonialCards.length - znCardsPerView;
  if (znTestimonialIndex < maxIndex) {
    znTestimonialIndex++;
  } else {
    znTestimonialIndex = 0;
  }
  updateTestimonialSlider();
});

znTestimonialPrev.addEventListener("click", () => {
  const maxIndex = znTestimonialCards.length - znCardsPerView;
  if (znTestimonialIndex > 0) {
    znTestimonialIndex--;
  } else {
    znTestimonialIndex = maxIndex;
  }
  updateTestimonialSlider();
});

window.addEventListener("resize", () => {
  znTestimonialIndex = 0;
  updateTestimonialSlider();
});

updateTestimonialSlider();

// touchscreen mobile testimonial

let startX = 0;
let endX = 0;

const znTestimonialWrapper = document.querySelector(".zn-testimonial-slider");

znTestimonialWrapper.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

znTestimonialWrapper.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
});

znTestimonialWrapper.addEventListener("touchend", () => {
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      // Swipe kiri
      znTestimonialNext.click();
    } else {
      // Swipe kanan
      znTestimonialPrev.click();
    }
  }
});
