import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  FileText,
  RotateCcw,
  Calendar,
  MapPin,
  Users,
  StickyNote,
  Lightbulb,
  Flashlight,
} from "lucide-react";
import "./NoticeGenerator.css";

export default function NoticeGenerator() {
  //   const [formData, setFormData] = useState({
  //     title: "",
  //     body: "",
  //     date: "",
  //     location: "",
  //     audience: "",
  //     category: "",
  //     department: "",
  //     contact_officer: "",
  //     contact_number: "",
  //     email: "",
  //     additional_notes: "",
  //     // promptTips: '',
  //   });
  const [formData, setFormData] = useState({
    title: "Temporary Power Shortage Notice",
    body: "Residents are hereby informed that due to an unexpected load management issue from the local power grid, our CHS will experience intermittent power supply on 28th June 2025. The Maharashtra State Electricity Distribution Company Limited (MSEDCL) has assured us that normal supply will resume by evening.",
    date: "28/06/2025",
    location: "Sai Krupa CHS, Sector 17, Vashi, Navi Mumbai",
    audience: "All Residents of Sai Krupa CHS",
    category: "Electricity Disruption",
    department: "Building Maintenance Committee",
    contact_officer: "Mr. Ramesh Patil (Secretary)",
    contact_number: "9819456723",
    email: "saikrupachs.vashi@gmail.com",
    additional_notes:
      "Residents are requested to conserve electricity and avoid using heavy appliances during peak hours. Generator backup will be available for elevators and essential services only.",
  });

  const [generatedNotice, setGeneratedNotice] = useState("");
  const [generating, setGenerating] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value.trim() !== "") {
      setInvalidFields((prev) => prev.filter((field) => field !== name));
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      body: "",
      date: "",
      location: "",
      audience: "",
      category: "",
      department: "",
      contact_officer: "",
      contact_number: "",
      email: "",
      additional_notes: "",
      // promptTips: '',
    });
    setGenerating(false);
    setGeneratedNotice("");
  };

  const [invalidFields, setInvalidFields] = useState([]);

  const checkEmpty = () => {
    const requiredFields = { ...formData };
    delete requiredFields.additional_notes;

    const emptyFields = Object.entries(requiredFields)
      .filter(([key, value]) => value.trim() === "")
      .map(([key]) => key);

    setInvalidFields(emptyFields);

    return emptyFields.length === 0;
  };

  const handleGenerateNotice = async () => {
    if (!checkEmpty()) {
      return;
    }

    try {
      setGenerating(true);
      console.log("Date: ", formData);
      const jsonData = JSON.stringify(formData);
      const response = await fetch(
        "https://civicnotice.onrender.com/generate_notice/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonData,
        }
      );
      const data = await response.json();
      console.log("Response Data:", data);
      if (response.ok) {
        setGeneratedNotice(data.message);
        setGenerating(false);
      } else {
        setGeneratedNotice(data.detail[0].msg);
        setGenerating(false);
      }
    } catch (error) {
      console.log(error);
      setGenerating(false);
    }
  };

  return (
    <div className="container">
      <div className="main-card">
        <div className="header">
          <div className="header-title">
            <FileText size={48} color="#0d9488" />
            <h1 className="title">Civic Notice</h1>
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
                className={`input ${
                  invalidFields.includes("title") ? "input-error" : ""
                }`}
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
                className={`textarea ${
                  invalidFields.includes("body") ? "input-error" : ""
                }`}
                placeholder="Enter notice body content"
                rows="4"
              />
            </div>

            <div className="input-container-group">
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
                  className={`input ${
                    invalidFields.includes("date") ? "input-error" : ""
                  }`}
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
                  className={`input ${
                    invalidFields.includes("location") ? "input-error" : ""
                  }`}
                  placeholder="Enter location"
                />
              </div>
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
                className={`input ${
                  invalidFields.includes("audience") ? "input-error" : ""
                }`}
                placeholder="Enter target audience"
              />
            </div>

            <div className="input-group">
              <label className="label">
                <FileText size={16} className="label-icon" />
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`input ${
                  invalidFields.includes("category") ? "input-error" : ""
                }`}
                placeholder="Enter category"
              />
            </div>

            <div className="input-container-group">
              <div className="input-group">
                <label className="label">
                  <FileText size={16} className="label-icon" />
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={`input ${
                    invalidFields.includes("department") ? "input-error" : ""
                  }`}
                  placeholder="Enter department"
                />
              </div>

              <div className="input-group">
                <label className="label">
                  <FileText size={16} className="label-icon" />
                  Contact Officer
                </label>
                <input
                  type="text"
                  name="contact_officer"
                  value={formData.contact_officer}
                  onChange={handleInputChange}
                  className={`input ${
                    invalidFields.includes("contact_officer")
                      ? "input-error"
                      : ""
                  }`}
                  placeholder="Enter contact officer"
                />
              </div>
            </div>

            <div className="input-container-group">
              <div className="input-group">
                <label className="label">
                  <FileText size={16} className="label-icon" />
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleInputChange}
                  className={`input ${
                    invalidFields.includes("contact_number")
                      ? "input-error"
                      : ""
                  }`}
                  placeholder="Enter contact number"
                />
              </div>

              <div className="input-group">
                <label className="label">
                  <FileText size={16} className="label-icon" />
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`input ${
                    invalidFields.includes("email") ? "input-error" : ""
                  }`}
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="label">
                <StickyNote size={16} className="label-icon" />
                Notes
              </label>
              <textarea
                name="additional_notes"
                value={formData.additional_notes}
                onChange={handleInputChange}
                className={`textarea ${
                  invalidFields.includes("additional_notes")
                    ? "input-error"
                    : ""
                }`}
                placeholder="Additional notes or instructions"
                rows="3"
              />
            </div>

            {/* <div className="input-group">
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
            </div> */}

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
              {generating ? (
                <div className="load">
                  <div className="loader-inside"></div>
                  Loading
                </div>
              ) : generatedNotice ? (
                <div className="preview-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {/* <div className="preview-content">{generatedNotice}</div> */}
                    {generatedNotice}
                  </ReactMarkdown>
                </div>
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

// {
//     "title": "title",
//     "body": "body",
//     "date": "01/01/1991",
//     "location": "Kell",
//     "audience": "Audience",
//     "category": "Default",
//     "department": "Default",
//     "contact_officer": "Default",
//     "contact_number": "01234",
//     "email": "Default@gmail,com",
//     "additional_notes": "Notes",
// }
