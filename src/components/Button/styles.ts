import styled from "styled-components";

interface ButtonProps {
  btnColor?: string;
}

export const ButtonStyled = styled.button<ButtonProps>`
  color: ${({ btnColor, theme }) => btnColor || theme.primary};
  border: 1px solid ${({ btnColor, theme }) => btnColor || theme.primary};
  background-color: ${({ theme }) => theme.background};
  margin: 0 2px;
  padding: 5px 20px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 5px;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.05);
    color: ${({ btnColor, theme }) => btnColor || theme.primary};
    border: 1px solid ${({ btnColor, theme }) => btnColor || theme.primary};
  }
`;
