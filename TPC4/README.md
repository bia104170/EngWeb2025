# Relatório Trabalho de Casa 4

**Data:** 2025-03-16

## Autor

**Nome:** Beatriz Carvalho Peixoto  
**Número:** A104170  

![Fotografia de identificação](../foto_identificacao.png)

## Resumo
1. Este trabalho de casa consistiu em construir um servidor web em node.js que consome uma API de dados servida pelo json-server, utilizando o Express.
2. Esse website contém:
    - Uma página principal com a opção "Lista de filmes".
    - A página da lista de filmes que contém uma tabela com a informação de cada filme e onde o nome de cada elemento do elenco do filme é um link para a sua página. Cada filme da tabela contém dois botões: um de editar o filme e outro de apagar.
    - A página de cada ator contém uma tabela com todos os filmes em que o ator já participou.
    - A página para editar o filme contém um formulário para editar os respetivos campos.
    - A página para eliminar o filme contém a opção de confirmar que pretende eliminar o filme ou a opção de cancelar a ação.

## Lista de Resultados
1. O ficheiro [cinema.json](cinema/cinema.json) corresponde ao dataset. Uma vez que este dataset não continha o campo "id" em cada registo, 
de modo a ser possível realizar algumas operações, o "title" nos registos do dataset foi substituído por "id". Desse modo, no formulário de edit, não é possível modificar o título do filme.
2. A pasta routes contém o ficheiro [index.js](cinema/routes/index.js) onde são definidas todas as rotas no site.
3. A pasta views contém vários ficheiros em pug que permitem gerar as páginas do site.
4. A porta utilizada para os clientes se comunicarem é a porta nº 1234. 
5. Foram implementadas várias páginas, tais como:
    - '/' que corresponde à página inicial do site. Contém o botão para a lista de filmes.
    - '/filmes' que corresponde a uma tabela com a informação de todos os filmes, onde o nome de cada elemento do elenco é clicável.
    - '/filmes/nome' onde nome corresponde ao nome do ator. É a página individual de um ator com o nome indicado, onde aparecem os filmes em que esse ator participou.
    - '/filmes/edit/id' que corresponde ao formulário para editar as informações do filme, onde id corresponde ao título do filme.
    - 'filmes/delete/id' que corresponde à página de eliminar um registo de um filme, onde id corresponde ao título do filme
6. Em algumas páginas é apresentado um botão "Voltar" que, ao ser clicado, permite voltar à página anterior.
7. É utilizado o [w3.css](cinema/public/stylesheets/w3.css) para dar estilo/beleza às várias páginas.


## Utilização
1. **Executar o json-server:** json-server --watch cinema.json
2. **Executar o servidor:** npm run start
3. **Página inicial:** http://localhost:1234
4. **Lista de filmes:** http://localhost:1234/filmes
5. **Página de um ator:** http://localhost:1234/filmes/Glenn Closes
6. **Editar o registo de um filme:** http://localhost:1234/filmes/edit/102 Dalmatians
7. **Apagar registo de um filme:** http://localhost:1234/filmes/delete/102 Dalmatians
