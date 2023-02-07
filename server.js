const app = require('express')();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const pick = require('lodash/pick');

app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000'] }));

app.get('/pagesData', async (req, res) => {
  // delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const { q } = req.query;
  const stringData = await fs.promises.readFile(path.join(__dirname, 'db.json'), 'utf-8');
  const jsonData = JSON.parse(stringData);

  if (!q) {
    return res.json(jsonData);
  }

  const cleanQ = q.toLowerCase().trim();
  const pageIdsToPick = [];

  const updateIdsToPick = page => {
    pageIdsToPick.push(page.id);
    const parentPage = jsonData.entities.pages[page.parentId];

    if (parentPage) {
      updateIdsToPick(parentPage);
    }
  };

  Object.values(jsonData.entities.pages).forEach(page => {
    if (page.title.toLowerCase().includes(cleanQ)) {
      updateIdsToPick(page)
    }
  });

  return res.json({ ...jsonData, entities: { pages: pick(jsonData.entities.pages, pageIdsToPick) } });
});

app.listen(5000, () => console.log('Server is running'));