import React from "react";
import "./style.css";

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
    <article className="article-card" aria-labelledby={`title-${id}`}>
      <header>
        <span
          className="status-badge"
          style={{ backgroundColor: statusColor[status] }}
        >
          {status}
        </span>
        <h2 id={`title-${id}`}>{title}</h2>
      </header>

      <section>
        <p className="article-author">{author}</p>
        <p className="article-date">{formatDate(createdAt)}</p>
      </section>

      <footer>
        <button onClick={()=>onClickEdit(id)}>Edit</button>
        <button onClick={()=>onClickDelete(id)}>delete</button>
      </footer>
    </article>
  );
};

export default ArticleCard;
