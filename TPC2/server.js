const http = require('http')
const axios = require('axios')
const { genMainPage, genAlunos, genAluno, genCursos, genCurso, genInstrumentos, genInstrumento, genPaginaErro} = require('./mypages.js');
const fs = require('fs')

http.createServer(async (req, res) => {
    var d = new Date().toISOString().substring(0,16);
    switch(req.method){
        case 'GET':
            
        if(req.url == '/'){
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(genMainPage())
                res.end()  
        } 
        
        if(req.url === '/alunos'){
            axios.get('http://localhost:3000/alunos?_sort=nome')
                .then(resp => {
                    var alunos = resp.data
                    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.write(genAlunos(alunos))
                    res.end()
                })
                .catch(err => {
                    console.log(err)
                    res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.end()
                })

            }
            else if(req.url.match(/\/alunos\/.+/)){
                var id = req.url.split("/")[2]
                
                // Buscar os dados do aluno com o ID específico
                var aluno = (await axios.get('http://localhost:3000/alunos/' + id)).data
            
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write(genAluno(aluno)) // Função que gera a página com os dados do aluno
                res.end()
            
        }

        if(req.url === '/cursos'){
            axios.get('http://localhost:3000/cursos?_sort=designacao')
                .then(resp => {
                    var cursos = resp.data
                    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.write(genCursos(cursos))
                    res.end()
                })
                .catch(err => {
                    console.log(err)
                    res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.end()
                })

            }

            else if(req.url.match(/\/cursos\/.+/)){
                var id = req.url.split("/")[2]
                
                // Buscar os dados do aluno com o ID específico
                var curso = (await axios.get('http://localhost:3000/cursos/' + id)).data
                var alunos = (await axios.get(`http://localhost:3000/alunos?_sort=name`)).data
                var alunos_lista = []
                

                    alunos.forEach(a => {
                    if (a.curso == id) {
                        alunos_lista.push(a);
                    }
                });

                
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write(genCurso(curso, alunos_lista)) // Função que gera a página com os dados do aluno
                res.end()
            
        }

            if(req.url === '/instrumentos'){
                axios.get('http://localhost:3000/instrumentos')
                    .then(resp => {
                        var instrumentos = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                        res.write(genInstrumentos(instrumentos))
                        res.end()
                    })
                    .catch(err => {
                        console.log(err)
                        res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                        res.end()
                    })
    
                }

            else if(req.url.match(/\/instrumentos\/.+/)){
                    var id = req.url.split("/")[2]
                    
                    // Buscar os dados do aluno com o ID específico
                    var instrumento = (await axios.get('http://localhost:3000/instrumentos/' + id)).data
                    var alunos = (await axios.get(`http://localhost:3000/alunos?_sort=name`)).data
                    var alunosL = []
                    
    
                        alunos.forEach(a => {
                        if (a.instrumento == instrumento["#text"]) {
                            alunosL.push(a);
                        }
                    });
    
                    
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(genInstrumento(instrumento, alunosL)) // Função que gera a página com os dados do aluno
                    res.end()   
            }

            else if(req.url.match(/w3\.css$/)){
                fs.readFile("w3.css", function(erro, dados){
                    if(erro){
                        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end('<p>Erro na leitura do ficheiro: ' + erro + '</p>')
                    }
                    else{
                        res.writeHead(200, {'Content-Type': 'text/css'})
                        res.end(dados)
                    }
                });
            }
        
            break;
            
        default:
            res.writeHead(405, {'Content-Type' : 'text/html;charset=utf-8'})
            res.end()
            break;
    }
}).listen(1234)

console.log("Server listen in port 1234...")