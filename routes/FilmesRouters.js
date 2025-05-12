import express from 'express';
import { Filme } from '../models/Index.js';
const router = express.Router();


//Rotas vão aqui!

router.get('/', async (_req, res) => {
    const filmes = await Filme.findAll();
    res.json(filmes);
});

router.post('/', async (_req, res) => {
    const filmes = await Filme.create();
    res.json(filmes);
});

export default router;