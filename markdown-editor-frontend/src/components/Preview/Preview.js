import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { postData } from "../../services/ConnectBackEnd.js";
import "./Preview.css";

const Preview = ({ markdown }) => {
    const [html, setHtml] = useState(markdown);

    useEffect(() => {
        if (!markdown) return;
        const controller = new AbortController(); // Create AbortController
        const signal = controller.signal;

        const convertMarkdown = async () => {
            try {
                const response = await postData("convert", { text: markdown }, { signal });
                if(response.success) {
                    setHtml(response.html);
                }
            } catch (error) {
                console.error("Error converting Markdown:", error);
            }
        };
        convertMarkdown();

        return () => {
            controller.abort(); // Abort previous request before new one
        };
    }, [markdown]);

    return (
        <Col md={6} style={{ height: "94vh" }}>
            <div style={{ width: "100%", height: "100%", overflow: "scroll" }} className="border p-3 markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
        </Col>
    );
};

export default Preview;