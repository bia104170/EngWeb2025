var express = require('express');
var router = express.Router();
const axios = require('axios');
const contrato = require('../apiContratos/models/contrato');


router.get('/', function(req, res, next) {

  var d = new Date().toISOString().substring(0, 10)

  axios.get('http://localhost:16000/contratos')
    .then(resp => {
      res.status(200).render("contractList", {lista: resp.data, title:"Gestor de Contratos", data: d})
    })
    .catch (error => {
      res.status(500).render("error", {error: error, data: d})
    })

});

router.get('/registo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  res.status(200).render('contractFormPage', {data: d, title: 'Registar aluno'})
});

router.post('/registo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var result = req.body //objeto que vem
  
  if (result)  {
      axios.post('http://localhost:16000/contratos', result)
           .then(resp => {
            res.redirect('/')
           })
           .catch(erro => {
              res.status(500).render("error", {'error': erro})
           })
  } else {
    res.status(500).render("error", {error: "Sem dados", data: d})
  }
});

router.get('/entidades', function(req, res, next) {

  var d = new Date().toISOString().substring(0, 10)

  axios.get('http://localhost:16000/contratos')
    .then(resp => {
      var contratos = resp.data
      var lentidades = []

      contratos.forEach(c => {
        let encontrado = false

          for (let i = 0; i < lentidades.length; i++) {
            if(lentidades[i].nipc == c.NIPC_entidade_comunicante) {
                lentidades[i].montante += c.precoContratual
                encontrado = true
                break
            }
          }
          if (!encontrado) {
            lentidades.push({
              nipc: c.NIPC_entidade_comunicante,
              nome: c.entidade_comunicante,
              valor: c.precoContratual
            })
          }
      });

      res.status(200).render("entidadesPage", {lista: lentidades, data: d, title: 'Lista de entidades'});
    })
    .catch (error => {
      res.status(500).render("error", {error: error, data: d})
    })

});


router.get('/entidades/:nipc', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 10)
  var nipc_contrato = req.params.nipc
  axios.get('http://localhost:16000/contratos')
    .then(resp => {

      var contratos = resp.data;
      var lcontratos = [];
      var valor = 0;
      var nomeEntidade = "";

      contratos.forEach(c => {
            if (c.NIPC_entidade_comunicante == nipc_contrato) {
                lcontratos.push(c)
                valor += c.precoContratual;
            }
          })

      if (lcontratos.length > 0) {
        nomeEntidade = lcontratos[0].entidade_comunicante
      }
      res.status(200).render("entidadePage", {nipc: nipc_contrato, nome: nomeEntidade, valor: valor, listacontratos: lcontratos, data: d, title: 'Página entidade'});
    })
    .catch (error => {
      res.status(500).render("error", {error: error, data: d})
    })
});

router.get('/:id', function(req, res, next) {

  var d = new Date().toISOString().substring(0, 10)
  var id_contrato = req.params.id
  axios.get('http://localhost:16000/contratos/' + id_contrato)
    .then(resp => {
      res.status(200).render("contractPage", {contrato: resp.data, data: d, title: 'Página do contrato'})
    })
    .catch (error => {
      res.status(500).render("error", {error: error, data: d})
    })

});


router.get('/edit/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var idContrato = req.params.id;
  axios.get('http://localhost:16000/contratos/' + idContrato)
  .then( resp => {

      res.status(200).render('contratoEditPage', { contrato: resp.data, data: d, title: 'Editar contrato'});

  })
  .catch(error => {
    console.error(error);
    res.status(500).render('error', { error: 'Erro ao obter os contratos' });
  });
});

router.post('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  var result = req.body;

  if (result) {

    axios.put('http://localhost:16000/contratos/' + result._id, result)
      .then(() => {
        res.redirect('/' + result._id);
      })
      .catch(error => {
        console.error(error);
        res.status(500).render('error', { error: 'Erro ao atualizar o aluno.' });
      });

  } else {
      res.status(500).render("error", {error: "Não há dados", data: d})
  }
  
});

router.get('/delete/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 10);
  var idContrato = req.params.id;

  axios.get(`http://localhost:16000/contratos/${idContrato}`)
      .then(resp => {
          res.status(200).render("contractDeletePage", { contratoId: idContrato, data: d, title: "Eliminar Contrato" });
      })
      .catch(error => {
          console.error(error);
          res.status(500).render("error", { error: "Erro ao obter os detalhes do contrato.", data: d });
      });
});



router.post('/delete/:id', function(req, res) {
  var id = req.params.id;

  axios.delete(`http://localhost:16000/contratos/${id}`)
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      console.error(error);
      res.status(500).render('error', { error: 'Erro ao remover o contrato' });
    });
});

module.exports = router;
