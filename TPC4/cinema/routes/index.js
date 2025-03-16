var express = require('express');
var axios = require('axios')
var router = express.Router();

router.get('/', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  res.render('index', {title: 'Página Inicial',
                       'date': date});
});

router.get('/filmes', function(req, res) {
  var date = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/filmes')
    .then(resp=> {
      res.render('filmes', {lfilmes: resp.data, 'date': date})
    })
    .catch(error => {
      console.log(error)
      res.render('error'), {error:error}
    });
});

router.get('/filmes/:nome', function(req, res) {
  var date = new Date().toISOString().substring(0, 16)
  var nome = req.params.nome;
  axios.get('http://localhost:3000/filmes')
    .then(resp=> {
      var dados = resp.data
      var lista = []
      dados.forEach(filme => { 
          filme.cast.forEach(ator => {
            if (ator == nome) {
              lista.push(filme)
            }
          })
      });
      if (lista.length > 0) {
        res.render('atorPage', {ator: nome, filmes: lista, 'date': date})
      } else {
        res.render('error', { error: 'Ator não encontrado nos filmes' });
      }
    })
    .catch(error => {
      console.log(error)
      res.render('error'), {error:error}
    });
});


router.get('/filmes/edit/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  var nomeFilme = req.params.id;
  axios.get("http://localhost:3000/filmes")
  .then( resp => {
    var dados = resp.data

    var filme = dados.find(f => f.id === nomeFilme);

    if (filme) {
      res.render('atorEditPage', { filme: filme, date: date });
    } else {
      res.status(404).render('error', { error: 'Filme não encontrado' });
    }
  })
  .catch(error => {
    console.error(error);
    res.status(500).render('error', { error: 'Erro ao obter os filmes' });
  });
});

router.post('/filmes/edit/:id', function(req, res, next) {
  var idFilme = req.params.id;
  var result = req.body;

  result.genres = [].concat(result.genres);
  result.cast = [].concat(result.cast);
  
  axios.get("http://localhost:3000/filmes")
    .then(resp => {
      var filme = resp.data.find(f => f.id == idFilme);

      if (filme) {
        axios.put(`http://localhost:3000/filmes/${idFilme}`, result)
        .then(() => {
          res.redirect('/filmes');
        })
        .catch(error => {
          console.error(error);
          res.status(500).render('error', { error: 'Erro ao atualizar o filme' });
        });
      } else {
        res.status(404).render('error', { error: 'Filme não encontrado' });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).render('error', { error: 'Erro ao buscar os filmes' });
    });
});


router.get('/filmes/delete/:id', function(req, res) {
  var date = new Date().toISOString().substring(0, 16);
  var idFilme = req.params.id;

  axios.get('http://localhost:3000/filmes')
    .then(resp => {
      var dados = resp.data;
      var filme = dados.find(f => f.id === idFilme);

      if (filme) {
        res.render('filmDeletePage', { filme: filme, date: date });
      } else {
        res.render('error', { error: 'Filme não encontrado' });
      }
    })
    .catch(error => {
      console.log(error);
      res.render('error', { error: error });
    });
});


router.post('/filmes/delete/:id', function(req, res) {
  var idFilme = req.params.id;

  axios.delete(`http://localhost:3000/filmes/${idFilme}`)
    .then(() => {
      res.redirect('/filmes');
    })
    .catch(error => {
      console.error(error);
      res.status(500).render('error', { error: 'Erro ao excluir o filme' });
    });
});



module.exports = router;