import styled from 'styled-components';
import { ThemeHelpers } from '../../theme';

export const FlexLayout = styled.div`
  display: flex;
  column-gap: ${ThemeHelpers.size(2.75)};
  height: 100%;
  background-color: ${ThemeHelpers.color('bgMain')};
`;