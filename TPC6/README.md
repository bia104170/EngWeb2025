# Relatório Trabalho de Casa 6

**Data:** 2025-03-30

## Autor

**Nome:** Beatriz Carvalho Peixoto  
**Número:** A104170  

![Fotografia de identificação](../foto_identificacao.png)

## Resumo
1. Este trabalho de casa consistiu em resolver uma ficha.
2. Nesta ficha tínhamos de criar uma App para gerir contratos com dois serviços: o serviço da Api de dados e o serviço de front-end.
3. O serviço da Api de dados é uma aplicação em nodejs que recebe pedidos REST e interage com a base de dados mongoDB para aceder à informação.
4. O dataset inicialmente era em csv. Contudo, foi transformado em json para a ser incorporado em mongoDB.
5. O serviço de front-end responde a pedidos do utilizador com páginas web geradas através de templates PUG. Este serviço permite ao utilizador interagir com a aplicação para realizar várias operações.
6. Ambos os serviços comunicam na medida em que sempre que o frontend necessita de algum dado pede-os à API de dados.
7. Nesta aplicação, existem as seguintes páginas:
    - Uma página principal com a lista de contratos em que o ID de cada contrato é um link para a sua página e o NIPC da entidade comunicante é um link para a página da entidade. Contém também um botão de + para registar novos contratos e em cada contrato existe a ação de o editar ou remover
    - A página de cada contrato contém uma lista com toda a informação do contrato
    - A página de cada entidade contém o seu NIPC, o nome e o valor total dos seus contratos. Além disso, é apresentada também a lista dos contratos dessa entidade
    - A página de edit contém um formulário que permite alterar o registo de um contrato. 
    - A página de registo permite criar um contrato novo.
    - Existe também página para eliminar um contrato.
8.  Cada página apresenta um botão, no canto superior esquerdo, com uma "seta" que permite voltar à página anterior.

### Queries
As querys pedidas no exercício 1.2 encontram-se no ficheiro: ![queries.md](queries.md).

### MongoDB
1. Para o mongoDB foi criado um container no docker cujo nome é mongoEW.
2. De modo a que o ficheiro com o dataset em json fosse reconhecido pelo mongoDB, foram feitas alterações ao ficheiro json original, ficando apenas uma lista com os alunos. O ficheiro em json alterado é ![db.json](apiContratos/db.json).
3. Este ficheiro foi importado para o docker e foi criada a base de dados EW2025 e, dentro desta, existe a coleção contratos que contém os dados do dataset.
4. Os comandos utilizados para realizar as operações referidas foram, fora do container:
    - docker cp db.json mongoEW:/tmp (para copiar o dataset)
    - docker start mongoEW (para iniciar o container)
    - docker exec -it mongoEW sh (para realizar operações dentro do container)
5. Dentro do container:
    - mongoimport -d EW2025 -c contratos db.json --jsonArray (para importar os dados para uma coleção)

### API de dados
1. O servidor da API de dados encontra-se em ![apiContratos](apiContratos/)
2. O servidor da API de dados contém três partes principais:
    - controllers, que contém a lógica das várias operações a realizar na base de dados e interage com o model.
    - models, que define como os dados são estruturados na base de dados.
    - routes, que define as rotas da API e quando uma rota é acessada, encaminha-a para a função do controller correspondente.

### Front-end 
1. Este servidor utiliza Express e está à escuta na porta 16001.
2. Neste servidor são implementados os métodos GET e POST para interagir com a API de dados.
3. Existem duas componentes principais neste servidor que são:
    - routes, que em ![index.js](routes/index.js) contém tanto a rota para a página inicial da aplicação web como as restantes rotas para as operações sobre os contratos. 
    - views que contém os vários ficheiros em PUG que permitem gerar as páginas HTML da aplicação.

## Utilização
### Servidor API de dados
1. **Iniciar o docker:** docker start mongoEW
2. **Executar o servidor:** npm start

### Servidor Front-end
1. **Executar o servidor:** npm start
2. **Ver página inicial:** http://localhost:16001/
3. **Ver contrato com ID 10424469:** http://localhost:16001/10424469
4. **Ver o entidade com NIPC 507105141:** http://localhost:16001/entidades/507105141
5. **Editar o contrato com ID 10424469:** http://localhost:16001/edit/10424469
6. **Remover o contrato com ID 10424469:** http://localhost:16001/delete/10424469
7. **Registar um novo contrato:** http://localhost:16001/registo
