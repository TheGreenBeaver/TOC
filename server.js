const app = require('express')();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const cloneDeep = require('lodash/cloneDeep');

app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000'] }));

const digForMatchingPages = (page, q, getPageById, onPageMatches) => {
  if (!page) {
    return false;
  }

  const matchesQ = page.title.toLowerCase().includes(q.toLowerCase().trim());

  if (
    page.pages?.some(childPageId => digForMatchingPages(getPageById(childPageId), q, getPageById, onPageMatches)) ||
    matchesQ
  ) {
    onPageMatches(page);

    return true;
  }

  return false;
};

app.get('/pagesData', async (req, res) => {
  // delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const { q } = req.query;
  const stringData = await fs.promises.readFile(path.join(__dirname, 'db.json'), 'utf-8');
  const jsonData = JSON.parse(stringData);
  const result = cloneDeep(jsonData);
  result.entities.pages = {};

  jsonData.topLevelIds.forEach(topLevelId => digForMatchingPages(
    jsonData.entities.pages[topLevelId],
    q,
    id => jsonData.entities.pages[id],
    page => {
      result.entities.pages[page.id] = page;
    },
  ));

  return res.json(result);
});

app.listen(5000, () => console.log('Server is running'));