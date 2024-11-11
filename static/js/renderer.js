import * as settings from "./settings.js";
import { translateAll } from "./translate.js";

window.electronAPI.logIn().then((result) => {
    if (result.success) {
        //로그인 성공
        document.querySelector('header > *:last-child > h4').textContent = 'name';
    } else {
        document.querySelector('header > *:last-child > h4').onclick = () => {
            //클릭시 로그인 창으로 이동
            settings.goToPage('view/logIn.html', 'main');
        };
    }
});
translateAll();