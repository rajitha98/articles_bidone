export interface Article {
  id: string;
  title: string;
  status: "Published" | "Draft" | "Archived";
  author: string;
  createdAt: string;
}
