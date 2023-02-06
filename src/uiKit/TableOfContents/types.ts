import type { ComponentType, Key, PropsWithChildren, ReactNode } from 'react';

export type StyledExpandIconProps = { asPlaceholder?: boolean };

export type TocItemProps = {
  indent?: number,
  isActive?: boolean,
  isExpanded?: boolean,
  isLink?: boolean,
  level: number,
  hasActiveChildren?: boolean,
  activeSiblingLevel?: number,
};

export type TocItemConfig = {
  label: ReactNode,
  key: Key,
  children?: TocItemConfig[],
  url?: string,
};

export type TocLinkProps = PropsWithChildren<{ url: string, className?: string }>;

export type TocLinkComponent = ComponentType<TocLinkProps>;

export type GetIsActive = (item: TocItemConfig) => boolean;

export type OnExpandedChange = (changedItems: TocItemConfig[], isExpanded: boolean) => void;

export type TocProps = {
  items?: TocItemConfig[],
  className?: string,
  maxIndent?: number,
  Link?: TocLinkComponent,
  getIsActive?: GetIsActive,
  expandedKeys?: Key[],
  onExpandedChange?: OnExpandedChange,
  isLoading?: boolean,
};