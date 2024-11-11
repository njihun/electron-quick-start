import { sharedState, translate, translateAll } from "./translate.js";
import { langList } from "./settings.js";
document.querySelectorAll('.checkbox').forEach((e) => {
    e.querySelector('span').addEventListener('click', () => {
        let checkbox = e.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
    });
});

langList.forEach((e, i)=>{
    document.querySelectorAll('#language > a')[i].addEventListener('click', () => {
        sharedState.langCode = e.code;
        localStorage.setItem('langCode', sharedState.langCode);
        translateAll();
        translateAddValue();
    });
    if (sharedState.langCode == e.code) {
        document.querySelectorAll('#language > a')[i].click();
    }
});

/**
 * 번역 후 빈칸에 값을 넣음
 * @param {*} data 
 */
function translateAddValue() {
    let targets = document.querySelectorAll('.translate');
    targets.forEach((e) => {
        switch (e.getAttribute('data-transKey')) {
            case 'oath':
                e.textContent = e.textContent.replace('{}', 'Title');
                let a = document.createElement('a');
                a.href = '#';
                let strong = document.createElement('strong');
                strong.textContent = translate('termsOfService');
                a.appendChild(strong);
                e.innerHTML = e.innerHTML.replace('{}', a.outerHTML);
                
                a = document.createElement('a');
                a.href = '#';
                strong = document.createElement('strong');
                strong.textContent = translate('privacyPolicy');
                a.appendChild(strong);
                e.innerHTML = e.innerHTML.replace('{}', a.outerHTML);

                document.querySelector('.form > input#email').placeholder = translate('email');
                document.querySelector('.form > input#pwd').placeholder = translate('pwd');
                break;
        
            default:
                break;
        }
        
    })
}