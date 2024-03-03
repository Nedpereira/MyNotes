import "./style.css";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const formatMessage = (text) => {
  return (
    <ReactMarkdown
      className="markdown-body"
      children={text}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
    />
  );
};

export default formatMessage;
