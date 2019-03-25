const newurl = 'https://www.net.ict.e.titech.ac.jp/';
var count = 10;
const threshold = 5;
const holder = document.getElementById("remaining");

const countdown = () => {
  switch (count) {
    case 0:
      window.location.href = newurl;
      break;
    case threshold:
      document.getElementById("btn1").classList.add('d-none');
      document.getElementById("btn2").classList.remove('d-none');
    default:
      holder.innerHTML = count;
      setTimeout("countdown()", 1000);
      count--;
  }
}

window.onload = () => {
  countdown();
}
