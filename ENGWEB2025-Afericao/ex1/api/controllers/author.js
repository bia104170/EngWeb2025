var Autor = require('../models/author')

module.exports.getAuthorByID = id => {
    return Autor
        .findById(id)
        .exec()
}
