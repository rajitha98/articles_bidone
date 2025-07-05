import styled from "styled-components";

export const ArticleCardStyle = styled.article`
  width: 42%;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  background-color: ${({ theme }) => theme.background};
  flex-direction: row;
  display: flex;
  justify-content: space-between;

  header h2 {
    font-size: 18px;
    margin-bottom: 12px;
    color: ${({ theme }) => theme.text};
  }

  section p {
    margin: 5px 0;
  }

  footer {
    margin-top: 10px;
  }
`;

export const ArticleAuthor = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

export const ArticleDate = styled.p`
  font-size: 12px;
  color: hsl(0, 0%, 55%);
  font-weight: 700;
  font-family: sans-serif;
`;

export const StatusBadge = styled.span`
  padding: 5px 10px;
  font-size: 12px;
  color: #fff;
  border-radius: 4px;
`;

export const FooterRow = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
