const router = require('express').Router();
const Book = require('../models/Book');

// Cadastro de Livros
router.post('/', async (req, res) => {
    const { title, description, pageCount } = req.body;

    if (!title) {
        res.status(422).json({ error: 'O título é obrigatório!' });
    }

    if (!description) {
        res.status(422).json({ error: 'A descrição é obrigatória!' });
    }

    if (!pageCount) {
        res.status(422).json({ error: 'O número de páginas é obrigatório!' });
    }

    const book = { title, description, pageCount };

    try {
        await Book.create(book);
        res.status(201).json({ message: 'Livro cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Visualização de Livros
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        if (!books) {
            res.status(422).json({ message: 'Não há livros cadastrados no sistema!' });
        }

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Visualização de Livro Específico
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        const book = await Book.findOne({ _id: id });
        if (!book) {
            res.status(422).json({ message: 'Livro não encontrado!' });
        }
        
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Edição de Livros
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const { title, description, pageCount } = req.body;
    const book = { title, description, pageCount };

    try {
        const updatedBook = await Book.updateOne({ _id: id }, book);
        if (updatedBook.matchedCount === 0) {
            res.status(422).json({ message: 'Erro ao atualizar livro!' });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Exclusão de Livros
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const book = await Book.findOne({ _id: id });
    if (!book) {
        res.status(422).json({ message: 'Livro não encontrado!' });
    }

    try {
        await Book.deleteOne({ _id: id });
        res.status(200).json({ message: 'Livro deletado com sucesso!' });
    } catch (error) {
        res.status(422).json({ message: 'Erro ao deletar livro!' });
    }
});

module.exports = router;