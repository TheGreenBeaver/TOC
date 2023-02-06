import type { Page, PagesData } from './types';
import type { TocItemConfig } from '../uiKit';

const getTocItemConfigFromPage = (page: Page, pagesData: PagesData): TocItemConfig => {
  const item: TocItemConfig = {
    label: page.title,
    url: page.url,
    key: page.id,
  };

  if (page.pages) {
    const children: TocItemConfig[] = [];

    page.pages.forEach(childPageId => {
      const childPage = pagesData.entities.pages[childPageId];

      if (childPage) {
        children.push(getTocItemConfigFromPage(childPage, pagesData));
      }
    });

    item.children = children;
  }

  return item;
};

export const getTocItemsConfig = async (): Promise<TocItemConfig[]> => {
  const response = await fetch('http://localhost:5000/db');
  const pagesData: PagesData = await response.json();

  const tocItems: TocItemConfig[] = [];

  pagesData.topLevelIds.forEach(id => {
    const page = pagesData.entities.pages[id];

    if (page) {
      tocItems.push(getTocItemConfigFromPage(page, pagesData));
    }
  });

  return tocItems;
};