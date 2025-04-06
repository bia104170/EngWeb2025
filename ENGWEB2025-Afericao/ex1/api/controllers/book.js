var Livro = require('../models/book')

module.exports.getAllBooks = () => {
    return Livro
        .find()
        .exec()
}


module.exports.getBookByID = id => {
    return Livro
        .findById(id)
        .exec()
}

module.exports.getBookByID = id => {
    return Livro
        .findById(id)
        .exec()
}

module.exports.getAllBooksFilterByCharacter = character => {
    return Livro
        .find({ characters: { $regex: `.*${character}.*`, $options: 'i' } })
        .exec();
};


module.exports.getAllBooksFilterByGenre = genre => {
    return Livro.find({ genres: { $regex: `.*${genre}.*`, $options: "i" } }).exec();
};

module.exports.getGenres = () => {
    return Livro.aggregate([
        { $unwind: "$genres" },  // cria um documento para cada elemento dos genres
        { $group: { _id: "$genres" } },  // agrupa de acordo com o genres
        { $sort: { _id: 1 } } 
    ]).then(data => data.map(item => item._id))
};

module.exports.getCharacters = () => {
    return Livro.aggregate([
        { $unwind: "$characters" }, 
        { $group: { _id: "$characters" } }, 
        { $sort: { _id: 1 } } 
    ]).then(data => data.map(item => item._id));
};

module.exports.insert = book => {
    var newLivro = new Livro(book)
    return newLivro.save()        
}

module.exports.update = (id, book) => {
    return Livro
        .findByIdAndUpdate(id, book, {new: true})
        .exec()     
}

module.exports.delete = id => {
    return Livro
        .findByIdAndDelete(id, {new: true})
        .exec()        
}
