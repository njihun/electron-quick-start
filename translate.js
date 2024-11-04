import { language } from "./settings.js";

const languages = {
    en: {
        startGame: "Start Game",
        welcome: "Welcome to the world of adventure!",
        settings: "Settings",
        instructions: "Instructions",
        back: 'Back',
        language: 'Language',
        controls: 'Controls',
        // Add other phrases as needed
    },
    ko: {
        startGame: "게임 시작",
        welcome: "모험의 세계에 오신 것을 환영합니다.",
        settings: "설정",
        instructions: "설명",
        back: '돌아가기',
        language: '언어',
        controls: '조작',
        // Add other phrases as needed
    },
    // Add other languages as needed
};

export const sharedState = { langCode: 'en-US' };
export function translate(key) {
    return languages[sharedState.langCode.split('-')[0]][key];
}
export function translateAll(element = document) {
    element.querySelectorAll('.translate').forEach((e)=>{
        e.textContent = translate(e.getAttribute('data-transKey'));
    });
}