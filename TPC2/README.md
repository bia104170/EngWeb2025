# Relatório Trabalho de Casa 2

**Data:** 2025-02-22

## Autor

**Nome:** Beatriz Carvalho Peixoto  
**Número:** A104170  

![Fotografia de identificação](../foto_identificacao.png)

## Resumo
1. Este trabalho de casa consistiu em construir servidor web em node.js que consome uma API de dados servida pelo json-server e permite a criação de um website para uma escola de música.
2. Esse website contém:
    - Uma página principal com as opções de Listar Alunos, Listar Cursos e Listar Instrumentos.
    - A página de alunos que contém uma tabela com a informação dos alunos e cada número de aluno é um link para a página individual do aluno.
    - A página de cursos que contém a informação dos cursos e, clicando no seu ID, obtém-se a página desse curso que contém lista de alunos que o frequentam.
    - A página de instrumentos que contém a informação dos instrumentos e, clicando no ID, obtém-se a página do instrumento que contém lista de alunos que tocam esse instrumento.


## Lista de Resultados
1. O ficheiro db.json corresponde ao dataset da escola de música e consiste no conjunto de dados que servem o website. Através desse dataset foi possível criar o json-server.
2. O ficheiro server.js consiste no servidor em node.js, que utiliza o módulo HTTP para atender a pedidos e respostas. Este servidor consome a API de dados fornecida pelo json-server, o que permite a exibição de páginas HTML com as informações sobre os alunos, cursos e instrumentos. A porta utilizada para os clientes se comunicarem é a porta nº 1234. Foram implementadas várias páginas, tais como:
    - '/' que corresponde à página inicial do site. Contém 3 botões principais, um para listar os alunos, outro para listar os cursos e um terceiro para listar os instrumentos.
    - '/alunos' que corresponde a uma tabela com a informação de todos os alunos, ordenados pelo nome. O id do aluno é clicável.
    - '/alunos/id' onde id corresponde ao id do aluno. É a página individual de um aluno com o id indicado.
    - '/cursos' corresponde a uma tabela constituída pela informação dos cursos, onde o id do curso é clicável.
    - '/cursos/id' onde id é o id do curso. Corresponde à página de um curso específico, onde é apresentada uma lista dos alunos que frequentam esse curso.
    - '/instrumentos' é a página que contém a tabela com a informação de todos os instrumentos.
    - '/instrumentos/id' onde id é o id do instrumento. Corresponde à página de um instrumento específico e contém a lista dos alunos que tocam esse instrumento.
3. Em cada página é apresentado um botão "Voltar" que, ao ser clicado, permite voltar à página anterior.
4. O ficheiro mypages.js contém as várias funções que geram as páginas HTML necessárias ao website.
5. É utilizado o w3.css para dar estilo/beleza a essas páginas.
- ![db.json](db.json)
- ![server.js](server.js)
- ![mypages.js](mypages.js)
- ![w3.css](w3.css)

## Utilização
1. **Executar o json-server:** json-server --watch db.json
2. **Executar o servidor:** node server.js
3. **Página inicial:** http://localhost:1234
4. **Lista de alunos:** http://localhost:1234/alunos
5. **Lista de cursos:** http://localhost:1234/cursos
6. **Lista de instrumentos:** http://localhost:1234/instrumentos
7. **Ver o curso CB2:** http://localhost:1234/cursos/CB2
8. **Ver o aluno A32597:** http://localhost:1234/alunos/A32597
9. **Ver o instrumento I12:** http://localhost:1234/instrumentos/I12
