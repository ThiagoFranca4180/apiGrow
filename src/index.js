//-----------------------------------dependencias---------------------------------------------------------//
import express, { request, response } from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (request, response) => {
    response.status(201).send(JSON.stringify({Mensagem: `Seja bem vindo a aplicação`}))
});
//----------------------------------------variaveis gerais-----------------------------------------------//

let users = [];
let userId = 1;
let messageId = 1;



//---------------------------------------------------criar usuario-------------------------------------//
app.post('/signup',async (request,response)=>{
    const data = request.body;
    const name = data.name;
    const email = data.email;
    const password = data.password;

    if(!email){
        response.status(400).send(JSON.stringify({Mensagem : "Favor enviar um e-mail válido"}));
    }
    if(!password){
        response.status(400).send(JSON.stringify({Mensagem : "Favor enviar uma senha válida"}));
    }

    const verificarEmail = users.find((user)=> user.email === email);

    if(verificarEmail){
        response.status(400).send(JSON.stringify({Mensagem: "E-mail Já cadastrado no nosso banco de dados"}))
    }

    const senhaCriptografada = await bcrypt.hash(password,10);

    let newUser = {
        id: userId,
        name: name,
        email: email,
        password: senhaCriptografada,
        recados:[]
    }
    
    users.push(newUser)

    userId++

    response.status(201).send(JSON.stringify({Mensagem: `Novo Usuario ${newUser.name}, cadastrado com sucesso`}))
})

//--------------------------------------------------login--------------------------------------------------//

app.post('/login',async (request,response)=>{
    const data = request.body
    const email = data.email;
    const password = data.password;

    if(!email){
        response.status(400).send(JSON.stringify({Mensagem : "Favor enviar um e-mail válido"}));
    }
    if(!password){
        response.status(400).send(JSON.stringify({Mensagem : "Favor enviar uma senha válida"}));
    }

    const user = users.find(user=>user.email === email);

    const senhaMatch = await bcrypt.compare(password,user.password)

    if(!senhaMatch){
        response.status(400).send(JSON.stringify({Mensagem : "Senha não encontrada"}))
    }

    response.status(200).send(JSON.stringify({Mensagem : "login efetuado com sucesso"}))
})

// Consultar usuarios existentes(para identificação de rota)
app.get('/users', (request, response) => {
    return response.json(users);

});

//-----------------------------------Crud para lista de recados-----------------------------------------//

//-----------------------------------------Criar recado-------------------------------------------------//
app.post('/users/recados/:id', (request, response) => {
    const data = request.body
    const tituloRecado = data.titulo;
    const descricaoRecado = data.descricao;
    const parametroId = request.params.id;

    let novoRecado = {
        id: messageId++,
        titulo: tituloRecado,
        descricao: descricaoRecado
    }

    const buscarIndice = users.findIndex((usuario) => usuario.id == parametroId)


    if (buscarIndice == -1) {
        return response.json("Usuário não encontrado")
    }


    const usuario = users[buscarIndice]

    usuario.recados.push(novoRecado)

    return response.status(201).json(`seu recado  foi criado com sucesso`)
})

//--------------------------------------------ler recados---------------------------------------------//
app.get('/users/recados/:id', (request, response) => {
    const parametroId = request.params.id;

    const buscarIndice = users.findIndex((usuario) => usuario.id == parametroId)

   

    if (buscarIndice === -1) {
        return response.status(404).json("Usuário não encontrado");
    }

    

    const usuarioRecados = users[buscarIndice].recados;
    return response.status(200).json(usuarioRecados);
})

//-------------------------------------atualizar recados----------------------------------------------// 

app.put('/users/recados/:id/:idRecado', (request, response) => {
    const parametroId = request.params.id

    const userToAlterIndex = users.findIndex((usuario) => {
        return usuario.id == parametroId

    });

    const usuario = users[userToAlterIndex]
    const recados = usuario.recados
    const idRecado = request.params.idRecado

    const indiceRecado = recados.findIndex((item) => {
        return item.id == idRecado
    })

    const body = request.body

    let editarRecado = {
        id: idRecado,
        titulo: body.titulo,
        descricao: body.descricao
    }

    recados[indiceRecado] = editarRecado

    return response.json(recados[indiceRecado]);

});

//-----------------------------------------deletar recados--------------------------------------------------//

app.delete('/users/recados/:id/:idRecado', (request, response) => {
    const parametroId = request.params.id
    console.log(parametroId);

    const indiceUsuario = users.findIndex((user) => {
        return user.id == parametroId
    });

    console.log(indiceUsuario);

    if (indiceUsuario === -1) {
        return response.status(400).json("Erro! Usuario/Recado Não encontrado");
    }

    const recadosUsuario = users[indiceUsuario].recados

    const idRecado = request.params.idRecado

    const indiceRecado = recadosUsuario.findIndex((recado) => {
        return recado.id == idRecado
    })

    recadosUsuario.splice(indiceRecado, 1)
    return response.json("Recado apagado com sucesso.");
})




app.listen(8080, () => console.log("server on porta 8080"));