let x = 0;
let y = 0;
let velTiro = 14.27848;
let velAsteroid = 8;
let xAster = 0;
let tamanhopcX = Number(parseInt(window.screen.width)) - 40;
let tamanhopcY = Number(parseInt(window.screen.availHeight)) - 120;
let vida = 400;
let pontos = 0;
let nivel = 1;
let perdeu = 0;
let danoAsteroid = 4
//
let bodye = document.body;
//

function pausar(){
    if(jogoRodando == true){
        jogoRodando = false;
        document.body.querySelector('.pause-tela').style.display = 'block';
    }else{
        jogoRodando = true;
        document.body.querySelector('.pause-tela').style.display = 'none';
    }
}

function LevelUp(nivel){    
    document.body.querySelector('div.nivel-tela').style.display = 'block';
    document.body.querySelector('div.nivel-caixa p').innerHTML = nivel;
    document.body.querySelector('div.nivel-caixa').classList.add('animate__animated', 'animate__bounceInLeft');
    jogoRodando = false;
    danoAsteroid += nivel

    setTimeout(() => {
    document.body.querySelector('div.nivel-caixa').classList.add('animate__animated', 'animate__bounceOutRight');
    document.body.querySelector('div.nivel-caixa').addEventListener('animationend', () => {
        document.body.querySelector('div.nivel-tela').style.display = 'none';
        document.body.querySelector('div.nivel-caixa').classList.remove('animate__animated', 'animate__bounceOutRight');
        jogoRodando = true;
    });
    
    }, 2000);
        
}


function reset(){
    vida = 400;
    pontos = 0;
    velTiro = 14.27848;
    velAsteroid = 8;
    bodye.style.border = "none";
    nivel = 1;
    perdeu = 0;
    document.body.querySelector('#pontos').innerHTML = pontos;
}

function criadorDeAsteroid(num, quantidade){
    let i = quantidade;
    bodye.innerHTML += '<div class="asteroid" style= "top:-40px; left:'+num+'px;"></div>';
}

function perderVida(){
    let barraVida = document.body.querySelector('#barra-main');
    vida -= danoAsteroid;
    barraVida.style.width = vida+'px';
    bodye.style.border = "10px solid red"
}
/* o eixo x se altera conforme move a nave ***deu erro
bodye.addEventListener('mousemove', m => {
    x = m.pageX;
    console.log(x);
})*/

let funcaoMain = e => {
    if(jogoRodando){//por conta do botão de pause
    x = e.pageX;
    y = e.pageY;
    xAster = Number(Math.floor(Math.random() * tamanhopcX));
    criadorDeAsteroid(xAster);

    

    bodye.innerHTML += '<div class="tiro" style= "top: '+y+'px; left:'+x+'px;"></div>';
    let dives = document.body.querySelectorAll('div.tiro');
    let asteroides = document.body.querySelectorAll('div.asteroid');
    let numCordX;
    let numCordY;
    dives.forEach(div => {
        setInterval(function(){
            if(jogoRodando){//por conta do botão de pause
            //parte responsável pela movimentação dos tiros
            numCordY = parseInt(div.style.top);
            numCordX = parseInt(div.style.left);
            if(numCordY >= -20){
                numCordY -= velTiro;
            }
            div.style.top = numCordY+'px'; 
            }
        }, 20)
        if(parseInt(div.style.top) <= -10){
            if (div.parentNode) {
                div.parentNode.removeChild(div);
            }
        }
    });

    asteroides.forEach(aster => {
        let cordYaster;
        
        setInterval(function(){
            if(jogoRodando){//por conta do botão de pause
            //parte responsável pela movimentação dos asteroids
            cordYaster = parseInt(aster.style.top);
            if(cordYaster < tamanhopcY){
                cordYaster += velAsteroid;
            }
            aster.style.top = cordYaster+'px';
            //
            }

            cordYaster = parseInt(aster.style.top);
            if(cordYaster >= (tamanhopcY - 10)){//remove o asteroid se ele não aparece mais na tela
                if (aster.parentNode) {//remove o asteroid
                    aster.parentNode.removeChild(aster);
                    perderVida();
                    perdedor();
                }
            }


            let cordXaster = parseInt(aster.style.left);
            cordYaster = parseInt(aster.style.top);
            let maxX = cordXaster + 46;
            let minX = cordXaster - 10;
            let minY = cordYaster - 46;
            let maxY = cordYaster + 36;
            //conferidor se o tiro acertou
            if((numCordX <= maxX && numCordX >= minX) && (numCordY <= maxY && numCordY >= minY) || (numCordX == cordXaster && numCordY == cordYaster)){
                if (aster.parentNode) {
                    aster.parentNode.removeChild(aster);
                    pontos+= nivel;
                    //niveis----------->
                    if(pontos == 10){
                        nivel = 2;
                        LevelUp(nivel);
                        velAsteroid++;
                    }
                    if(pontos == 50){
                        nivel = 3;
                        LevelUp(nivel);
                        velAsteroid+=2;
                    }
                    if(pontos == 110){
                        nivel = 4;
                        LevelUp(nivel);
                        velAsteroid+=3;
                        velTiro+=2;
                    }
                    if(pontos == 230){
                        nivel = 5;
                        LevelUp(nivel);
                        velAsteroid+=4;
                        velTiro+=3;
                    }
                    if(pontos >= 999){
                        document.body.querySelector('#pontos').style.fontSize = '40px' 
                    }
                    //<-----------------
                    document.body.querySelector('#pontos').innerHTML = pontos;
                    console.log(pontos);
                    bodye.style.border = "none";
                }
            }
            /* se a nave atingir a mesma coordenada x que um asteroid ao mesmo tempo que atinge os limites das coordenadas y do asteroid
            // ou seja se um asteroid bate na nave, o eixo y não está muito preciso
            // o eixo x não está funcionando
            if(x = cordXaster && (y >= minY && y <= maxY)){
                if (aster.parentNode) {
                    aster.style.background = "url('XCVT.gif') no-repeat";
                    vida -= 20;
                    setInterval(function(){},500);
                    aster.parentNode.removeChild(aster);
                }
            }*/
        }, 50);

    });

    function perdedor(){
        if(vida <= 0){//-----------MORREU---------------
            bodye.querySelector('#game-over').style.display = 'block'
            perdeu = 1;
            let AllAsteroids = document.querySelectorAll('div.asteroid');
            AllAsteroids.forEach(aster => {
                if(aster.parentNode){
                    aster.parentNode.removeChild(aster)
                }
            });
        }
        if(perdeu == 1){
            console.log('entrou no if')
            bodye.removeEventListener('click', funcaoMain);
            reset();
            bodye.addEventListener('keypress', function(){
                console.log('resetou');
                gameOn();
                bodye.style.border = 'none';
                bodye.querySelector('#game-over').style.display = 'none';
            });
        }
    }
}
}

function gameOn(){
    bodye.addEventListener('click', funcaoMain);
}


gameOn();

