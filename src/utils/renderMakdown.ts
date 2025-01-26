import { marked } from "marked";

export const renderMarkdown = (content: string) => {
  return { __html: marked(content) };
};
