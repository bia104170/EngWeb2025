const http = require('http');
const axios = require('axios');

http.createServer((req, res) => {
    console.log("METHOD: " + req.method);
    console.log("URL: " + req.url);

    switch (req.method) {
        case "GET":

            if (req.url === "/") {
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                res.write("<h1>Página Inicial</h1>");
                res.write("<ul>")
                res.write("<ul>")
                res.write("<li><a href='/reparacoes'>Lista de Reparações</a></li>")
                res.write("<li><a href='/intervencoes'>Lista de Intervenções</a></li>")
                res.write("<li><a href='/veiculos'>Lista de Veículos</a></li>")
                res.write("</ul>")
                res.end()
            }
        
            else if (req.url === "/reparacoes") {
                axios.get('http://localhost:3000/reparacoes?_sort=nome')
                    .then(resp => {
                        var reparacoes = resp.data;
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                        res.write("<h1>Lista de Reparações</h1>");
                        res.write("<ul>");

                        reparacoes.forEach(element => {
                            res.write("<li>");
                            res.write(`<strong>Nome:</strong> ${element.nome} <br>`);
                            res.write(`<strong>NIF:</strong> <a href='/reparacoes/${element.nif}'>${element.nif}</a> <br>`);
                            res.write(`<strong>Data:</strong> ${element.data} <br>`);
                            res.write(`<strong>Marca:</strong> ${element.viatura.marca} <br>`)
                            res.write(`<strong>Modelo:</strong> ${element.viatura.modelo} <br>`)
                            res.write(`<strong>Matrícula:</strong> ${element.viatura.matricula} <br>`)
                            res.write(`<strong>Número intervenções:</strong> ${element.nr_intervencoes} <br>`)
                            res.write("<strong>Intervenções:</strong>")
                            res.write("<ul>")
                                element.intervencoes.forEach(intervencao => {
                                    res.write(`<li><a href='/intervencoes/${intervencao}'>${intervencao}</a></li>`)
                                })
                            res.write("</ul>")
                            res.write("</li>")
                        })
                        
                        res.write("</ul>");
                        res.write("<h6><a href='/'>Voltar à Página Inicial</a></h6>");
                        res.end();
                    })
                    .catch(err => {
                        res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'});
                        console.log("Erro ao obter reparações: ", err);
                        res.end();
                    });
            } 
            else if (req.url.match(/\/reparacoes\/.+/)) {
                var nif = req.url.split("/")[2]; // Extrair o nif da URL
                axios.get(`http://localhost:3000/reparacoes?nif=${nif}`)
                    .then(resp => {
                        var reparacoes = resp.data // é retornado uma lista 
                        var reparacao = reparacoes[0]
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                        res.write(`<h1>Detalhes da Reparação (NIF: ${reparacao.nif})</h1>`);
                        res.write(`<strong>Nome:</strong> ${reparacao.nome}<br>`);
                        res.write(`<strong>Data:</strong> ${reparacao.data}<br>`);
                        res.write(`<strong>Marca:</strong> ${reparacao.viatura.marca}<br>`);
                        res.write(`<strong>Modelo:</strong> ${reparacao.viatura.modelo}<br>`);
                        res.write(`<strong>Matrícula:</strong> ${reparacao.viatura.matricula}<br>`);
                        res.write(`<strong>Número de intervenções:</strong> ${reparacao.nr_intervencoes}<br>`);
            
                        // Lista de intervenções
                        res.write("<h3>Intervenções:</h3>");
                        res.write("<ul>");
                        reparacao.intervencoes.forEach(intervencao => {
                            res.write(`<li><a href='/intervencoes/${intervencao}'>${intervencao}</a></li>`);
                        });
                        res.write("</ul>");
            
                        res.write("<h6><a href='/reparacoes'>Voltar</a></h6>");
                        res.end();
                    })
                    .catch(err => {
                        res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'});
                        console.log(err);
                        res.end();
                    });
            }
            else if (req.url === "/intervencoes") {
                axios.get('http://localhost:3000/intervencoes?_sort=codigo')
                .then(resp => {
                    var intervencoes = resp.data;
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<h1>Lista de Intervenções</h1>")
                    res.write("<ul>");
                    intervencoes.forEach(element => {
                        res.write("<li>")
                        res.write(`<strong>Código:</strong> <a href='/intervencoes/${element.codigo}'>${element.codigo}</a><br>`)
                        res.write(`<strong>Nome:</strong> ${element.nome} <br>`)
                        res.write(`<strong>Descrição:</strong> ${element.descricao} <br>`)
                        
                        res.write("</li>")
                    });
                    res.write("</ul>");
                    res.write("<h6><a href='/'>Voltar à Página Inicial</a></h6>");
                    res.end();
                })
                .catch(err => {
                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'});
                    console.log("Erro ao obter reparações: ", err);
                    res.end();
                });
            }
            
            else if (req.url.match(/\/intervencoes\/.+/)) {
                var codigo = req.url.split("/")[2]; // Extrair o codigo da URL
                axios.get(`http://localhost:3000/intervencoes?codigo=${codigo}`)
                    .then(resp => {
                        var intervencoes = resp.data // é retornado uma lista 
                        var intervencao = intervencoes[0]
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                        res.write(`<h1>Detalhes da Intervenção: ${intervencao.codigo}</h1>`);
                        res.write(`<strong>Código:</strong> ${intervencao.codigo}<br>`)
                        res.write(`<strong>Nome:</strong> ${intervencao.nome} <br>`)
                        res.write(`<strong>Descrição:</strong> ${intervencao.descricao} <br>`)

                        res.write(`<h6><a href="#" onclick="window.history.back()">Voltar</a></h6>`)

                        res.end()
                    })
                    .catch(err => {
                        res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'});
                        console.log(err);
                        res.end();
                    }); 
            }

            else if (req.url === "/veiculos") {
            axios.get('http://localhost:3000/veiculos?_sort=marca')
            .then(resp => {
                var veiculos = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                res.write("<h1>Lista de Veículos</h1>");
                res.write("<ul>");
                veiculos.forEach(element => {
                    res.write("<li>")
                    res.write(`<strong>Matrícula:</strong> ${element.matricula}<br>`)
                    res.write(`<strong>Marca:</strong> <a href='/veiculos/${element.marca}'>${element.marca}</a><br>`)
                    res.write(`<strong>Modelo:</strong> ${element.modelo} <br>`)
                        
                    res.write("</li>")
                    });
        
                res.write("</ul>");
                res.write("<h6><a href='/'>Voltar à Página Inicial</a></h6>");
                res.end();
            })
            .catch(err => {
                res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'});
                console.log("Erro ao obter veículos: ", err);
                res.end();
            }); 

            } else if (req.url.match(/\/veiculos\/.+/)) {
                var marca = decodeURIComponent(req.url.split("/")[2]) // Extrair o codigo da URL
                axios.get(`http://localhost:3000/veiculos?marca=${encodeURIComponent(marca)}&_sort=modelo`)
                .then(resp => {
                    var veiculos = resp.data // é retornado uma lista 
                    console.log(veiculos)

                    var modelosContados = {} //objeto vazio em javascript
                    
                    veiculos.forEach(veiculo => {
    
                        if (modelosContados[veiculo.modelo]) {
                            modelosContados[veiculo.modelo]++
                        } else {
                            modelosContados[veiculo.modelo] = 1
                        } 

                        //console.log(veiculo.modelo)
                    })
                    console.log(modelosContados)
                    var soma = veiculos.length
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                    res.write(`<h1>Veículos da marca: ${marca} - #${soma}</h1>`);
                    for (const [modelo, num] of Object.entries(modelosContados)) {
                        res.write(`<strong>Modelo:</strong> ${modelo} - <strong>#</strong> ${num}<br>`);
                    }
                    res.write(`<h6><a href='/veiculos'>Voltar</a></h6>`)
                    res.end()
                    })
                    .catch(err => {
                        res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'});
                        console.log(err);
                        res.end();
                    });
            } else {
                res.writeHead(501, {'Content-Type': 'text/html;charset=utf-8'});
                res.end();
            } 

        break;

        default:
            res.writeHead(405, {'Content-Type': 'text/html;charset=utf-8'});
            res.end();
        break;
    }
}).listen(1234);

console.log("Servidor à escuta na porta 1234");