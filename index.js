const express = require('express');
const cors = require('cors');
require('dotenv').config();

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const PORT = Number(process.env.PORT);
const NOT_FOUND = 404;
const OK = 200;

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

const { UPSIDEDOWN_MODE } = process.env;

app.get('/', (req, res) => {
  try {
    const characters = strangerThingsService.search(
      req.query,
      Boolean(UPSIDEDOWN_MODE === 'true'),
    );
  
    res.status(OK).json(characters);
  } catch (error) {
    res.status(NOT_FOUND).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
