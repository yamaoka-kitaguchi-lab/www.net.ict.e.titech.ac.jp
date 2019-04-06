const BLACK = 0;
const WHITE = 1;

const navbar = (mode) => {
  switch (mode) {
    case WHITE:
      $("#lab-logo-black").hide();
      $("#lab-logo-white").show();
      $("nav").removeClass("bg-transparent").removeClass("navbar-dark");
      $("nav").addClass("bg-theme-white").addClass("navbar-light");
      $("button.navbar-toggler").removeClass("navbar-transparent");
      $(".nav-link").removeClass("navbar-link-transparent").addClass("text-dark");
      break;
    case BLACK:
      $("#lab-logo-white").hide();
      $("#lab-logo-black").show();
      $("nav").removeClass("bg-theme-white").removeClass("navbar-light");
      $("nav").addClass("bg-transparent").addClass("navbar-dark");
      $("button.navbar-toggler").addClass("navbar-transparent");
      $(".nav-link").addClass("navbar-link-transparent").removeClass("text-dark");
      break;
  }
};

const is_collapsed_nav_opened = () => {
  return $("#collapsibleNavbar").hasClass("show");
}

const toggle_navbar = () => {
  const scroll = $(window).scrollTop();
  if (scroll > 0 || is_collapsed_nav_opened() == true) navbar(WHITE);
  else navbar(BLACK);
};

$("button.navbar-toggler").on('click', () => {
  if (is_collapsed_nav_opened() == false) navbar(WHITE);
  else toggle_navbar();
});

$(document).ready(() => {
  toggle_navbar();
});

$(document).scroll(() => {
  toggle_navbar();
});
