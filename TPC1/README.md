# Relatório Trabalho de Casa 1

**Data:** 2025-02-15

## Autor

**Nome:** Beatriz Carvalho Peixoto  
**Número:** A104170  

![Fotografia de identificação](../foto_identificacao.png)

## Resumo
1. Este trabalho de casa consiste num servidor web em node.js que consome uma API de dados servida pelo json-server.
2. Quando é feito um pedido, o servidor node.js consulta a API de dados fornecida pelo json-server.
3. Depois são criadas páginas web que servem para responder aos pedidos feitos.


## Lista de Resultados
O ficheiro dataset_reparacoes.json corresponde ao dataset da oficina de reparações fornecido.
O ficheiro dataset.py gera o dataset da oficina de reparações mas que contém, além da lista de reparações, 
uma lista com os veículos e outra lista com as intervenções.
O ficheiro dataset_reparacoes_novo.json corresponde ao dataset gerado pelo ficheiro dataset,py.
Por fim, o ficheiro server.js é o servidor criado em Node.js que responde com páginas web em HTML a pedidos HTTP.
- ![Ficheiro dataset dado](dataset_reparacoes.json)
- ![Ficheiro gera o dataset](dataset.py)
- ![Ficheiro novo dataset](dataset_reparacoes_novo.json)
- ![Servidor (server.js)](server.js)