// Navbar burger toggle
document.addEventListener("DOMContentLoaded", function () {
  var $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener("click", function () {
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        $el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

// Smooth scrolling for anchors
$(document).on("click", 'a[href^="#"]', function (event) {
  event.preventDefault();
  $("html, body").animate(
    {
      scrollTop: $($.attr(this, "href")).offset().top
    },
    500
  );
});

// Scroll-to-top button
window.addEventListener("scroll", function () {
  let btn = document.getElementById("toTop");
  if (!btn) return;

  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
});

$(document).ready(function () {
  $(".preloader-wrapper").fadeOut(() => {
    $("body").removeClass("preloader-site");
  });
});

// 🎵 Background Music Controller
const music = document.getElementById("bg-music");
const btn = document.getElementById("music-btn");
const icon = document.getElementById("music-icon");

let isPlaying = false;

// Fade-in funksiyasi
function fadeInAudio() {
  music.muted = false;
  music.volume = 0;
  let vol = 0;
  const fade = setInterval(() => {
    if (vol < 1) {
      vol += 0.05;
      music.volume = Math.min(vol, 1);
    } else {
      clearInterval(fade);
    }
  }, 200);
}

// 🎬 Konvert ochilganda asosiy kontentni ko‘rsatish va musiqa yoqish
const envelope = document.querySelector(".envelope-wrapper");
if (envelope) {
  envelope.addEventListener("click", () => {
    envelope.classList.toggle("flap");

    // 1.5 sekunddan keyin asosiy sahifani ko‘rsatamiz (animatsiya tugashi uchun)
    setTimeout(() => {
      document.getElementById("welcome-screen").style.display = "none";
      document.getElementById("main-content").style.display = "block";

      // Musiqa boshlanadi
      music.play().then(() => {
        fadeInAudio();
        isPlaying = true;
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
      }).catch(err => console.log("Autoplay bloklandi:", err));
    }, 1500);
  });
}

// 🎵 Tugma orqali boshqarish
btn.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
  } else {
    music.play().then(() => fadeInAudio());
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
  }
  isPlaying = !isPlaying;
});
