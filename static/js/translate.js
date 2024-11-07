const languages = {
    en: {
        startGame: "Start Game",
        welcome: "Welcome to the world of adventure!",
        settings: "Settings",
        instructions: "Instructions",
        back: 'Back',
        language: 'Language',
        controls: 'Controls',
        err404: 'Page not found.',
        err404Count: 'Returning to the main page in 0 second.',
        loading: 'Loading',
        rejectEnter: 'Cannot Enter.',
        enterHelp: 'Can\'t enter the game?',
        help: 'Help',
        closeMsg: 'Thank you for playing!',
        closeCount: 'The game will close in 0 seconds.'
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
        err404: '페이지를 찾을 수 없습니다.',
        err404Count: '0초 후에 메인 페이지로 돌아갑니다.',
        loading: '로드 중',
        rejectEnter: '입장할 수 없습니다.',
        enterHelp: '게임에 입장할 수 없나요?',
        help: '도움말',
        closeMsg: '플레이해 주셔서 감사합니다!',
        closeCount: '게임이 0초 후에 종료됩니다.'
        // Add other phrases as needed
    },
    // Add other languages as needed
};

// langCode 불러오기
export const sharedState = {
    langCode: localStorage.getItem('langCode') || 'en-US'
}
// langCode 저장
localStorage.setItem('langCode', sharedState.langCode);
export function translate(key) {
    return languages[sharedState.langCode.split('-')[0]][key];
}
export function translateAll(element = document) {
    element.querySelectorAll('.translate').forEach((e)=>{
        e.textContent = translate(e.getAttribute('data-transKey'));
    });
}