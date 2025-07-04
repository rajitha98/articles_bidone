import { FormEvent, useEffect, useState } from "react";
import { Article } from "../../data/articleSlice/interface";
import { useDispatch } from "react-redux";
import { ArticleAction } from "../../data/articleSlice";
import "./style.css";
import Button from "../Button";
import Input from "../Input";
import authorIcon from "../../assets/icons/person.svg";
import titleIcon from "../../assets/icons/bookmark.svg";

interface Props {
  onCancel: () => void;
  initialData?: Article | null;
}

const ArticleForm = ({ onCancel, initialData }: Props) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<any>({});
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (initialData) {
      const temp: { [key: string]: any } = {};
      temp["title"] = initialData?.title;
      temp["status"] = initialData?.status;
      temp["author"] = initialData?.author;
      setFormData({ ...initialData });
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author) {
      setShowError(true);
      return;
    }
    const payload = {
      id: initialData?.id || Date.now().toString(),
      title: formData.title,
      status: formData.status || "Draft",
      author: formData.author,
      createdAt:
        initialData?.createdAt ||
        initialData?.createdAt ||
        new Date().toISOString(),
    };
    if (initialData) {
      dispatch(ArticleAction.updateArticleStart(payload));
    } else {
      dispatch(ArticleAction.createArticle(payload));
    }
    onCancel();
  };

  const onChangeValue = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>{initialData ? "Edit" : "Add"} Article</h2>
      <Input
        icon={titleIcon}
        placeholder="Title"
        value={formData.title}
        onChange={(e) => onChangeValue("title", e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }}
      />
      {showError && !formData.title && (
        <p className="errorText">Please enter the article title</p>
      )}

      <Input
        icon={authorIcon}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }}
        placeholder="Author"
        value={formData.author}
        onChange={(e) => onChangeValue("author", e.target.value)}
      />
      {showError && !formData.author && (
        <p className="errorText">Author name is required</p>
      )}

      <select
        value={formData.status}
        onChange={(e) => onChangeValue("status", e.target.value)}
      >
        <option value="Draft">Draft</option>
        <option value="Published">Published</option>
        <option value="Archived">Archived</option>
      </select>
      <section className="button-row">
        <Button type="button" label="Cancel" onClick={onCancel} color="#000" />
        <Button type="submit" label="Submit" color="red" />
      </section>
    </form>
  );
};

export default ArticleForm;
