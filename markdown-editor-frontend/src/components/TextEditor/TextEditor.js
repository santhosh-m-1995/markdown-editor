import React, { useEffect, useRef } from "react";
import { Col } from "react-bootstrap";
import "./TextEditor.css";

const TextEditor = ({ markdown, setMarkdown }) => {
    const inputEl = useRef(null);
    useEffect(() => {
        if (document.activeElement === inputEl.current) return;
        inputEl.current.focus();
    }, []);
    return (
        <Col md={6} style={{ height: "94vh" }}>
            <textarea
                ref={inputEl}
                className="form-control"
                style={{ width: "100%", height: "100%" }}
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
            />
        </Col>
    );
};

export default TextEditor;