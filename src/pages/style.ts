import styled from "styled-components";

export const Container = styled.main`
  background-color: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    color: ${({ theme }) => theme.text};
  }
`;

export const ErrorAlert = styled.section`
  background-color: rgba(255, 23, 23, 0.2);
  padding: 10px;
  width: 50%;
  text-align: center;
  color: red;
  border: 1px solid red;
  border-radius: 5px;
  font-size: 18px;
`;

export const AddArticle = styled.section`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  font-size: 18px;
  align-items: center;
  justify-content: start;
  width: 60%;
  font-family: sans-serif;

  img {
    width: 24px;
    cursor: pointer;
    color: ${({ theme }) => theme.text};
  }

  label {
    cursor: pointer;
    color: ${({ theme }) => theme.text};
  }
`;

export const SearchBox = styled.section`
  display: flex;
  gap: 10px;
  margin: 30px;
`;
