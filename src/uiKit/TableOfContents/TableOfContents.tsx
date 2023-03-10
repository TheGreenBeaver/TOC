import { forwardRef, useMemo, useState, memo, useEffect, useCallback } from 'react';
import {
  TocItem,
  TocList,
  StyledExpandIcon,
  TocItemLink,
  LoadingIndicator,
  NoItemsPlaceholder,
  Delimiter,
  ChildrenWrapper,
} from './styles';
import type {
  TocProps,
  ChildrenContainerProps,
  TreeItemProps,
  TocItemConfig,
} from './types';
import { getActivePaths, getFilteredItems } from './helpers';
import { StatefulInput } from '../StatefulInput';
import { useDimensions } from 'any-fish';
import { usePrevious } from '../../hooks';
import { useSpring, a } from '@react-spring/web';
import { defaultGetIsActive, DefaultLink } from './defaultValues';

const ChildrenContainer = memo<ChildrenContainerProps>(({
  isOpen,
  children,
}) => {
  const [dimensions, ref] = useDimensions();
  const getPrevious = usePrevious(isOpen);
  const { height, y, opacity } = useSpring({
    from: { height: 0, opacity: 0, y: 0 },
    to: {
      height: isOpen && dimensions ? dimensions.height : 0,
      opacity: isOpen ? 1 : 0,
      y: isOpen ? 0 : 20,
    },
  });

  return (
    <ChildrenWrapper
      style={{
        opacity,
        height: isOpen && getPrevious() === isOpen ? 'auto' : height,
      }}
    >
      <a.div ref={ref} style={{ y }}>
        {children}
      </a.div>
    </ChildrenWrapper>
  );
});

const TreeItem = memo<TreeItemProps>(({
  item,
  Link,
  isActive,
  activeChildPath,
  maxIndent,
  level = 0,
  activeNeighbourLevel,
  onActiveChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeChildren, setActiveChildren] = useState<TocItemConfig[]>([]);
  const { children, label, url } = item;
  const hasChildren = !!children?.length;

  useEffect(() => {
    onActiveChange?.(item, !!isActive);
  }, [item, isActive, onActiveChange]);

  const handleInteraction = () => {
    if (hasChildren) {
      setIsExpanded(curr => !curr);
    }
  };

  const onChildActiveChange = useCallback((childItem: TocItemConfig, isChildActive: boolean) => {
    onActiveChange?.(childItem, isChildActive);
    setIsExpanded(curr => curr || isChildActive);
    setActiveChildren(curr => isChildActive
      ? [...curr, childItem]
      : curr.filter(someItem => someItem !== childItem),
    );
  }, [onActiveChange]);

  const splitPath = activeChildPath?.split('.');

  return (
    <>
      <TocItem
        indent={maxIndent == null ? level : Math.min(maxIndent, level)}
        onClick={handleInteraction}
        onKeyUp={e => {
          if (e.key === 'Enter') {
            handleInteraction();
          }
        }}
        tabIndex={url ? undefined : 0}
        isActive={isActive}
        isLink={!!url}
        level={level}
        hasActiveChildren={!!activeChildren.length}
        activeNeighbourLevel={activeNeighbourLevel}
      >
        <StyledExpandIcon asPlaceholder={!hasChildren} isExpanded={isExpanded} />
        {url ? <TocItemLink as={Link} url={url}>{label}</TocItemLink> : label}
      </TocItem>
      {hasChildren && (
        <ChildrenContainer isOpen={isExpanded}>
          {children.map((childItem, index) => (
            <TreeItem
              key={index}
              item={childItem}
              Link={Link}
              isActive={activeChildPath === String(index)}
              activeChildPath={splitPath?.[0] === String(index) ? splitPath?.slice(1).join('.') : undefined}
              maxIndent={maxIndent}
              level={level + 1}
              activeNeighbourLevel={activeChildren.length || isActive ? level : activeNeighbourLevel}
              onActiveChange={onChildActiveChange}
            />
          ))}
        </ChildrenContainer>
      )}
    </>
  );
});

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
  Link = DefaultLink,
  getIsActive = defaultGetIsActive,
  maxIndent,
}, ref) => {
  const [internalSearchValue, setInternalSearchValue] = useState(providedSearchValue ?? '');
  const searchValue = providedSearchValue ?? internalSearchValue;

  const items = useMemo(
    () => providedOnSearch ? providedItems : getFilteredItems(providedItems ?? [], searchValue),
    [providedItems, providedOnSearch, searchValue],
  );
  const activePaths = useMemo(() => getActivePaths(items || [], getIsActive), [getIsActive, items]);

  const onSearch = providedOnSearch ?? setInternalSearchValue;

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

    return items.map((item, index) => {
      const activePath = activePaths[index];

      return (
        <TreeItem
          key={index}
          item={item}
          Link={Link}
          isActive={activePath === String(index)}
          activeChildPath={activePath?.split('.').slice(1).join('.')}
          maxIndent={maxIndent}
        />
      );
    });
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