import type { TocItemConfig, GetIsActive } from './types';

export const getItemsToCollapse = (item: TocItemConfig): TocItemConfig[] => [
  item,
  ...(item.children?.map(getItemsToCollapse).flat() || []),
];

const digForActiveChildren = (
  item: TocItemConfig,
  getIsActive: GetIsActive,
  expandedItems: TocItemConfig[],
): boolean => {
  const { children } = item;

  if (getIsActive(item)) {
    return true;
  }

  if (children?.some(childItem => digForActiveChildren(childItem, getIsActive, expandedItems))) {
    expandedItems.push(item);

    return true;
  }

  return false;
};

export const getItemsToExpand = (items: TocItemConfig[], getIsActive: GetIsActive): TocItemConfig[] => {
  const expandedKeys: TocItemConfig[] = [];
  items.forEach(item => digForActiveChildren(item, getIsActive, expandedKeys));

  return expandedKeys;
};

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