import React, { useState } from "react";
import { Article } from "../data/articleSlice/interface";
import { useDispatch } from "react-redux";
import { ArticleAction } from "../data/articleSlice";

interface Props {
  onCancel: () => void;
  initialData?: Article | null;
}

const ArticleForm = ({  onCancel, initialData }: Props) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<any>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author) return alert("Required fields");
    const payload = {
      id: initialData?.id || Date.now().toString(),
      title: formData.title,
      status: formData.status ?? "Draft",
      author: formData.author,
      createdAt: initialData?.createdAt || new Date().toISOString(),
    };
    dispatch(ArticleAction.createArticle(payload));
    onCancel();
  };

  const onChangeValue = (name: string, value: any) => {
    formData[name] = value;
    setFormData(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialData ? "Edit" : "Add"} Article</h2>
      <input
        placeholder="Title"
        value={formData.title}
        onChange={(e) => onChangeValue("title", e.target.value)}
        required
      />
      <input
        placeholder="Author"
        value={formData.author}
        onChange={(e) => onChangeValue("author", e.target.value)}
        required
      />
      <select
        value={formData.status}
        onChange={(e) => onChangeValue("status", e.target.value)}
      >
        <option value="Published">Published</option>
        <option value="Draft">Draft</option>
        <option value="Archived">Archived</option>
      </select>
      <button type="submit">Submit</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default ArticleForm;
