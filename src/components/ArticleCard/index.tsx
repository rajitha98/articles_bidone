import React from "react";
import Button from "../Button";
import {
  ArticleAuthor,
  ArticleCardStyle,
  ArticleDate,
  FooterRow,
  StatusBadge,
} from "./styles";
import { RoleTypes } from "../../data/roleSlice";

interface ArticleCardProps {
  id: string;
  title: string;
  status: "Published" | "Draft" | "Archived";
  author: string;
  createdAt: string;
  onClickEdit: (id: string) => void;
  onClickDelete: (id: string) => void;
  userRole: RoleTypes;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  title,
  status,
  author,
  createdAt,
  onClickEdit,
  onClickDelete,
  userRole,
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
      <section>
        <header>
          <StatusBadge style={{ backgroundColor: statusColor[status] }}>
            {status}
          </StatusBadge>
          <h2>{title}</h2>
        </header>

        <section>
          <ArticleAuthor>{author}</ArticleAuthor>
          <ArticleDate>{formatDate(createdAt)}</ArticleDate>
        </section>
      </section>

      {userRole === "editor" && (
        <FooterRow>
          <Button label="Edit" color="#888" onClick={() => onClickEdit(id)} />
          <Button
            label="Delete"
            color="red"
            onClick={() => onClickDelete(id)}
          />
        </FooterRow>
      )}
    </ArticleCardStyle>
  );
};

export default ArticleCard;
