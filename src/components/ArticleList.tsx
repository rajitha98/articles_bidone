import React from "react";
import ArticleCard from "./ArticleCard";
import { Article } from "../data/articleSlice/interface";

interface Props {
  articles?: Article[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ArticleList = ({ articles, onEdit, onDelete }: Props) => {
  return (
    <>
      {articles?.map((item) => (
        <ArticleCard
          id={item.id}
          title={item.title}
          status={item.status}
          author={item.author}
          createdAt={item.createdAt}
          onClickEdit={onEdit}
          onClickDelete={onDelete}
        />
      ))}
    </>
  );
};

export default ArticleList;
