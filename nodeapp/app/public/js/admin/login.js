const main = document.querySelector('#main');
const login = document.querySelector('#login');
const form = document.querySelector('#form');
const password = document.querySelector('#password');
const path = location.href.replace(/(.*?)\/*$/, '$1');

main.addEventListener('click', ()=>{
  location.href = `${path}/../..`;
});

login.addEventListener('click', ()=>{
  form.submit();
});

password.addEventListener('keyup', e=>{
  if(e.keyCode == 13) {
    form.submit();
  }
});