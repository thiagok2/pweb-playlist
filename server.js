import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config/database.js';


import usuarioRoutes from './routes/UsuariosRouters.js';
import filmeRoutes from './routes/FilmesRouters.js';
// import canalRoutes from './routes/CanaisRouters.js';
// import playlistRoutes from './routes/PlaylistsRouters.js';


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/version', (req, res) => {
    res.json({ status: 'ok', version: '1.0.0' });
  });

app.use('/usuarios', usuarioRoutes);
app.use('/filmes', filmeRoutes);
// app.use('/canais', canalRoutes);
// app.use('/playlists', playlistRoutes);

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database ok');
    app.listen(port, () => {
      console.log(`Server ok port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar:', error);
  });
