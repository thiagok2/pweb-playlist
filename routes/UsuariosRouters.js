import express from 'express';
import { Usuario } from '../models/Index.js';
const router = express.Router();

router.get('/', async (_req, res) => {
    const usuarios = await Usuario.findAll();
    console.log('cafe');
    res.json(usuarios);
});

router.post('/', async (_req, res) => {
    const usuario = await Usuario.create(_req.body);
    console.log('chocolate cremoso');
    res.json(usuario);
});



  export default router;