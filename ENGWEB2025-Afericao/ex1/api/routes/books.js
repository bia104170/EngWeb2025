var express = require('express');
var router = express.Router();
var Livro = require('../controllers/book');
var Autor = require('../controllers/author');


// GET /books
router.get('/', function(req, res) {
  if (req.query.character) {
    Livro.getAllBooksFilterByCharacter(req.query.character)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).json({ error: error.message }));
  } 
  else if (req.query.genre) { // Se for um género
    Livro.getAllBooksFilterByGenre(req.query.genre)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).json({ error: error.message }));
  }
  else {
    Livro.getAllBooks()
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).json({ error: error.message }));
  }
});

router.get('/genres', function(req, res) {
  Livro.getGenres()
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).json({ error: error.message }));
});

router.get('/characters', function(req, res) {
  Livro.getCharacters()
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).json({ error: error.message }));
});

router.get('/:id', function(req, res, next) {
  Livro.getBookByID(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(404).jsonp(error))
});

router.get('/entidades/:id', function(req, res, next) {
  Autor.getAuthorByID(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(404).jsonp(error))
});


router.post('/', function(req, res, next) {
  Livro.insert(req.body)
    .then(data => res.status(201).jsonp(data))
    .catch(error => res.status(404).jsonp(error))
});

router.put('/:id', function(req, res) {
  Livro.update(req.params.id, req.body)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp({ error: error.message }));
});

router.delete('/:id', function(req, res) {
  Livro.delete(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp({ error: error.message }));
});

module.exports = router;