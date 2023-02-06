import styled from 'styled-components';
import { ThemeHelpers } from '../../theme';

export const FixedContainer = styled.div`
  position: fixed;
  top: ${ThemeHelpers.size(3)};
  right: ${ThemeHelpers.size(3)};
  border-radius: ${({ theme }) => theme.border.radius};
  border: ${ThemeHelpers.border} solid;
  padding: ${ThemeHelpers.size(1, 2)};
  display: flex;
  flex-direction: column;
  row-gap: ${ThemeHelpers.size(0.5)};
`;

export const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${ThemeHelpers.size(0.5)};
`;