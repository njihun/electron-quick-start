import * as settings from "./settings.js";
import { sharedState, translate, translateAll } from "./translate.js";
function adjustFontSize() {
    const width = window.innerWidth;

    if (width > 900) {
        document.body.style.fontSize = '3.55vh';
    } else {
        document.body.style.fontSize = '20px';
    }
}

adjustFontSize();

// 전체 화면 모드에서 크기 조정
window.addEventListener('resize', adjustFontSize);

// 메뉴 클릭 이벤트
document.querySelectorAll('nav li > button').forEach((e)=>{
    e.addEventListener('click', ()=>{
        document.getElementById('overlay').style.display = 'block';
        document.querySelectorAll('.modal').forEach((e2)=>{
            if(e.id==e2.id){
                e2.style.display = 'flex';
            }else{
                e2.style.display = 'none';
            }
        });
    });
});

let style = document.createElement('style');
let modalHeight = 0;
try{
    modalHeight = document.querySelector('.ad-banner').clientHeight;
}catch(err){
    document.querySelector('footer').style.marginBottom = 0;
    document.querySelector('footer').style.marginTop = '1.6em';
}
style.textContent = `
    .modal {
        height: calc(100vh - ${modalHeight}px);
    }
`;
document.head.appendChild(style);

document.querySelectorAll('.modal > *').forEach((e)=>{
    if(e.getAttribute('data-transKey')=='back'){
        e.addEventListener('click', ()=>{
            document.querySelector('#overlay').style.display = 'none';
            translateAll();
        });
    }
});

// 설정
document.querySelectorAll('.modal#settings > ul > li > button').forEach((e)=>{
    switch (e.getAttribute('data-transKey')) {
        case 'language':
            e.addEventListener('click', ()=>{
                settings.language();
            });
            break;
    
        default:
            break;
    }
});


document.onclick = function (event) {
    var target = event.target.id;
  
    if (target) {
    }
  };