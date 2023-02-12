import type { ComponentType, PropsWithChildren, ReactNode } from 'react';

export type StyledExpandIconProps = Partial<{
  asPlaceholder: boolean,
  isExpanded: boolean,
}>;

export type TocItemProps = {
  indent?: number,
  isActive?: boolean,
  isLink?: boolean,
  level: number,
  hasActiveChildren?: boolean,
  activeNeighbourLevel?: number,
};

export type TocItemConfig = {
  label: ReactNode,
  children?: TocItemConfig[],
  url?: string,
};

export type TocLinkProps = PropsWithChildren<{ url: string, className?: string }>;

export type TocLinkComponent = ComponentType<TocLinkProps>;

export type GetIsActive = (item: TocItemConfig) => boolean;

export type TocProps = {
  items?: TocItemConfig[],
  className?: string,
  maxIndent?: number,
  Link?: TocLinkComponent,
  getIsActive?: GetIsActive,
  isLoading?: boolean,
  emptyText?: string,
  showSearch?: boolean,
  onSearch?: (searchString: string) => void,
  searchValue?: string,
  searchDelay?: number,
  searchPlaceholder?: string,
};

export type ChildrenContainerProps = PropsWithChildren<{
  isOpen: boolean,
}>;

export type TreeItemProps = {
  item: TocItemConfig,
  Link: TocLinkComponent,
  isActive?: boolean,
  activeChildPath?: string,
  maxIndent?: number,
  level?: number,
  activeNeighbourLevel?: number,
  onActiveChange?: (item: TocItemConfig, isActive: boolean) => void,
};