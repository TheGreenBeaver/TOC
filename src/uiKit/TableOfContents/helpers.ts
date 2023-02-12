import type { GetIsActive, TocItemConfig } from './types';

const digForMatchingChildren = (item: TocItemConfig, q: string, matchingItems: TocItemConfig[]): boolean => {
  const matchesQ = String(item.label).toLowerCase().includes(q.toLowerCase().trim());
  const filteredItem = { ...item, children: [] };

  if (
    item.children?.some(childItem => digForMatchingChildren(childItem, q, filteredItem.children)) ||
    matchesQ
  ) {
    matchingItems.push(filteredItem);

    return true;
  }

  return false;
};

export const getFilteredItems = (items: TocItemConfig[], q: string): TocItemConfig[] => {
  const matchingItems: TocItemConfig[] = [];
  items.forEach(item => digForMatchingChildren(item, q, matchingItems));

  return matchingItems;
};

const digForActivePath = (
  item: TocItemConfig,
  index: number,
  getIsActive: GetIsActive,
  activePath: number[],
): boolean => {
  if (
    item.children?.some((childItem, childIndex) => digForActivePath(childItem, childIndex, getIsActive, activePath)) ||
    getIsActive(item)
  ) {
    activePath.unshift(index);

    return true;
  }

  return false;
};

export const getActivePaths = (
  items: TocItemConfig[],
  getIsActive: GetIsActive,
): string[] => items.map((item, index) => {
  const activePath: number[] = [];
  digForActivePath(item, index, getIsActive, activePath);

  return activePath.join('.');
});