const express = require('express');
const cors = require('cors');

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

const PORT = parseInt(process.env.PORT, 10) || 3000;
const hereIsTheUpsideDown = (process.env.UPSIDEDOWN_MODE === 'true');

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});



RUN npm install pm2 -g
ENV PM2_PUBLIC_KEY rx7sumkmwmywrrd
ENV PM2_SECRET_KEY rx9eyr4v12uf3zb

CMD ["pm2-runtime", "app.js"]