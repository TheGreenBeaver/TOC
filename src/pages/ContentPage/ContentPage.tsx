import type { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { LocationInfo } from './styles';

export const ContentPage: FC = () => {
  const { pathname } = useLocation();

  return <LocationInfo>Currently at {pathname}</LocationInfo>;
};