const toggle_shadow = () => {
  const p = $('nav').hasClass('bg-theme-white') && $(window).scrollTop() > 0
  if (p === true) $('nav').removeClass('shadow-xs').addClass('shadow-sm');
  else $('nav').removeClass('shadow-sm').addClass('shadow-xs');
};

$(document).scroll(() => {
  toggle_shadow();
});
