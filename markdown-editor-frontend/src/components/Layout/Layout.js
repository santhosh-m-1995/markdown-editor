import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

import "./Layout.css";
import Header from "../Header/Header.js";
import TextEditor from "../TextEditor/TextEditor.js";
import Preview from "../Preview/Preview.js";

import { fetchData } from "../../services/ConnectBackEnd.js";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("# Hello, Markdown!");
  const [buttonText, setButtonText] = useState("Copy");
  const [mdFileName, setMdFileName] = useState("");
  const [sampleMarkDown, setSampleMarkDown] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const getSampleMarkDown = async () => {
      try {
        const response = await fetchData("samples/list", { signal });
        if (response.success) {
          setSampleMarkDown(response.files);
        }
      } catch (error) {
        console.error("Error getting sample Markdown:", error);
      }
    };
    getSampleMarkDown();

    return () => {
      controller.abort(); // Cleanup on unmount
    };
  }, [])

  const handleReset = () => setMarkdown("# Hello, Markdown!");
  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setButtonText("Copied!");

    setTimeout(() => {
      setButtonText("Copy");
    }, 1000);
  };

  useEffect(() => {
    if (mdFileName) {
      const controller = new AbortController();
      const { signal } = controller;
      const getMdContent = async () => {
        try {
          const response = await fetchData("samples/" + mdFileName, { signal });
          if (response.success) {
            setMarkdown(response.data);
          }
        } catch (error) {
          console.error("Getting error while reading the Markdown content:", error);
        }
      }
      getMdContent();
      return () => {
        controller.abort(); // Cleanup on unmount
      };
    }
  }, [mdFileName]);

  function handleSelect(mdFileName) {
    setMdFileName(mdFileName);
  }

  return (
    <Container fluid="xll">
      <Header handleCopy={handleCopy} handleReset={handleReset} buttonText={buttonText}
        sampleMarkDown={sampleMarkDown} handleSelect={handleSelect} />
      <Row className="g-0">
        <TextEditor markdown={markdown} setMarkdown={setMarkdown} />

        <Preview markdown={markdown} />
      </Row>
    </Container>
  );
};

export default MarkdownEditor;
