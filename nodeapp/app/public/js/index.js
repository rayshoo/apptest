const login = document.querySelector('#login');
const logout = document.querySelector('#logout');
const lists = document.querySelectorAll('.list li');
const user_name = document.querySelector('#name');
const user_mac = document.querySelector('#mac');
const user_port = document.querySelector('#port');
const power = document.querySelector('#power');
const add = document.querySelector('#add');
const remove = document.querySelector('#remove');
const path = location.href.replace(/(.*?)\/*$/, '$1');

if (login) {
  login.addEventListener('click', ()=>{
    location.href = `${path}/admin/login`;
  });
}

if (logout) {
  logout.addEventListener('click', ()=>{
    location.href = `${path}/admin/logout`;
  });
}

let index = 0;
for(list of lists){
  list.querySelector('span:nth-child(1)').innerText = ++index;
  let name = list.querySelector('span:nth-child(2)').innerText;
  let mac = list.querySelector('span:nth-child(3)').innerText;
  let port = list.querySelector('span:nth-child(4)').innerText;

  list.addEventListener('click', ()=>{
    user_name.value = name;
    user_mac.value = mac;
    user_port.value = port;

    user_name.scrollIntoView();
  });
}

power.addEventListener('click', ()=>{
    let result = CheckEmpty();
    if (result !== true) {
      document.querySelector(result).value = '';
      document.querySelector(result).focus();
      alert('모든 칸을 채워야합니다');
    } else {
    if (confirm(`${user_name.value}의 PC 전원을 켭니다.`)) {
      let mac = user_mac.value;
      let port = user_port.value;
  
      fetch(`${path}/power`,
      {
          method: "POST",
          body: JSON.stringify({ mac, port }),
          headers: {"Content-type": "application/json; charset=UTF-8"}
      })
    }
  }
});

if (add) {
  add.addEventListener('click', ()=>{
    let result = CheckEmpty();
    if (result !== true) {
      document.querySelector(result).value = '';
      document.querySelector(result).focus();
      alert('모든 칸을 채워야합니다');
    } else {
      if (confirm(`${user_name.value}의 PC정보를 저장합니다`)){
        let name = user_name.value;
        let mac = user_mac.value;
        let port = user_port.value;
  
        fetch(`${path}/add`,
        {
            method: "POST",
            body: JSON.stringify({ name, mac, port }),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => {
          if(response.status === 401) {
            alert('허가되지 않은 접근입니다')
          } else if(response.status !== 201) {
            alert('서버 오류, 관리자에게 문의하세요')
          };
          location.reload();
        })
      }
    }
  });
}

if (remove) {
  remove.addEventListener('click', ()=>{
    let result = CheckEmpty();
    if (result !== true) {
      document.querySelector(result).value = '';
      document.querySelector(result).focus();
      alert('모든 칸을 채워야합니다');
    } else {
      if (confirm(`${user_name.value}의 PC정보를 삭제합니다`)){
        let name = user_name.value;
        let mac = user_mac.value;
        let port = user_port.value;
  
        fetch(`${path}/remove`,
        {
            method: "DELETE",
            body: JSON.stringify({ name, mac, port }),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => {
          if(response.status === 401) {
            alert('허가되지 않은 접근입니다')
          } else if(response.status !== 201) {
            alert('서버 오류, 관리자에게 문의하세요')
          };
          location.reload();
        })
      }
    }
  });
}

(()=>{
  lists.length === 0
  ?
    (()=>{
      document.querySelector('main ul').style.display = 'none';
    })()
  : null;
})()

function CheckEmpty() {
  if(user_name.value.trim() === '') return '#name';
  if(user_mac.value.trim() === '') return '#mac';
  if(user_port.value.trim() === '') return '#port';
  return true;
}
