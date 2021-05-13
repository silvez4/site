const menuBtn = document.querySelector('.menu');
const menu = document.querySelector('nav');
let menuAtivo = false;
menuBtn.addEventListener('click', () => {
  if(!menuAtivo){
    menuBtn.classList.add('open');
    menu.classList.add('open');
    menuAtivo = true;
  } else{
    menuBtn.classList.remove('open');
    menu.classList.remove('open');
    menuAtivo = false;
    document.getElementById("#menu").style.display = "none";
  }
});