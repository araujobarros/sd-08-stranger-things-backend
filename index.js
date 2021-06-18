const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); // importa o modulo para leitura de variaveis de ambiente

dotenv.config(); // faz a leitura das variaveis de ambiente

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

const hereIsTheUpsideDown = process.env.UPSIDEDOWN_MODE === 'false' || 'false';

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});

const PORT = process.env.PORT || 3000; // define o valor ou como a configurada na variavel de ambiente ou se for undefined coloca como 3000

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});

/*
ecosystem faz as configuracoes iniciais para rodar o pm2
definindo o nome ,arquivo para iniciar , cluster,instancias,variaveis de ambiente e mais

Procfile define o comando que deve ser executado para iniciar um projeto ex:node index.js
*/