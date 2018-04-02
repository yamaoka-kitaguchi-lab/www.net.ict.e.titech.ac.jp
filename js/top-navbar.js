const BLACK = 0;
const WHITE = 1;

const navbar = (mode) => {
  if (mode === WHITE) {
    $("#lab-logo-black").hide();
    $("#lab-logo-white").show();
    $("#navigationbar").removeClass("bg-transparent");
    $("#navbar-toggle-btn").removeClass("navbar-transparent");
    $(".navbar-link").removeClass("navbar-link-transparent");
  } else {
    $("#lab-logo-black").show();
    $("#lab-logo-white").hide();
    $("#navigationbar").addClass("bg-transparent");
    $("#navbar-toggle-btn").addClass("navbar-transparent");
    $(".navbar-link").addClass("navbar-link-transparent");
  }
};

const toggle_navbar = () => {
  const scroll = $(window).scrollTop();
  const is_navbar_opened = $("#navbar-main").attr("aria-expanded");
  if (scroll > 0 || is_navbar_opened === 'true') {
    navbar(WHITE);
  } else {
    navbar(BLACK);
  }
};

$(document).ready(() => {
  toggle_navbar();
});

$(document).scroll(() => {
  toggle_navbar();
});

$("#navbar-toggle-btn").on('click', () => {
  const is_navbar_opened = $("#navbar-main").attr("aria-expanded");
  if (is_navbar_opened === 'false') {
    navbar(WHITE);
  } else {
    toggle_navbar();
  }
});
