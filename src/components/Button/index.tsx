import { ButtonHTMLAttributes } from "react";
import { ButtonStyled } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  color?: string;
  textColor?: string;
}

const Button = ({ color, label, ...props }: ButtonProps) => (
  <ButtonStyled {...props} color={color}>
    {label}
  </ButtonStyled>
);

export default Button;
