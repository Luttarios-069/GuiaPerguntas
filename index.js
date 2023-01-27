const express = require('express');//importando o express
const app = express();//ativando o express
const bodyParser = require('body-parser');//importando o bodyParser
const conexao = require('./database/database');//importando a conexão do data base
const Pergunta = require('./database/Pergunta');//importando o model Pergunta
const Resposta = require('./database/Resposta');//importando o model Resposta

//autenticando no database
conexao
    .authenticate()
    .then(() => {
        console.log('Conexão feita com o banco de dados!')
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

//estou dizendo ao EXPRESS para usar o EJS como view engine
app.set('view engine', 'ejs');

//usando meus arquivos estaticos (css, imgs...)
app.use(express.static('public'));

//configurando o bodyParser
app.use(bodyParser.urlencoded({extended: false}));//tem a função de pegar meus dados do front-end e decodificar para meu back-end
app.use(bodyParser.json());

//criando rotas
app.get('/',(req,res) => {
    //comando equivalente ao SELECT FROM
    Pergunta.findAll({raw: true, order:[['id', 'DESC']]}).then(perguntas => {  //buscando os dados que são crus ou seja os dados que o usuário enviou e os ordenando
        res.render('index', {                                                  //além disso se cria uma variavél dentro do 'then' como o nome da model 
            perguntas: perguntas                                               //a variavél criada vai recer todas as perguntas                                                                                    
        });                                                                    //ASC = CRECESNTE DESC = DECRESCENTE        
    });                                                 
});

app.get('/perguntar', (req,res) => {
    res.render('perguntar') //escrevendo o meu HTML na rota utilizando o express e o ejs
});

app.post('/salvarpergunta', (req,res) => {
    
    var titulo = req.body.titulo;//recebendo o input do front-end
    var descricao = req.body.descricao;//recebendo o textarea do front-end
    
    Pergunta.create({//esse comando tem a mesma função do INSERT INTO do mysql, estou inserindo o meu titulo e minha dscrição dentro do database
        titulo: titulo,
        descricao: descricao
    }).then(() => {//se inserir corretamente
        res.redirect('/');//vai me redirecionar para a rota '/'
    });
});

app.get('/pergunta/:id', (req, res) => {
    var id_req = req.params.id;//armazenando o params
    
    Pergunta.findOne({//pegando apenas uma linha do meu Model 'Pergunta'
        
        where: {id: id_req}//selecionando através do where  onde o primeiro parametro é o que eu quero e o segundo é o que eu passo

    }).then(pergunta => {//variavel pergunta recebendo toda linha do id_req
        
        if(pergunta != undefined){//só vai dar undefined se o usuário não digitar o id valido
            
            Resposta.findAll({//buscando todas as respostas no meu banco de dados 
                
                order:[
                    ['id' , 'DESC']
                ],
                where: {perguntaId : pergunta.id}//buscando apenas na coluna 'perguntaId' 

            }).then(respostas => {//var resposta recebendo todas as respostas ou resposta
                
                res.render('pergunta', {

                    pergunta: pergunta,//recebendo a pergunta para poder enviar para o front-end
                    respostas: respostas//recebendo as respostas ou resposta 
                });
            })  
        }else{

            res.redirect('/');//caso der undefined vai ser redirecionado para a pág principal

        }
    });
});

app.post('/responder', (req, res) => {//rota que recebe dados de resposta do formulário
    var corpo = req.body.corpo;//recebendo o textarea 
    var perguntaId = req.body.pergunta;//recebendo o input que esta escondido
    Resposta.create({//inserindo dentro das colunas os dados
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {//redirecionando para página novamente
        res.redirect('/pergunta/'+perguntaId);
    });
});

//criando servidor
app.listen(8080, () => {
    console.log('App está rodando!');
});
