class Game{
    //define propriedades para o objeto da classe
    constructor(){
        //atribui a propriedade button
        //e define seu valor como um botão
        this.button = createButton("");


        
    }
    
    //lidar com elementos
    handleElements(){
        //definir a posição
        this.button.position(width*0.66,100);
        this.button.class("resetButton");
        

        

        
        this.button.mousePressed(()=>{
            //escreve 
            database.ref("/").update({
                gameState:0,playerCount:0
            })
            //recarrega a janela local
            window.location.reload();
        })

    }

    
    
    start(){
        //cria o objeto form da classe Form
        form = new Form();
        //chama o método exibir do formulário
        form.exibir();

        //cria uma instância de novo jogador
        player = new Player();
        //pega a quantidade de jogadores no bd
        player.getCount();

        //cria a sprite do carro1
        car1 = createSprite(width/2 - 100, height-100);
        car1.addImage("carro", carimg1);
        car1.scale = 0.07;

        //cria a sprite do carro2
        car2 = createSprite(width/2 + 100, height-100);
        car2.addImage("carro", carimg2);
        car2.scale = 0.07;

        //adiciona as duas sprites na matriz cars
        cars = [car1, car2];
    }


    play(){
        form.esconder();
        Player.getInfo();
        this.handleElements();
        //checar se allPlayers tem valor
        if(allPlayers !== undefined){
           
            //colocar a imagem da pista
            image (pista, 0, -height*5 , width, height*6);
            
            //guardar o indice da sprite do carro
            var i = 0;
            //repetir os códigos pelo número de props do objeto
            for(var plr in allPlayers){
                //guarda do banco de dados o valor x
                var x = allPlayers[plr].posX;
                //guarda do banco de dados o valor y
                var y = height - allPlayers[plr].posY;
                //muda a posição da sprite do carro
                cars[i].position.x = x;
                cars[i].position.y = y;
                //aumenta o i para posicionar o outro carro
                i++;
                //checa se o valor de i é igual ao índice do jogador
                if( i == player.indice ){
                    //pinta de vermelho
                    fill("red");
                    //desenha uma bola vermelha
                    ellipse(x,y,60);
                    //a câmera segue o jogador
                    camera.position.y = y;
                 
                }

            }
            //chamar o método controlar carro
            this.controlarCarro();
            //desenhar as sprites
            drawSprites();
        }
    }

    controlarCarro(){
        if(keyDown(UP_ARROW)){
            player.posicaoY += 10;
            player.update();
        }
        
    }

    //lê no banco de dados e copia o valor de gameState
    getState(){
        database.ref("gameState").on("value", function(data){
            gameState = data.val();
        })
    }

    //atualiza o valor de gameState 
    update(state){
        database.ref("/").update({
            gameState:state
        })
    }
    

}
