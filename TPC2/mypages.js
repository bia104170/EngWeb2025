export function genMainPage(){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue-grey">
                    <h1>Página Inicial</h1>
                </header>
                <div class="w3-container">
                    <ul class="w3-ul">
                        <li>
                            <a href="/alunos" class="w3-button w3-block w3-light-grey">Listar Alunos</a>
                        </li>
                        <li>
                            <a href="/cursos" class="w3-button w3-block w3-light-grey">Listar Cursos </a>
                        </li>
                        <li>
                            <a href="/instrumentos" class="w3-button w3-block w3-light-grey">Listar Instrumentos</a>
                        </li>
                    </ul>
                </div>
                <footer class="w3-container w3-blue-grey w3-center">
                    <h5>2025 Escola de Música</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genAlunos(alunos){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Alunos</title>
            <link rel="stylesheet" type="text/css" href="/w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-light-blue">
                    <h1>Lista de alunos</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all w3-hoverable">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Data de Nascimento</th>
                            <th>Curso</th>
                            <th>Ano do Curso</th>
                            <th>Instrumento</th>
                        </tr>`
    alunos.forEach(a => {
        pagHTML += `
                        <tr>
                        <td><a href="/alunos/${a.id}" class="w3-text-blue">${a.id}</a></td>
                            <td>${a.nome}</td>
                            <td>${a.dataNasc}</td>
                            <td>${a.curso}</td>
                            <td>${a.anoCurso}</td>
                            <td>${a.instrumento}</td>
                        </tr>`
    });

    pagHTML += `
                    </table>
                </div>
                <h6><a href='/' class='w3-button'>Voltar</a></h6>
                <footer class="w3-container w3-light-blue w3-center">
                    <h5>2025 Escola de Música</h5>
                </footer>
            </div>
        </body>
    </html>`

    return pagHTML;
}

export function genAluno(aluno){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Aluno</title>
            <link rel="stylesheet" type="text/css" href="/w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-light-blue">
                    <h2>${aluno.nome}</h2>
                    <h3>${aluno.id}</h3>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all w3-hoverable">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Data de Nascimento</th>
                            <th>Curso</th>
                            <th>Ano do Curso</th>
                            <th>Instrumento</th>
                        </tr>`
        pagHTML += `
                        <tr>
                            <td>${aluno.id}</td>
                            <td>${aluno.nome}</td>
                            <td>${aluno.dataNasc}</td>
                            <td>${aluno.curso}</td>
                            <td>${aluno.anoCurso}</td>
                            <td>${aluno.instrumento}</td>
                        </tr>`

    pagHTML += `
                    </table>
                </div>
                <h6><a href='/alunos' class='w3-button'>Voltar</a></h6>
                <footer class="w3-container w3-light-blue w3-center">
                    <h5>2025 Escola de Música</h5>
                </footer>
            </div>
        </body>
    </html>`

    return pagHTML;
}

export function genCursos(cursos){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Cursos</title>
            <link rel="stylesheet" type="text/css" href="/w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-light-blue">
                    <h1>Lista de cursos</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all w3-hoverable">
                        <tr>
                            <th>Id</th>
                            <th>Designação</th>
                            <th>Duração</th>
                            <th>Instrumento</th>
                        </tr>`
    cursos.forEach(c => {
        pagHTML += `
                        <tr>
                        <td><a href="/cursos/${c.id}" class="w3-text-blue">${c.id}</a></td>
                            <td>${c.designacao}</td>
                            <td>${c.duracao}</td>
                            <td><b>${c.instrumento.id}</b>: ${c.instrumento["#text"]}</td>
                        </tr>`
    });

    pagHTML += `
                    </table>
                </div>
                <h6><a href='/' class='w3-button'>Voltar</a></h6>
                <footer class="w3-container w3-light-blue w3-center">
                    <h5>2025 Escola de Música</h5>
                </footer>
            </div>
        </body>
    </html>`

    return pagHTML;
}

export function genCurso(curso, alunos){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Curso</title>
            <link rel="stylesheet" type="text/css" href="/w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-light-blue">
                    <h2>${curso.designacao}</h2>
                    <h3>${curso.id}</h3>
                </header>

                <div class="w3-container">
                    <p><b>Designação:</b> ${curso.designacao}</p>
                    <p><b>Duração:</b> ${curso.duracao}</p>
                    <p><b>Instrumento:</b> ${curso.instrumento.id} - ${curso.instrumento["#text"]}</p>
                </div>
                <ul class = "w3-ul">
                        ${alunos.map(aluno => `
                            <li><b>${aluno.id}</b> - ${aluno.nome}</li>
                        `).join('')}
                </ul>
                    `

    pagHTML += `
                <h6><a href='/cursos' class='w3-button'>Voltar</a></h6>
                <footer class="w3-container w3-light-blue w3-center">
                    <h5>2025 Escola de Música</h5>
                </footer>
            </div>
        </body>
    </html>`

    return pagHTML;
} 


export function genInstrumentos(instrumentos){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Instrumentos</title>
            <link rel="stylesheet" type="text/css" href="/w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-light-blue">
                    <h1>Lista de instrumentos</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all w3-hoverable">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                        </tr>`
    instrumentos.forEach(instrumento => {
        pagHTML += `
                        <tr>
                        <td><a href="/instrumentos/${instrumento.id}" class="w3-text-blue">${instrumento.id}</a></td>
                            <td>${instrumento["#text"]}</td>
                        </tr>`
    });

    pagHTML += `
                    </table>
                </div>
                <h6><a href='/' class='w3-button'>Voltar</a></h6>
                <footer class="w3-container w3-light-blue w3-center">
                    <h5>2025 Escola de Música</h5>
                </footer>
            </div>
        </body>
    </html>`

    return pagHTML;
}

export function genInstrumento(instrumento, alunos){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Instrumento</title>
            <link rel="stylesheet" type="text/css" href="/w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-light-blue">
                    <h2>${instrumento["#text"]}</h2>
                    <h3>Id: ${instrumento.id}</h3>
                </header>
                <ul class = "w3-ul">
                        ${alunos.map(aluno => `
                            <li><b>${aluno.id}</b> - ${aluno.nome}</li>
                        `).join('')}
                </ul> `

    pagHTML += `
                <h6><a href='/instrumentos' class='w3-button'>Voltar</a></h6>
                <footer class="w3-container w3-light-blue w3-center">
                    <h5>2025 Escola de Música</h5>
                </footer>
            </div>
        </body>
    </html>`

    return pagHTML;
}
