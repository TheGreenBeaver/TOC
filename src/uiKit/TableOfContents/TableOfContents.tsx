import type { FC, Key, ReactNode } from 'react';
import { forwardRef, useCallback, useMemo, useState } from 'react';
import {
  TocItem,
  TocList,
  StyledExpandIcon,
  TocItemLink,
  LoadingIndicator,
  NoItemsPlaceholder,
  Delimiter,
} from './styles';
import type { GetIsActive, TocItemConfig, TocLinkComponent, OnExpandedChange, TocProps, TocInnerProps } from './types';
import { getItemsToExpand, getItemsToCollapse, getFilteredItems } from './helpers';
import map from 'lodash/map';
import { StatefulInput } from '../StatefulInput';

const defaultGetIsActive: GetIsActive = item => window.location.pathname.substring(1) === item.url;

const renderItem = (
  item: TocItemConfig,
  expandedKeys: Key[],
  onExpandedChange: OnExpandedChange,
  Link: TocLinkComponent,
  getIsActive: GetIsActive,
  maxIndent?: number,
  level: number = 0,
  activeSiblingLevel?: number,
): ReactNode => {
  const { children, label, key, url } = item;
  const hasChildren = !!children?.length;
  const isExpanded = expandedKeys.includes(key);
  const itemsToExpand = getItemsToExpand([item], getIsActive);
  const hasActiveChildren = !!itemsToExpand.length || children?.some(getIsActive);

  const handleInteraction = () => {
    if (hasChildren) {
      const changedItems: TocItemConfig[] = [];

      if (isExpanded) {
        changedItems.push(...getItemsToCollapse(item));
      } else {
        changedItems.push(...itemsToExpand);

        if (!changedItems.length) {
          changedItems.push(item);
        }
      }

      onExpandedChange(changedItems, !isExpanded);
    }
  };

  const result: ReactNode[] = [
    <TocItem
      key={key}
      indent={maxIndent == null ? level : Math.min(maxIndent, level)}
      onClick={handleInteraction}
      onKeyUp={e => {
        if (e.key === 'Enter') {
          handleInteraction();
        }
      }}
      tabIndex={url ? undefined : 0}
      isExpanded={isExpanded}
      isActive={getIsActive(item)}
      isLink={!!url}
      level={level}
      hasActiveChildren={hasActiveChildren}
      activeSiblingLevel={activeSiblingLevel}
    >
      <StyledExpandIcon asPlaceholder={!hasChildren} />
      {url ? <TocItemLink as={Link} url={url}>{label}</TocItemLink> : label}
    </TocItem>,
  ];

  if (hasChildren && isExpanded) {
    result.push(...children.map(childItem => renderItem(
      childItem,
      expandedKeys,
      onExpandedChange,
      Link,
      getIsActive,
      maxIndent,
      level + 1,
      hasActiveChildren || getIsActive(item) ? level : activeSiblingLevel,
    )));
  }

  return result;
};

const DefaultLink: TocLinkComponent = ({ url, ...rest }) => <a href={url} rel='noopener noreferrer' {...rest} />;

const TableOfContentsInner: FC<TocInnerProps> = ({
  items,
  expandedKeys: providedExpandedKeys,
  Link = DefaultLink,
  getIsActive = defaultGetIsActive,
  onExpandedChange: providedOnExpandedChange,
  maxIndent,
  defaultExpanded,
}) => {
  const [innerExpandedKeys, setInnerExpandedKeys] = useState<Key[]>(
    () => defaultExpanded ?? providedExpandedKeys ?? map(getItemsToExpand(items, getIsActive), 'key'),
  );
  const expandedKeys = providedExpandedKeys ?? innerExpandedKeys;

  const onExpandedChange = useCallback<OnExpandedChange>((
    changedItems,
    isExpanded,
  ) => providedOnExpandedChange
    ? providedOnExpandedChange(changedItems, isExpanded)
    : setInnerExpandedKeys(curr => {
      const changedKeys = map(changedItems, 'key');

      return isExpanded ? [...curr, ...changedKeys] : curr.filter(key => !changedKeys.includes(key));
    }), [
    providedOnExpandedChange,
  ]);

  return (
    <>
      {items.map(item => renderItem(item, expandedKeys, onExpandedChange, Link, getIsActive, maxIndent))}
    </>
  );
};

export const TableOfContents = forwardRef<HTMLUListElement, TocProps>(({
  items: providedItems,
  className,
  isLoading,
  emptyText,
  showSearch,
  onSearch: providedOnSearch,
  searchValue: providedSearchValue,
  searchDelay,
  searchPlaceholder = 'Filter items',
  ...rest
}, ref) => {
  const [innerSearchValue, setInnerSearchValue] = useState(() => providedSearchValue ?? '');
  const searchValue = providedSearchValue ?? innerSearchValue;

  const items = useMemo(
    () => providedOnSearch ? providedItems : getFilteredItems(providedItems ?? [], searchValue),
    [providedItems, providedOnSearch, searchValue],
  );

  const onSearch = providedOnSearch ?? setInnerSearchValue;

  const getContent = () => {
    if (isLoading) {
      return <LoadingIndicator />;
    }

    if (!items?.length) {
      return (
        <NoItemsPlaceholder>
          {emptyText ?? (searchValue ? `No items matching "${searchValue}" found` : 'No information found')}
        </NoItemsPlaceholder>
      );
    }

    return <TableOfContentsInner {...rest} items={items} />;
  };

  return (
    <TocList className={className} ref={ref}>
      {showSearch && (
        <>
          <StatefulInput
            onChange={onSearch}
            value={searchValue}
            delay={searchDelay}
            placeholder={searchPlaceholder}
          />
          <Delimiter />
        </>
      )}
      {getContent()}
    </TocList>
  );
});