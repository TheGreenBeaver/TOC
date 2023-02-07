import styled, { css, keyframes } from 'styled-components';
import type { Color} from '../../theme';
import { ThemeHelpers } from '../../theme';
import { ReactComponent as ExpandIcon } from './expandIcon.svg';
import type { StyledExpandIconProps, TocItemProps } from './types';
import { animated } from '@react-spring/web';

export const TocList = styled.ul`
  list-style: none;
  background: ${ThemeHelpers.color('bgMain')};
  width: ${ThemeHelpers.size(34)};
  height: 100%;
  overflow-y: auto;
  border-right: ${ThemeHelpers.border} solid;
  padding: ${ThemeHelpers.size(2.75, 0)};
`;

export const StyledExpandIcon = styled(ExpandIcon).withConfig<StyledExpandIconProps>({
  shouldForwardProp: prop => prop !== 'asPlaceholder',
})`
  ${ThemeHelpers.transition('transform')}
  transform: rotate(-90deg);
  ${props => props.asPlaceholder && 'visibility: hidden;'}
`;

const bgColorByLevel = ['bgMain', 'bgActive1', 'bgActive2'] as const;
const getBgColor = ({ level, hasActiveChildren, activeSiblingLevel }: TocItemProps): Color => {
  if (hasActiveChildren) {
    return bgColorByLevel[level + 1] || 'bgActive2';
  }

  if (activeSiblingLevel != null) {
    return bgColorByLevel[activeSiblingLevel + 1] || 'bgActive2';
  }

  return 'bgMain';
};

const expandedItemStyles = css`
  ${StyledExpandIcon} {
    transform: rotate(0);
  }
`;

const activeItemStyles = css`
  background-color: ${ThemeHelpers.color('primaryMain')};
  color: ${ThemeHelpers.color('textActive1')};

  :hover {
    background-color: ${ThemeHelpers.color('primaryActive1')};
  }
  
  svg path {
    fill: ${ThemeHelpers.color('textActive1')};
  }
`;

const inactiveItemStyles = css`
  :hover {
    background-color: ${ThemeHelpers.color('bgActive3')};
  }
`;

const paddingStyles = css`
  padding-right: ${ThemeHelpers.size(2.75)};
  padding-top: ${ThemeHelpers.size()};
  padding-bottom: ${ThemeHelpers.size()};
`;

export const TocItem = styled.li<TocItemProps>`
  ${props => !props.isLink && paddingStyles}
  padding-left: ${props => ThemeHelpers.size((props.indent ?? 0) * 2 + 2.75)};
  font-size: 0.9rem;
  line-height: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  column-gap: ${ThemeHelpers.size()};
  background-color: ${props => ThemeHelpers.color(getBgColor(props))};
  
  :focus-${props => props.isLink ? 'within' : 'visible'} {
    outline: ${({ theme }) => theme.border.width}px solid ${ThemeHelpers.color('primaryMain')};
    outline-offset: -${({ theme }) => theme.border.width}px;
  }

  ${props => props.isExpanded && expandedItemStyles}
  ${props => props.isActive ? activeItemStyles : inactiveItemStyles}
`;

export const TocItemLink = styled.a`
  flex: 1;
  text-decoration: none;
  color: inherit;
  ${paddingStyles}

  :focus {
    outline: none;
  }
`;

export const NoItemsPlaceholder = styled.span`
  color: ${ThemeHelpers.color('textMain')};
  display: block;
  text-align: center;
  width: 100%;
`;

const rotationKeyframes = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingIndicator = styled.div`
  width: ${ThemeHelpers.size(9)};
  height: ${ThemeHelpers.size(9)};
  border-radius: 50%;
  border: 6px ${ThemeHelpers.color('primaryMain')} solid;
  border-right-color: transparent;
  animation: ${rotationKeyframes} 1s infinite;
  margin: auto;
`;

export const Delimiter = styled.hr`
  margin: ${ThemeHelpers.size(1, 0)};
  border: none;
  border-top: ${ThemeHelpers.border} solid;
`;

export const ChildrenWrapper = styled(animated.div)`
  will-change: transform, opacity, height;
  overflow: hidden;
`;