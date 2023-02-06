const app = require('express')();
const fs = require('fs');
const path = require('path');
const cors = require('cors');

app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000'] }));

const digForMatchingPages = (page, q, pagesData) => {
  if (!page) {
    return false;
  }

  const matchesQ = page.title.toLowerCase().includes(q.toLowerCase());

  if (matchesQ) {
    return true;
  }

  if (!page.pages?.some(childPageId => digForMatchingPages(pagesData.entities.pages[childPageId], q, pagesData))) {
    delete pagesData.entities.pages[page.id];
  }

  return false;
};

app.get('/pagesData', async (req, res) => {
  // delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const { q } = req.query;
  const stringData = await fs.promises.readFile(path.join(__dirname, 'db.json'), 'utf-8');
  const jsonData = JSON.parse(stringData);

  jsonData.topLevelIds.forEach(id => digForMatchingPages(jsonData.entities.pages[id], q, jsonData));

  return res.json(jsonData);
});

app.listen(5000, () => console.log('Server is running'));