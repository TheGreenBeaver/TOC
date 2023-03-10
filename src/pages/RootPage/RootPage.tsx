import type { FC } from 'react';
import { TableOfContents } from '../../uiKit';
import { ThemeSettings } from '../../components';
import { usePromise } from 'any-fish';
import { getTocItemsConfig } from '../../api';
import { Link, Outlet, useLocation } from 'react-router-dom';
import type { TocLinkProps, TocItemConfig } from '../../uiKit';
import { useState } from 'react';
import { FlexLayout } from './styles';

const RouterLink: FC<TocLinkProps> = ({ url, ...rest }) => (
  <Link to={url} {...rest} />
);

export const RootPage: FC = () => {
  const [searchString, setSearchString] = useState('');
  const [items,, isLoading] = usePromise(getTocItemsConfig, [searchString]);
  const { pathname } = useLocation();

  const getIsActive = (item: TocItemConfig) => item.url === pathname.substring(1);

  return (
    <FlexLayout>
      <ThemeSettings />
      <TableOfContents
        items={items}
        isLoading={isLoading}
        Link={RouterLink}
        getIsActive={getIsActive}
        onSearch={setSearchString}
        showSearch
        searchValue={searchString}
      />
      <Outlet />
    </FlexLayout>
  );
};