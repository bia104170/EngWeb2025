# Relatório Trabalho de Casa 5

**Data:** 2025-03-22

## Autor

**Nome:** Beatriz Carvalho Peixoto  
**Número:** A104170  

![Fotografia de identificação](../foto_identificacao.png)

## Resumo
1. Este trabalho de casa consistiu em criar uma App para gerir alunos com dois serviços: o serviço da Api de dados e o serviço de front-end.
2. O serviço da Api de dados é uma aplicação em nodejs que recebe pedidos REST e interage com a base de dados mongoDB para aceder à informação.
3. O dataset em json é utilizado para importar os dados para a base de dados.
4. O serviço de front-end responde a pedidos do utilizador com páginas web geradas através de templates PUG. Este serviço permite ao utilizador interagir com a aplicação para realizar várias operações como listar alunos, inserir, editar e apagar.
5. Ambos os serviços comunicam na medida em que sempre que o frontend necessita de algum dado pede-os à API de dados.
6. Nesta aplicação, existem as seguintes páginas:
    - Uma página principal com a opção de Listar Alunos.
    - A página de alunos que contém uma tabela com a informação dos alunos e o nome do aluno é um link para a página individual do aluno.
    - A página de alunos contém também 2 botões principais: o botão de "Edit", para editar a informação de um aluno, e o botão "Delete" para apagar o registo desse aluno. Contém também o botão com o símbolo "+" que permite criar um novo aluno.
    - A página de edit contém um formulário que permite alterar o registo do aluno. 
    - A página de registo permite criar um aluno novo.
    - Existe também uma página para eliminar um aluno.

### MongoDB
1. Para o mongoDB foi criado um container no docker cujo nome é mongoTPC6.
2. De modo a que o ficheiro com o dataset em json fosse reconhecido pelo mongoDB, foram feitas alterações ao ficheiro json original, ficando apenas uma lista com os alunos. O ficheiro em json alterado é [alunos.json](apiAlunos/alunos.json).
3. Este ficheiro foi importado para o docker e foi criada a base de dados EWTPC6 e, dentro desta, existe a coleção alunos que contém os dados do dataset.
4. Os comandos utilizados para realizar as operações referidas foram, fora do container:
    - docker cp alunos.json mongoTPC6:/tmp (para copiar o dataset)
    - docker start mongoTPC6 (para iniciar o container)
    - docker exec -it mongoTPC6 sh (para realizar operações dentro do container)
5. Dentro do container:
    - mongoimport -d EWTPC6 -c alunos alunos.json --jsonArray (para importar os dados para uma coleção)

### API de dados
1. O servidor da API de dados encontra-se em [apiAlunos](apiAlunos/)
2. O servidor da API de dados contém três partes principais:
    - controllers, que contém a lógica das várias operações a realizar na base de dados e interage com o model.
    - models, que define como os dados são estruturados na base de dados.
    - routes, que define as rotas da API e quando uma rota é acessada, encaminha-a para a função do controller correspondente.

### Front-end 
1. Este servidor utiliza Express e está à escuta na porta 1234.
2. Neste servidor são implementados os métodos GET e POST para interagir com a API de dados.
3. Existem duas componentes principais neste servidor que são:
    - routes, que em [index.js](routes/index.js) contém a rota para a página inicial da aplicação web e em [alunos.js](routes/alunos.js) contém as várias rotas para realizar operações sobre os alunos. 
    - views que contém os vários ficheiros em PUG que permitem gerar as páginas HTML da aplicação.

## Utilização
### Servidor API de dados
1. **Iniciar o docker:** docker start mongoTPC6
2. **Executar o servidor:** npm start

### Servidor Front-end
1. **Executar o servidor:** npm start
2. **Ver página inicial:** http://localhost:1234/
3. **Ver lista de alunos:** http://localhost:1234/alunos 
4. **Ver o aluno A100660:** http://localhost:1234/alunos/A100660
5. **Editar o aluno A100660:** http://localhost:1234/alunos/edit/A100660
6. **Remover o aluno A100660:** http://localhost:1234/alunos/delete/A100660
7. **Registar um novo aluno:** http://localhost:1234/alunos/registo
