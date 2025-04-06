# Ficha de aferição

**Data:** 2025-04-05

## Autor

**Nome:** Beatriz Carvalho Peixoto  
**Número:** A104170  

![Fotografia de identificação](../foto_identificacao.png)

## Resumo 
Esta ficha de aferição teve o objetivo de nos fazer aplicar todos os conhecimentos obtidos durante as aulas no desenvolvimento de aplicações Web e outras tarefas.  
Deste modo, são explicadas nas várias secções abaixo o que foi feito nesta ficha.  
Além disso, nesta ficha foi utilizado o dataset disponibilizado na aula teórica.

## Exercício 1

### Persistência de dados
1. De modo a preparar o dataset fornecido ![dataset.json](ex1/api/dataset.json) para a aplicação Web, foram feitas algumas mudanças.
2. Inicialmente, o campo "bookId" foi substituído por _id. 
3. Os campos que continham listas em string foram transformados em listas e os números que estavam em string foram transformados em números. Isto foi feito através de um programa em python: ![dataset.py](ex1/api/database/dataset.py).
4. Dessa forma, preparou-se o dataset fornecido para poder ser utilizado na base de dados.
5. O dataset convertido é o ![db.json](ex1/api/db.json).

### Exercício 1.1 (Setup da base de dados)
1. Para o mongoDB foi criado um container no docker cujo nome é mongoEW.
2. Tendo o dataset preparado para a base de dados mongoDB, procedeu-se ao setup da base de dados da seguinte forma:
    - sudo docker cp db.json mongoEW:/tmp
    - sudo docker start mongoEW
    - sudo docker exec -it mongoEW sh
3. Dentro do mongo:
    - cd /tmp
    - mongoimport -d livros -c livros db.json --jsonArray

### Exercício 1.2 (Querys)
As querys pedidas no exercício 1.2 encontram-se no ficheiro: ![queries.txt](ex1/queries.txt). 

### API de dados
1. A API de daods responde na porta 17000.
2. O servidor da API de dados encontra-se em ![api](ex1/api/)
3. O servidor da API de dados contém três partes principais:
    - controllers, que contém a lógica das várias operações a realizar na base de dados e interage com o model.
    - models, que define como os dados são estruturados na base de dados.
    - routes, que define as rotas da API e quando uma rota é acessada, encaminha-a para a função do controller correspondente.

## Exercício 2
Nesta fase foi pedido que houvesse um link para a página do autor do livro através do id do autor. Como o dataset fornecido não tinha o id do autor foi necessário criar um.  
Desta forma, foi criada uma nova coleção a partir do dataset fornecido chamada de autores (![autores.json](ex1/api/autores.json)).  
Através de um programa em python ![gerarDB.py](ex1/api/database/gerarDB.py) foi gerado este dataset de autores que contém: o nome do livro, um id do autor gerado de forma incremental (por exemplo, author1, author2...), a lista de livros desse autor, em que cada elemento dessa lista corresponde a um dicionário com informação sobre o livro e, por fim, o número total de livros desse autor.  
Depois de ter este dataset de autores gerado, este foi adicionado à base de dados conforme o setup acima referido (foi adicionado à database livros e à coleção autores).  
Além disso, o dataset convertido (![db.json](ex1/api/db.json)) foi atualizado de modo a conter também um campo com o id do autor para que fosse possível aceder corretamente à página do autor através da lista de livros.


### Interface
1. O servidor do frontend encontra-se em ![frontend](ex2/frontend/)
2. Este servidor utiliza Express e está à escuta na porta 17001.
3. Sempre que necessitar de dados, este serviço comunica com a API de dados definida acima.
4. Existem duas componentes principais neste servidor que são:
    - routes, que em ![index.js](ex2/frontend/routes/index.js) contém tanto a rota para a página inicial da aplicação web como as restantes rotas para as operações sobre os contratos. 
    - views que contém os vários ficheiros em PUG que permitem gerar as páginas HTML da aplicação.

## Utilização
### Servidor API de dados
1. **Iniciar o docker:** docker start mongoEW
2. **Executar o servidor:** npm start

### Servidor Front-end
1. **Executar o servidor:** npm start
2. **Ver página inicial:** http://localhost:17001/
3. **Ver livro com o ID 2.Harry_Potter_and_the_Order_of_the_Phoenix :** http://localhost:17001/2.Harry_Potter_and_the_Order_of_the_Phoenix
4. **Ver o autor Harper Lee (ID author3):** http://localhost:17001/entidades/author3
