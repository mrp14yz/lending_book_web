const Book = require('../../models/book')
const Category = require('../../models/category')
const Author = require('../../models/author')
const User = require('../../models/user')

const renderPageBookBySlug = async (req, res) => {
    const book = await Book.findOne({
        where: {
            slug: req.params.slug
        },
        attributes: ['slug', 'title', 'cover', 'description'],
        include: [
            { model: Author, attributes: ['slug', 'name'] },
            { model: Category, attributes: ['slug', 'name'] }
        ]
    })

    res.render('pages/book', {
        book: book,
    })
}

const borrowBookById = async (req, res) => {
    const user = await User.findByPk(req.user.id)
    //user.
}

module.exports = {
    renderPageBookBySlug
}