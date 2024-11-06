import { sharedState, translateAll } from "./translate.js";
export function goToPage(filename) {
    window.electronAPI.navigateTo(filename);
}
export function printToTerm(text) {
    window.electronAPI.print(text);
}
export function loadToBrowser(url) {
    window.electronAPI.loadGH(url);
}
export function language() {
    let modal = document.createElement('div');
    modal.classList.add('modal');
    modal.id = 'language';
    
    let h3 = document.createElement('h3');
    h3.style.flexGrow = 0;
    h3.setAttribute('data-transKey', 'language');
    h3.classList.add('translate');
    
    let ul = document.createElement('ul');
    ul.style.flexGrow = 1;
    
    [
        {'lang': 'English', 'code': 'en-US'},
        {'lang': '한국어', 'code': 'ko-KR'}
    ].forEach((e)=>{
        let li = document.createElement('li');
        
        let btn = document.createElement('button');
        btn.lang = e.code;
        btn.textContent = e.lang;
        btn.onclick = () => {
            sharedState.langCode = e.code;
            localStorage.setItem('langCode', sharedState.langCode);
            translateAll(modal);
        };

        li.appendChild(btn);
    
        ul.appendChild(li);
    });
    
    let btn = document.createElement('button');
    btn.style.flexGrow = 0;
    btn.setAttribute('data-transKey', 'back');
    btn.classList.add('translate');
    btn.addEventListener('click', ()=>{
        document.getElementById('overlay').removeChild(modal);
        translateAll(document.querySelector('.modal#settings'));
    })

    modal.appendChild(h3);
    modal.appendChild(ul);
    modal.appendChild(btn);

    translateAll(modal);
    
    document.getElementById('overlay').append(modal);
}