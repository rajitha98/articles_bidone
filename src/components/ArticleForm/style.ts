import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 10px;
  
  h2 {
    color: ${({ theme }) => theme.text};
  }

  input,
  select {
    padding: 5px;
    font-size: 16px;
  }
`;

export const ButtonRow = styled.div`
  text-align: right;
`;

export const ErrorText = styled.p`
  margin: 0;
  margin-bottom: 10px;
  font-size: 12px;
  color: red;
`;
