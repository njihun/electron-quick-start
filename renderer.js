function adjustFontSize() {
    const width = window.innerWidth;

    if (width > 900) {
        document.body.style.fontSize = '3.55vh';
    } else {
        document.body.style.fontSize = '20px';
    }
}

// 전체 화면 모드에서 크기 조정
window.addEventListener('resize', adjustFontSize);

document.querySelectorAll('nav li > button').forEach((e)=>{
    e.addEventListener('click', ()=>{
        document.getElementById('overlay').style.display = 'block';
        document.querySelectorAll('.modal').forEach((e2)=>{
            if(e.id==e2.id){
                try{
                    e2.style.height = `calc(100vh - ${document.querySelector('.ad-banner').clientHeight}px)`;
                }catch(err){
                    e2.style.height = '100vh';
                }
            }else{
                e2.style.display = 'none';
            }
        });
        switch(e.id){
            case 'start-game':
                break;
            case 'setting':
                break;
            case 'instructions':
                break;
            default:
                break;
        }
    });
});