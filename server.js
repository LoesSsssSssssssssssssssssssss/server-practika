const express = require('express');
const bodyParser = require('body-parser');
const { translate } = require('bing-translate-api');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/translate', async (req, res) => {
  const { text, from, to } = req.body;
  try {
    const response = await translate(text, from, to);
    res.json({ translation: response.translation });
  } catch (error) {
    console.error('Error translating text:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
