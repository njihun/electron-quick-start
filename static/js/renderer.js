function adjustFontSize() {
    const width = window.innerWidth;

    if (width > 900) {
        document.body.style.fontSize = '2.5vh';
    } else {
        document.body.style.fontSize = '20px';
    }
}

adjustFontSize();

// 전체 화면 모드에서 크기 조정
window.addEventListener('resize', adjustFontSize);