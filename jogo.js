console.log('[DTeixeira92] Flappy Bird');
console.log('Inscreva-se no canal :D https://www.youtube.com/c/TioDavidEducação');


//criando uma variáveis iterativa que irá auxiliar na contabilização dos frames
//para saber quanto tempo se passou
let frames = 0;

const som_HIT = new Audio();
som_HIT.src = './audios/aimeuc.wav';

 const som_FUNDO = new Audio();
 som_FUNDO.src = './audios/nigthwishvoldown.wav';

 const som_TROLL = new Audio();
 som_TROLL.src = './audios/vcvailevarumasurra.wav';


const sprites = new Image();
sprites.src = './images/sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


// [Plano de Fundo]
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
      contexto.fillStyle = '#70c5ce';
      contexto.fillRect(0,0, canvas.width, canvas.height);
  
      contexto.drawImage(
        sprites,
        planoDeFundo.spriteX, planoDeFundo.spriteY,
        planoDeFundo.largura, planoDeFundo.altura,
        planoDeFundo.x, planoDeFundo.y,
        planoDeFundo.largura, planoDeFundo.altura,
      );
  
      contexto.drawImage(
        sprites,
        planoDeFundo.spriteX, planoDeFundo.spriteY,
        planoDeFundo.largura, planoDeFundo.altura,
        (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
        planoDeFundo.largura, planoDeFundo.altura,
        
      );
    },
  };

//Implementando uma função para criar o chão
function criaChao() {

    //Chão
    const chao = {

    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    atualiza() { 
        // console.log('vamos mexer o chão');
        const movimentoDoChao = 1;
        const repeteEm = chao.largura / 2;
        const movimentacao = chao.x - movimentoDoChao;
        

        // console.log('[chao.x]', chao.x);
        // console.log('[repeteEm]', repeteEm);
        // console.log('[Calculo maluco]', movimentacao % repeteEm);

        chao.x = movimentacao % repeteEm;
    },
    
    desenha(){
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, //Sprite X, Sprite Y
            chao.largura, chao.altura, //Tamanho do recorte na sprite
            chao.x, chao.y,
            chao.largura, chao.altura,   
        );

        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, //Sprite X, Sprite Y
            chao.largura, chao.altura, //Tamanho do recorte na sprite
            (chao.x + chao.largura), chao.y,
            chao.largura, chao.altura,   
        );
        
    },

}
    return chao;

};




//Criando function para tratar a colisão
function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if(flappyBirdY >= chaoY) {
        return true;
    }
        return false;
}


//Função que vai criar um novo Flappy Bird
function criaFlappyBird() {
    // Criando uma estrutura que representa o passarinho, Flappy Bird
const flappyBird = {

    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula(){
        // console.log('devo pular, senão, eu vou moooorrrréÊÊ');
        // console.log('[antes]', flappyBird.velocidade);
        flappyBird.velocidade = - flappyBird.pulo;
        // console.log('[depois]', flappyBird.velocidade);
    },
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
        
        if(fazColisao(flappyBird, globais.chao)){

            // console.log('Fez colisão');
        
            som_HIT.play();
            setTimeout(() => {
                mudaParaTela(Telas.INICIO);
            } , 250);
            
            return;

        }
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    movimentos: [

        { spriteX: 0, spriteY: 0, }, //asa para cima
        { spriteX: 0, spriteY: 26, }, //asa no meio
        { spriteX: 0, spriteY: 52, }, //asa para baixo
        { spriteX: 0, spriteY: 26, }, //asa no meio

    ],
    frameAtual: 0,
    atualizaFrameAtual() {
        const intervaloDeFrames = 10;
        const passouIntervalo = frames % intervaloDeFrames === 0;
        if(passouIntervalo) {
            const baseDoIncremento = 1;
            const incremento = baseDoIncremento + flappyBird.frameAtual;
            const baseRepeticao = flappyBird.movimentos.length;
            flappyBird.frameAtual = incremento % baseRepeticao;
        }
        // console.log(frames);
        // console.log('[incremento]', incremento);
        // console.log('[baseRepeticao]', baseRepeticao);
        // console.log('[frame]', incremento % baseRepeticao);

    },
    desenha(){
        flappyBird.atualizaFrameAtual();
        const {spriteX, spriteY}  = flappyBird.movimentos[flappyBird.frameAtual];
        contexto.drawImage(
            sprites,
            spriteX, spriteY, //Sprite X, Sprite Y
            flappyBird.largura, flappyBird.altura, //Tamanho do recorte na sprite
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura,   
        );

        
    }
    

}
    return flappyBird;
};



//mesagemGetReady
const mensagemGetReady = {

    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha(){
        contexto.drawImage(
            sprites,
            mensagemGetReady.sX, mensagemGetReady.sY,
            mensagemGetReady.w, mensagemGetReady.h, 
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.w, mensagemGetReady.h,
            
              
        );        
    },
    
};

//Função para criar os canos no jogo
function criaCanos(){

    const canos = {
        largura: 52,
        altura:400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha() {
            
            canos.pares.forEach(function(par) {
                
                const yRandom = -(par.y);
                const espacamentoEntreCanos = 90;
    
                const canoCeuX = par.x;
                const canoCeuY = yRandom;
                
                //CANO DO CEU
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )
    
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
    
                //CANO DO Chao
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )


            })
        },
        pares: [],
        atualiza() {

            const passou100Frames = frames % 100 === 0;
            if(passou100Frames){
                // console.log('passou100Frames');
                canos.pares.push({
                    x: canvas.width,
                    y: 150 * (Math.random() + 1),
                });

            }

            canos.pares.forEach(function(par) {
                par.x = par.x - 2;
                if(par.x + canos.width <= 0) {
                    canos.pares.shift();
                }
            });
        }

    }

    return canos;

}

// 
// TELAS
//Criando objeto globais que vai receber valores
const globais = { };
//Usando let porque o valor de telaAtiva vai sempre alterar
let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;
    
  
    if(telaAtiva.inicializa) {
      telaAtiva.inicializa();
      
      
    }
  }

const Telas = {
    INICIO: {

           
        inicializa() {
            
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
            som_FUNDO.pause();
            globais.canos = criaCanos();
            
                        
        },
        desenha() {
            planoDeFundo.desenha();
            globais.flappyBird.desenha();
            globais.canos.desenha();
            globais.chao.desenha();
            // mensagemGetReady.desenha();
                        
        },
        click() {
            som_TROLL.play();            
            mudaParaTela(Telas.JOGO);
            
        },
        atualiza() {
            
            globais.chao.atualiza();
            globais.canos.atualiza();
        }
    }
};

Telas.JOGO ={
    desenha() {           
        planoDeFundo.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
    },
    click() {
        som_FUNDO.play();
        globais.flappyBird.pula();
    },
    atualiza() {
        globais.flappyBird.atualiza();
        
      
    }
};


function loop(){

    telaAtiva.desenha();
    telaAtiva.atualiza();
     
    frames = frames + 1;
    requestAnimationFrame(loop);

}

window.addEventListener('click', function() {
    if(telaAtiva.click) {
        telaAtiva.click();
        
    }
})

mudaParaTela(Telas.INICIO);
loop();