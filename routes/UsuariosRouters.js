import express from 'express';
import { Usuario } from '../models/Index.js';
const router = express.Router();

//Rotas vão aqui!

router.get('/', async (_req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
});

router.post('/', async (_req, res) => {
    const usuario = await Usuario.create(_req.body);
    res.json(usuario);
});

export default router;
