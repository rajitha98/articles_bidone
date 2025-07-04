import React from "react";
import Button from "../Button";
import "./style.css";
import { ArticleAuthor, ArticleCardStyle, ArticleDate, StatusBadge } from "./styles";

interface ArticleCardProps {
  id: string;
  title: string;
  status: "Published" | "Draft" | "Archived";
  author: string;
  createdAt: string;
  onClickEdit: (id: string) => void;
  onClickDelete: (id: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  title,
  status,
  author,
  createdAt,
  onClickEdit,
  onClickDelete,
}) => {
  const formatDate = (date: string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    return `${year}-${month}-${day}`;
  };

  const statusColor = {
    Published: "#28a745",
    Draft: "#ffc107",
    Archived: "#6c757d",
  };

  return (
    <ArticleCardStyle>
      <header>
        <StatusBadge style={{ backgroundColor: statusColor[status] }}>
          {status}
        </StatusBadge>
        <h2 id={`title-${id}`}>{title}</h2>
      </header>

      <section>
        <ArticleAuthor>{author}</ArticleAuthor>
        <ArticleDate className="article-date">{formatDate(createdAt)}</ArticleDate>
      </section>

      <footer>
        <Button label="Edit" color="#888" onClick={() => onClickEdit(id)} />
        <Button label="Delete" color="red" onClick={() => onClickDelete(id)} />
      </footer>
    </ArticleCardStyle>
  );
};

export default ArticleCard;
