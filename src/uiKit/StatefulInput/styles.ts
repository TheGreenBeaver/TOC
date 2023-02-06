import styled from 'styled-components';
import { ThemeHelpers } from '../../theme';

export const InputContainer = styled.div`
  width: 100%;
  padding: ${ThemeHelpers.size(1, 2.75)};
`;

export const Input = styled.input`
  width: 100%;
  padding: ${ThemeHelpers.size(0.5, 1)};
  background-color: ${ThemeHelpers.color('bgActive1')};
  border: ${ThemeHelpers.border} solid;
  border-radius: ${({ theme }) => theme.border.radius}px;
  outline: none;
  ${ThemeHelpers.transition('border-color', 'box-shadow')}

  :focus {
    border-color: ${ThemeHelpers.color('primaryActive1')};
    box-shadow: 0 0 5px ${ThemeHelpers.color('primaryActive1')}C0;
  }
`;