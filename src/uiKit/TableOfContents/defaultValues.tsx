import type { GetIsActive, TocLinkProps } from './types';
import type { FC } from 'react';

export const defaultGetIsActive: GetIsActive = item => window.location.pathname.substring(1) === item.url;

export const DefaultLink: FC<TocLinkProps> = ({ url, ...rest }) => <a href={url} rel='noopener noreferrer' {...rest} />;