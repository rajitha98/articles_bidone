import styled from "styled-components";

export const Container = styled.main`
  background-color: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 60%;
  h1 {
    color: ${({ theme }) => theme.text};
  }
`;

export const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const AddArticle = styled.section`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  font-size: 18px;
  align-items: center;
  justify-content: start;
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

export const Alert = styled.section<{ isError: boolean }>`
  background-color: ${({ isError }) => (isError ? "#fadcd9" : "#d4edda")};
  color: ${({ isError }) => (isError ? "#E14434" : "#155724")};
  padding: 12px 16px;
  border-radius: 6px;
  margin-top: 20px;
  width: 400px;
  h5 {
    margin: 0 0 4px 0;
    font-size: 16px;
  }
  p {
    margin: 0;
    font-size: 14px;
  }
`;
