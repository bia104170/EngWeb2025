# Relatório Trabalho de Casa 3

**Data:** 2025-03-05

## Autor

**Nome:** Beatriz Carvalho Peixoto  
**Número:** A104170  

![Fotografia de identificação](../foto_identificacao.png)

## Resumo
1. Este trabalho de casa consistiu em construir servidor web em node.js que consome uma API de dados servida pelo json-server e permite a criação de um website que contém informação sobre alunos.
2. Esse website contém:
    - Uma página principal com a opção de Listar Alunos.
    - A página de alunos que contém uma tabela com a informação dos alunos e o nome do aluno é um link para a página individual do aluno.
    - A página de alunos contém também 2 botões principais: o botão de "Edit", para editar a informação de um aluno, e o botão "Delete" para apagar o registo desse aluno. Contém também o botão com o símbolo "+" que permite criar um novo aluno.

## Lista de Resultados
1. O ficheiro [alunos.csv](alunos.csv) corresponde ao dataset em csv. De modo a facilitar a sua manipulação, 
fez-se a conversão do dataset dos alunos em csv para [alunos.json](alunos.json). Através do dataset em json foi possível criar o json-server.
2. O ficheiro [server.js](server.js) consiste no servidor em node.js, que utiliza o módulo HTTP para atender a pedidos e respostas. 
3. Este servidor consome a API de dados fornecida pelo json-server, o que permite a exibição de páginas HTML com as informações necessárias
4. A porta utilizada para os clientes se comunicarem é a porta nº 7777. 
5. Foram implementadas várias páginas, tais como:
    - '/' que corresponde à página inicial do site. Contém o botão para listar os alunos.
    - '/alunos' que corresponde a uma tabela com a informação de todos os alunos, ordenados pelo nome. O nome do aluno é clicável.
    - '/alunos/id' onde id corresponde ao id do aluno. É a página individual de um aluno com o id indicado.
    - '/alunos/registo que corresponde ao formulário para registar um novo aluno
    - '/alunos/edit/id' que corresponde ao formulário para editar as informações do aluno, onde id corresponde ao seu número de aluno
    - 'alunos/delete/id' que corresponde à página de eliminar um registo do aluno, onde id corresponde ao seu número de aluno
3. Em cada página é apresentado um botão "Voltar" que, ao ser clicado, permite voltar à página anterior.
4. O ficheiro [templates.js](templates.js) contém as várias funções que geram as páginas HTML necessárias ao website.
5. É utilizado o [w3.css](w3.css) para dar estilo/beleza a essas páginas.


## Utilização
1. **Executar o json-server:** json-server --watch alunos.json
2. **Executar o servidor:** node server.js
3. **Página inicial:** http://localhost:7777
4. **Lista de alunos:** http://localhost:7777/alunos
5. **Página de um aluno:** http://localhost:7777/alunos/A100893
6. **Formulário de registo:** http://localhost:7777/alunos/registo
7. **Editar o registo de um aluno:** http://localhost:7777/alunos/edit/A100893
8. **Apagar registo de um aluno:** http://localhost:7777/alunos/delete/A100893
