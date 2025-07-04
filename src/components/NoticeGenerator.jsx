import React, { useState } from "react";
import {
  FileText,
  RotateCcw,
  Calendar,
  MapPin,
  Users,
  StickyNote,
  Lightbulb,
} from "lucide-react";
import "./NoticeGenerator.css";

export default function NoticeGenerator() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    date: "",
    location: "",
    audience: "",
    notes: "",
    promptTips: "",
  });

  const [generatedNotice, setGeneratedNotice] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      title: "",
      body: "",
      date: "",
      location: "",
      audience: "",
      notes: "",
      promptTips: "",
    });
    setGeneratedNotice("");
  };

  const handleGenerateNotice = () => {
    const notice = `
NOTICE

${formData.title ? `TITLE: ${formData.title}` : ""}

${formData.body ? `${formData.body}` : ""}

${formData.date ? `DATE: ${formData.date}` : ""}

${formData.location ? `LOCATION: ${formData.location}` : ""}

${formData.audience ? `AUDIENCE: ${formData.audience}` : ""}

${formData.notes ? `ADDITIONAL NOTES: ${formData.notes}` : ""}

${formData.promptTips ? `PROMPT TIPS: ${formData.promptTips}` : ""}

---
Generated on: ${new Date().toLocaleDateString()}
    `.trim();

    setGeneratedNotice(notice);
  };

  return (
    <div className="container">
      <div className="main-card">
        <div className="header">
          <div className="header-title">
            <FileText size={48} color="#667eea" />
            <h1 className="title">Notice Generator</h1>
          </div>
          <p className="subtitle">
            Create professional notices quickly and easily
          </p>
        </div>

        <div className="grid-container">
          <div className="form-section">
            <h2 className="section-title">Notice Details</h2>

            <div className="input-group">
              <label className="label">
                <FileText size={16} className="label-icon" />
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="input"
                placeholder="Enter notice title"
              />
            </div>

            <div className="input-group">
              <label className="label">
                <StickyNote size={16} className="label-icon" />
                Body
              </label>
              <textarea
                name="body"
                value={formData.body}
                onChange={handleInputChange}
                className="textarea"
                placeholder="Enter notice body content"
                rows="4"
              />
            </div>

            <div className="input-group">
              <label className="label">
                <Calendar size={16} className="label-icon" />
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="input"
              />
            </div>

            <div className="input-group">
              <label className="label">
                <MapPin size={16} className="label-icon" />
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="input"
                placeholder="Enter location"
              />
            </div>

            <div className="input-group">
              <label className="label">
                <Users size={16} className="label-icon" />
                Audience
              </label>
              <input
                type="text"
                name="audience"
                value={formData.audience}
                onChange={handleInputChange}
                className="input"
                placeholder="Enter target audience"
              />
            </div>

            <div className="input-group">
              <label className="label">
                <StickyNote size={16} className="label-icon" />
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="textarea"
                placeholder="Additional notes or instructions"
                rows="3"
              />
            </div>

            <div className="input-group">
              <label className="label">
                <Lightbulb size={16} className="label-icon" />
                Prompt Tips
              </label>
              <textarea
                name="promptTips"
                value={formData.promptTips}
                onChange={handleInputChange}
                className="textarea"
                placeholder="Tips for improving the notice"
                rows="3"
              />
            </div>

            <div className="button-container">
              <button
                onClick={handleGenerateNotice}
                className="button primary-button"
              >
                <FileText size={20} />
                Generate Notice
              </button>
              <button onClick={handleReset} className="button secondary-button">
                <RotateCcw size={20} />
                Reset
              </button>
            </div>
          </div>

          <div className="preview-section">
            <h2 className="section-title">Generated Notice</h2>

            <div className="preview-container">
              {generatedNotice ? (
                <div className="preview-content">{generatedNotice}</div>
              ) : (
                <div className="empty-preview">
                  <div className="empty-preview-content">
                    <FileText
                      size={64}
                      color="#ccc"
                      style={{ marginBottom: "15px" }}
                    />
                    <p style={{ fontSize: "1.2rem", margin: "0 0 5px 0" }}>
                      Your generated notice will appear here
                    </p>
                    <p style={{ fontSize: "0.9rem", margin: "0" }}>
                      Fill in the details and click "Generate Notice"
                    </p>
                  </div>
                </div>
              )}
            </div>

            {generatedNotice && (
              <button
                onClick={() => navigator.clipboard.writeText(generatedNotice)}
                className="copy-button"
              >
                Copy to Clipboard
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
