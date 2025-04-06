var express = require('express');
var router = express.Router();
const axios = require('axios');


/* GET home page. */
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)

  axios.get('http://localhost:17000/books')
    .then(resp => {
      res.status(200).render("bookList", {lista: resp.data, title:"Página inicial", data: d})
    })
    .catch (error => {
      res.status(500).render("error", {error: error, data: d})
    })
});

router.get('/entidades/:idAutor', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var id = req.params.idAutor
  axios.get('http://localhost:17000/books/entidades/' + id)
    .then(resp => {
      res.status(200).render("authorPage", {dados: resp.data, title:"Página do autor", data: d})
    })
    .catch (error => {
      res.status(500).render("error", {error: error, data: d})
    })
});


router.get('/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var idBook = req.params.id
  axios.get('http://localhost:17000/books/' + idBook)
    .then(resp => {
      res.status(200).render("bookPage", {dados: resp.data, title:"Página do livro", data: d})
    })
    .catch (error => {
      res.status(500).render("error", {error: error, data: d})
    })
});

module.exports = router;
