import React, { useCallback, useEffect, useState } from "react";
import "./home.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import "github-markdown-css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SearchIcon from "@mui/icons-material/Search";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import runChat from "../../Api/Run-Chat";
import FormatMessage from "../../Helpers/Format-Message";

function Home() {
  const [selectedDoc, setSelectedDoc] = useState("");
  const [docsList, setDocsList] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [nomeCardEscolhido, setNomeCardEscolhido] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const username = "Nedpereira";
  const repository = "Documentacao_NDocs";
  const docsPath = "Docs";
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const listUrl = `https://api.github.com/repos/${username}/${repository}/contents/${docsPath}`;
    fetch(listUrl, {
      headers: new Headers({
        Authorization: `token ${apiKey}`,
        Accept: "application/vnd.github.v3.raw",
      }),
    })
      .then((response) => response.json())
      .then((files) => {
        setDocsList(files);
      });
  }, [apiKey]);

  useEffect(() => {
    if (selectedDoc) {
      const searchTerms = selectedDoc?.toLowerCase().split(" ");
      const filtered = docsList?.filter((doc) =>
        searchTerms?.every((term) => doc.name.toLowerCase().includes(term))
      );
      setFilteredDocs(filtered);
    } else {
      setFilteredDocs([]);
    }
  }, [selectedDoc, docsList]);

  const obterDocumentacao = (nome) => {
    setNomeCardEscolhido(nome);
  };

  const fetchMarkdownContent = useCallback(() => {
    if (!nomeCardEscolhido) return;

    const contentUrl = `https://api.github.com/repos/${username}/${repository}/contents/${docsPath}/${nomeCardEscolhido}`;
    fetch(contentUrl, {
      headers: new Headers({
        Authorization: `token ${apiKey}`,
        Accept: "application/vnd.github.v3.raw",
      }),
    })
      .then((response) => response.text())
      .then((text) => {
        setMarkdownContent(text);
      });
  }, [apiKey, nomeCardEscolhido, username, repository, docsPath]);

  useEffect(() => {
    fetchMarkdownContent();
  }, [fetchMarkdownContent]);

  const formatCodeBlocks = (text) => {
    const formattedText = text?.replace(
      /algum padrão de regex/g,
      "```\n$&\n```"
    );
    return formattedText;
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setShowAlert(true);
  };

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  useEffect(() => {
    runChat();
  },[])

  return (
    <div className="content_body">
      <Snackbar
        open={showAlert}
        autoHideDuration={1000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setShowAlert(false)}
          severity="success"
        >
          Copiado com sucesso!
        </MuiAlert>
      </Snackbar>
      <div className="main">
        <div className="div-titulo-cards">
          <div className="div-logo-titulo-card">
            <p className="titulo-card">Documentações Relacionadas</p>
          </div>
          <div className="main_card">
            {filteredDocs?.map((doc) => (
              <div
                key={doc.name}
                className="card"
                onClick={() => obterDocumentacao(doc.name)}
              >
                <p className="texto_card">{FormatMessage(doc.name)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="div-documentacao-buscar">
          <div className="div-buscar">
            <input
              className="input-buscar"
              value={selectedDoc}
              onChange={(e) => setSelectedDoc(e.target.value)}
              placeholder="Digite para pesquisar ou '-' para listar tudo..."
            />
            <SearchIcon
              className="searchIcon"
              sx={{
                fontSize: "25px",
                color: "white",
                marginLeft: "5px",
              }}
            />
          </div>
          <div className="documentacao">
            <ReactMarkdown
              className="markdown-body"
              remarkPlugins={[gfm]}
              components={{
                a: ({ node, ...props }) => (
                  <a {...props} target="_blank" rel="noopener noreferrer">
                    {props.children}
                  </a>
                ),
                p({ node, children, ...props }) {
                  if (
                    node.children.length === 1 &&
                    node.children[0].tagName === "code"
                  ) {
                    return children;
                  }
                  return <div {...props}>{children}</div>;
                },

                code({ node, inline, className, children, ...props }) {
                  if (!inline) {
                    return (
                      <div className="code-block">
                        <CopyToClipboard
                          text={String(children).replace(/\n$/, "")}
                          onCopy={() =>
                            handleCopyCode(String(children).replace(/\n$/, ""))
                          }
                        >
                          <button className="code-button">
                            <ContentCopyIcon
                              fontSize="small"
                              className="code-icon"
                            />
                          </button>
                        </CopyToClipboard>
                        <pre className={className}>
                          <code {...props}>{children}</code>
                        </pre>
                      </div>
                    );
                  }
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {formatCodeBlocks(markdownContent) ||
                "Escolha uma documentação..."}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
