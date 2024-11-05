import * as settings from "./settings.js";
import { translateAll } from "./translate.js";
function adjustFontSize() {
    const width = window.innerWidth;

    if (width > 900) {
        document.body.style.fontSize = '3.55vh';
    } else {
        document.body.style.fontSize = '20px';
    }
}

adjustFontSize();
translateAll();

// 전체 화면 모드에서 크기 조정
window.addEventListener('resize', adjustFontSize);

function menuAction(element) {
    switch (element.id) {
        case 'startGame':
            let div = document.createElement('div');
            let div2 = document.createElement('div');
            let span = document.createElement('span');
            span.textContent = 'Loading';
            span.classList.add('translate');
            span.setAttribute('data-transKey', 'loading');
            div2.appendChild(span);
            div2.innerHTML += '..';
            div.appendChild(div2);
            span = document.createElement('div');
            span.textContent = 'Network?';
            div.appendChild(span);
            div.style.flexGrow = 1;
            div.style.display = 'flex';
            div.style.flexDirection = 'column';
            div.style.alignItems = 'center';
            div.style.justifyContent = 'center';
            element.appendChild(div);
            
            // 네트워크 연결 확인
            span.textContent = 'Network? ';
            if (navigator.onLine) {
                span.textContent += 'OK';
            } else {
                span.textContent += 'false';
                break;
            }

            // 사용자 인증 확인
            span.textContent = 'Authentication? ';
            if (true) {
                span.textContent += 'OK';
            } else {
                span.textContent += 'false';
                break;
            }

            // 서버 입장 가능 여부 확인
            span.textContent = 'Enter? ';
            if (false) {
                span.textContent += 'OK';
            } else {
                span.textContent += 'false';
                break;
            }
            break;
    
        default:
            break;
    }
    if (element.children[1].children[1].textContent.endsWith('false')) {
        // 입장 불가
        settings.printToTerm("Can not Enter.");
    }
}
// 메뉴 클릭 이벤트
document.querySelectorAll('nav li > button').forEach((e)=>{
    e.addEventListener('click', ()=>{
        document.getElementById('overlay').style.display = 'block';
        document.querySelectorAll('.modal').forEach((e2)=>{
            if(e.id==e2.id){
                e2.style.display = 'flex';
                menuAction(e2);
            }else{
                e2.style.display = 'none';
            }
        });
        translateAll();
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
            e.addEventListener('click', ()=>{
                settings.goToPage();
            });
            break;
    }
});


document.onclick = function (event) {
    var target = event.target.id;
  
    if (target) {
    }
  };