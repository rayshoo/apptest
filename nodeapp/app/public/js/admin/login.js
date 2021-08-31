const main = document.querySelector('#main');
const login = document.querySelector('#login');
const form = document.querySelector('#form');
const password = document.querySelector('#password');

main.addEventListener('click', ()=>{
  location.href = '/';
});

login.addEventListener('click', ()=>{
  form.submit();
});

password.addEventListener('keyup', e=>{
  if(e.keyCode == 13) {
    form.submit();
  }
});