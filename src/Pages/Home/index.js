import React, { useEffect, useState } from "react";
import "./home.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../../Assets/Logo/logo_NDocs.png";

function Home() {
  const [selectedDoc, setSelectedDoc] = useState("");
  const [docsList, setDocsList] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [nomeCardEscolhido, setNomeCardEscolhido] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");

  const username = "Nedpereira";
  const repository = "Documentacao_NDocs";
  const docsPath = "Docs";
  const apiKey = process.env.REACT_APP_API_KEY;

  const formatNameForDisplay = (filename) => {
    return filename
      .replace(/-/g, " ")
      .replace(/.md/, "")
      .split(" ")
      .map((word) => word.charAt(0).toLowerCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

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
        searchTerms.every((term) => doc.name.toLowerCase().includes(term))
      );
      setFilteredDocs(filtered);
    } else {
      setFilteredDocs([]);
    }
  }, [selectedDoc, docsList]);

  const obterDocumentacao = (nome) => {;
    setNomeCardEscolhido(nome);
  };

  useEffect(() => {
    if (nomeCardEscolhido) {
      fetchMarkdownContent();
    }
  }, [nomeCardEscolhido]);

  const fetchMarkdownContent = () => {
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
  };

  const formatCodeBlocks = (text) => {
    const formattedText = text.replace(
      /algum padrão de regex/g,
      "```\n$&\n```"
    );
    return formattedText;
  };

  const copyToClipboard = (text) => {
    console.log("Copiado para a área de transferência: ", text);
  };

  return (
    <div>
      <div className="div-logo">
        <img className={"logo"} src={logo} alt="logo tipo NDocs" />
      </div>
      <div className="main">
        <div className="main_card">
          <p className="titulo-card">Documentações Relacionadas</p>
          {filteredDocs.map((doc) => (
            <div
              key={doc.name}
              className="card"
              onClick={() => obterDocumentacao(doc.name)}
            >
              <p className="texto_card">{formatNameForDisplay(doc.name)}</p>
            </div>
          ))}
        </div>
        <div className="div-documentacao-buscar">
          <div className="documentacao">
            <ReactMarkdown
              remarkPlugins={[gfm]}
              components={{
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
                            copyToClipboard(String(children).replace(/\n$/, ""))
                          }
                        >
                          <button className="code-button">
                            <ContentCopyIcon
                              fontSize="small"
                              className="code-icon"
                            />
                          </button>
                        </CopyToClipboard>
                        <code className={className}>{children}</code>
                      </div>
                    );
                  } else {
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                },
              }}
            >
              {formatCodeBlocks(markdownContent) ||
                "Escolha uma documentação..."}
            </ReactMarkdown>
          </div>

          <div className="div-buscar">
            <SearchIcon
              sx={{ fontSize: "30px", color: "white", marginRight: "5px" }}
            />
            <input
              className="input-buscar"
              value={selectedDoc}
              onChange={(e) => setSelectedDoc(e.target.value)}
              placeholder="Digite para pesquisar..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
