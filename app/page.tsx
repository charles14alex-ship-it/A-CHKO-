"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Download,
  Printer,
  RotateCcw,
  Eye,
  User,
  GraduationCap,
  Briefcase,
  Wrench,
  Languages,
  Palette,
  FileText,
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
} from "lucide-react";

type Education = {
  id: number;
  school: string;
  qualification: string;
  year: string;
  details: string;
};

type Experience = {
  id: number;
  company: string;
  position: string;
  period: string;
  details: string;
};

type CVData = {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  skills: string;
  languages: string;
  hobbies: string;
  references: string;
  education: Education[];
  experience: Experience[];
};

const initialData: CVData = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  summary: "",
  skills: "",
  languages: "",
  hobbies: "",
  references: "",
  education: [
    {
      id: 1,
      school: "",
      qualification: "",
      year: "",
      details: "",
    },
  ],
  experience: [
    {
      id: 2,
      company: "",
      position: "",
      period: "",
      details: "",
    },
  ],
};

const colors = [
  { name: "Blue", value: "#2563eb" },
  { name: "Green", value: "#15803d" },
  { name: "Purple", value: "#7c3aed" },
  { name: "Black", value: "#222222" },
  { name: "Orange", value: "#ea580c" },
  { name: "Red", value: "#dc2626" },
];

export default function CVBuilderPage() {
  const [data, setData] = useState<CVData>(initialData);
  const [accent, setAccent] = useState("#2563eb");
  const [template, setTemplate] = useState("modern");
  const [showPreview, setShowPreview] = useState(false);
  const [message, setMessage] = useState("");

  function updateField<K extends keyof CVData>(
    field: K,
    value: CVData[K]
  ) {
    setData((previous) => ({ ...previous, [field]: value }));
  }

  function updateEducation(
    id: number,
    field: keyof Education,
    value: string
  ) {
    setData((previous) => ({
      ...previous,
      education: previous.education.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  }

  function updateExperience(
    id: number,
    field: keyof Experience,
    value: string
  ) {
    setData((previous) => ({
      ...previous,
      experience: previous.experience.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  }

  function addEducation() {
    setData((previous) => ({
      ...previous,
      education: [
        ...previous.education,
        {
          id: Date.now(),
          school: "",
          qualification: "",
          year: "",
          details: "",
        },
      ],
    }));
  }

  function removeEducation(id: number) {
    setData((previous) => ({
      ...previous,
      education: previous.education.filter((item) => item.id !== id),
    }));
  }

  function addExperience() {
    setData((previous) => ({
      ...previous,
      experience: [
        ...previous.experience,
        {
          id: Date.now(),
          company: "",
          position: "",
          period: "",
          details: "",
        },
      ],
    }));
  }

  function removeExperience(id: number) {
    setData((previous) => ({
      ...previous,
      experience: previous.experience.filter((item) => item.id !== id),
    }));
  }

  function downloadJSON() {
    const file = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-achko-cv-data.json";
    link.click();
    URL.revokeObjectURL(url);
    setMessage("CV data imepakuliwa.");
  }

  function saveDraft() {
    try {
      localStorage.setItem("achko_cv_draft", JSON.stringify(data));
      localStorage.setItem("achko_cv_color", accent);
      localStorage.setItem("achko_cv_template", template);
      setMessage("CV yako imehifadhiwa kwenye kifaa hiki.");
    } catch {
      setMessage("Imeshindikana kuhifadhi. Jaribu kupakua CV data.");
    }
  }

  function loadDraft() {
    try {
      const saved = localStorage.getItem("achko_cv_draft");

      if (!saved) {
        setMessage("Hakuna CV iliyohifadhiwa kwenye kifaa hiki.");
        return;
      }

      setData(JSON.parse(saved) as CVData);
      setAccent(localStorage.getItem("achko_cv_color") || "#2563eb");
      setTemplate(localStorage.getItem("achko_cv_template") || "modern");
      setMessage("CV yako imefunguliwa.");
    } catch {
      setMessage("Imeshindikana kufungua CV iliyohifadhiwa.");
    }
  }

  function resetCV() {
    const confirmed = window.confirm(
      "Una uhakika unataka kufuta taarifa zote ulizoandika?"
    );

    if (confirmed) {
      setData(initialData);
      setMessage("Fomu imesafishwa.");
    }
  }

  function printCV() {
    setShowPreview(true);
    window.setTimeout(() => window.print(), 300);
  }

  const skillList = data.skills
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);

  const languageList = data.languages
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);

  const hobbiesList = data.hobbies
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <main className="cv-builder">
      <header className="cv-header no-print">
        <div>
          <div className="cv-brand">A-CHKO</div>
          <h1>CV Builder</h1>
          <p>
            Tengeneza CV yako ya kitaalamu, ibadilishe na uiandae kwa ajili
            ya maombi ya kazi au internship.
          </p>
        </div>

        <div className="cv-header-actions">
          <button className="cv-button cv-secondary" onClick={loadDraft}>
            <FileText size={17} /> Fungua CV
          </button>

          <button className="cv-button cv-secondary" onClick={saveDraft}>
            Hifadhi draft
          </button>

          <button className="cv-button cv-primary" onClick={printCV}>
            <Download size={17} /> PDF / Print
          </button>
        </div>
      </header>

      {message && (
        <div className="cv-message no-print">
          {message}
          <button onClick={() => setMessage("")} aria-label="Funga ujumbe">
            ×
          </button>
        </div>
      )}

      <div className="cv-toolbar no-print">
        <button
          className="cv-button cv-secondary"
          onClick={() => setShowPreview(!showPreview)}
        >
          <Eye size={17} />
          {showPreview ? "Ficha preview" : "Angalia CV"}
        </button>

        <button className="cv-button cv-secondary" onClick={downloadJSON}>
          <Download size={17} /> Pakua data
        </button>

        <button className="cv-button cv-danger" onClick={resetCV}>
          <RotateCcw size={17} /> Anza upya
        </button>
      </div>

      <div className={`cv-layout ${showPreview ? "preview-open" : ""}`}>
        <section className="cv-form no-print">
          <div className="cv-card">
            <h2>
              <User size={20} /> Taarifa binafsi
            </h2>

            <div className="cv-grid">
              <label className="cv-field">
                Jina kamili *
                <input
                  value={data.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  placeholder="Mfano: Alex Charles"
                />
              </label>

              <label className="cv-field">
                Kazi unayoomba
                <input
                  value={data.jobTitle}
                  onChange={(e) => updateField("jobTitle", e.target.value)}
                  placeholder="Mfano: Accountant"
                />
              </label>

              <label className="cv-field">
                <span><Mail size={14} /> Barua pepe</span>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="you@example.com"
                />
              </label>

              <label className="cv-field">
                <span><Phone size={14} /> Simu</span>
                <input
                  value={data.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+255..."
                />
              </label>

              <label className="cv-field">
                <span><MapPin size={14} /> Mahali</span>
                <input
                  value={data.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="Mwanza, Tanzania"
                />
              </label>

              <label className="cv-field">
                <span><LinkIcon size={14} /> Website / LinkedIn</span>
                <input
                  value={data.website}
                  onChange={(e) => updateField("website", e.target.value)}
                  placeholder="Kiungo chako"
                />
              </label>
            </div>

            <label className="cv-field">
              Muhtasari wa kitaalamu
              <textarea
                rows={4}
                value={data.summary}
                onChange={(e) => updateField("summary", e.target.value)}
                placeholder="Eleza uwezo wako, uzoefu na malengo yako ya kazi..."
              />
            </label>
          </div>

          <div className="cv-card">
            <h2>
              <GraduationCap size={20} /> Elimu na vyeti
            </h2>

            {data.education.map((item, index) => (
              <div className="cv-repeat-item" key={item.id}>
                <div className="cv-repeat-heading">
                  <strong>Elimu {index + 1}</strong>
                  {data.education.length > 1 && (
                    <button
                      className="cv-icon-button"
                      onClick={() => removeEducation(item.id)}
                      aria-label="Futa elimu"
                    >
                      <Trash2 size={17} />
                    </button>
                  )}
                </div>

                <label className="cv-field">
                  Taasisi / shule
                  <input
                    value={item.school}
                    onChange={(e) =>
                      updateEducation(item.id, "school", e.target.value)
                    }
                    placeholder="Jina la taasisi"
                  />
                </label>

                <label className="cv-field">
                  Cheti / ngazi ya elimu
                  <input
                    value={item.qualification}
                    onChange={(e) =>
                      updateEducation(item.id, "qualification", e.target.value)
                    }
                    placeholder="Mfano: Diploma in Accounting"
                  />
                </label>

                <label className="cv-field">
                  Mwaka
                  <input
                    value={item.year}
                    onChange={(e) =>
                      updateEducation(item.id, "year", e.target.value)
                    }
                    placeholder="2023–2026"
                  />
                </label>

                <label className="cv-field">
                  Maelezo ya ziada
                  <textarea
                    rows={2}
                    value={item.details}
                    onChange={(e) =>
                      updateEducation(item.id, "details", e.target.value)
                    }
                    placeholder="Mafanikio au masomo muhimu"
                  />
                </label>
              </div>
            ))}

            <button className="cv-button cv-secondary cv-full" onClick={addEducation}>
              <Plus size={17} /> Ongeza elimu
            </button>
          </div>

          <div className="cv-card">
            <h2>
              <Briefcase size={20} /> Uzoefu wa kazi
            </h2>

            {data.experience.map((item, index) => (
              <div className="cv-repeat-item" key={item.id}>
                <div className="cv-repeat-heading">
                  <strong>Uzoefu {index + 1}</strong>
                  {data.experience.length > 1 && (
                    <button
                      className="cv-icon-button"
                      onClick={() => removeExperience(item.id)}
                      aria-label="Futa uzoefu"
                    >
                      <Trash2 size={17} />
                    </button>
                  )}
                </div>

                <label className="cv-field">
                  Kampuni / mwajiri
                  <input
                    value={item.company}
                    onChange={(e) =>
                      updateExperience(item.id, "company", e.target.value)
                    }
                    placeholder="Jina la kampuni"
                  />
                </label>

                <label className="cv-field">
                  Nafasi ya kazi
                  <input
                    value={item.position}
                    onChange={(e) =>
                      updateExperience(item.id, "position", e.target.value)
                    }
                    placeholder="Mfano: Accounts Assistant"
                  />
                </label>

                <label className="cv-field">
                  Kipindi
                  <input
                    value={item.period}
                    onChange={(e) =>
                      updateExperience(item.id, "period", e.target.value)
                    }
                    placeholder="Jan 2025 – Dec 2025"
                  />
                </label>

                <label className="cv-field">
                  Majukumu na mafanikio
                  <textarea
                    rows={3}
                    value={item.details}
                    onChange={(e) =>
                      updateExperience(item.id, "details", e.target.value)
                    }
                    placeholder="Andika majukumu na mafanikio yako..."
                  />
                </label>
              </div>
            ))}

            <button className="cv-button cv-secondary cv-full" onClick={addExperience}>
              <Plus size={17} /> Ongeza uzoefu
            </button>
          </div>

          <div className="cv-card">
            <h2>
              <Wrench size={20} /> Ujuzi na lugha
            </h2>

            <label className="cv-field">
              Ujuzi
              <textarea
                rows={3}
                value={data.skills}
                onChange={(e) => updateField("skills", e.target.value)}
                placeholder="Excel, Accounting, Communication, Leadership"
              />
              <small>Tenganisha kila ujuzi kwa koma au mstari mpya.</small>
            </label>

            <label className="cv-field">
              Lugha
              <textarea
                rows={2}
                value={data.languages}
                onChange={(e) => updateField("languages", e.target.value)}
                placeholder="Kiswahili, English"
              />
            </label>

            <label className="cv-field">
              Vitu unavyopenda / shughuli za ziada
              <textarea
                rows={2}
                value={data.hobbies}
                onChange={(e) => updateField("hobbies", e.target.value)}
                placeholder="Kusoma, kujitolea, michezo..."
              />
            </label>

            <label className="cv-field">
              Marejeo (References)
              <textarea
                rows={3}
                value={data.references}
                onChange={(e) => updateField("references", e.target.value)}
                placeholder="Jina, cheo, taasisi na mawasiliano ya mtu wa marejeo"
              />
              <small>
                Hakikisha umepata ruhusa ya mtu kabla ya kuweka taarifa zake.
              </small>
            </label>
          </div>

          <div className="cv-card">
            <h2>
              <Palette size={20} /> Muonekano wa CV
            </h2>

            <label className="cv-field">
              Chagua template
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
              >
                <option value="modern">Modern — ya kisasa</option>
                <option value="classic">Classic — ya kawaida</option>
                <option value="minimal">Minimal — rahisi</option>
                <option value="professional">Professional — ya kikazi</option>
              </select>
            </label>

            <div className="cv-color-list">
              {colors.map((color) => (
                <button
                  key={color.value}
                  className={`cv-color ${accent === color.value ? "selected" : ""}`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => setAccent(color.value)}
                  title={color.name}
                  aria-label={`Chagua rangi ${color.name}`}
                />
              ))}
            </div>
          </div>

          <button className="cv-button cv-primary cv-full" onClick={printCV}>
            <Printer size={18} /> Tengeneza PDF / Print
          </button>
        </section>

        <section className={`cv-preview-area ${showPreview ? "show" : ""}`}>
          <div className="cv-preview-label no-print">
            <FileText size={18} /> CV Preview
            <span>Muonekano wa CV yako</span>
          </div>

          <article
            id="cv-document"
            className={`cv-document template-${template}`}
            style={{ "--cv-accent": accent } as React.CSSProperties}
          >
            <div className="cv-document-header">
              <h1>{data.fullName || "JINA LAKO KAMILI"}</h1>
              <h2>{data.jobTitle || "Nafasi ya kazi unayoomba"}</h2>

              <div className="cv-contact-list">
                {data.email && <span>{data.email}</span>}
                {data.phone && <span>{data.phone}</span>}
                {data.location && <span>{data.location}</span>}
                {data.website && <span>{data.website}</span>}
              </div>
            </div>

            {data.summary && (
              <section className="cv-document-section">
                <h3>PROFESSIONAL SUMMARY</h3>
                <p className="cv-preserve-lines">{data.summary}</p>
              </section>
            )}

            {data.experience.some(
              (item) => item.company || item.position || item.details
            ) && (
              <section className="cv-document-section">
                <h3>WORK EXPERIENCE</h3>
                {data.experience
                  .filter(
                    (item) => item.company || item.position || item.details
                  )
                  .map((item) => (
                    <div className="cv-document-item" key={item.id}>
                      <div className="cv-document-item-top">
                        <strong>{item.position}</strong>
                        <span>{item.period}</span>
                      </div>
                      <div className="cv-document-subtitle">{item.company}</div>
                      {item.details && (
                        <p className="cv-preserve-lines">{item.details}</p>
                      )}
                    </div>
                  ))}
              </section>
            )}

            {data.education.some(
              (item) => item.school || item.qualification || item.details
            ) && (
              <section className="cv-document-section">
                <h3>EDUCATION & QUALIFICATIONS</h3>
                {data.education
                  .filter(
                    (item) => item.school || item.qualification || item.details
                  )
                  .map((item) => (
                    <div className="cv-document-item" key={item.id}>
                      <div className="cv-document-item-top">
                        <strong>{item.qualification}</strong>
                        <span>{item.year}</span>
                      </div>
                      <div className="cv-document-subtitle">{item.school}</div>
                      {item.details && <p>{item.details}</p>}
                    </div>
                  ))}
              </section>
            )}

            {skillList.length > 0 && (
              <section className="cv-document-section">
                <h3>KEY SKILLS</h3>
                <div className="cv-skill-list">
                  {skillList.map((skill, index) => (
                    <span key={`${skill}-${index}`}>{skill}</span>
                  ))}
                </div>
              </section>
            )}

            {languageList.length > 0 && (
              <section className="cv-document-section">
                <h3>LANGUAGES</h3>
                <p>{languageList.join(" • ")}</p>
              </section>
            )}

            {hobbiesList.length > 0 && (
              <section className="cv-document-section">
                <h3>INTERESTS & ACTIVITIES</h3>
                <p>{hobbiesList.join(" • ")}</p>
              </section>
            )}

            {data.references && (
              <section className="cv-document-section">
                <h3>REFERENCES</h3>
                <p className="cv-preserve-lines">{data.references}</p>
              </section>
            )}

            <footer className="cv-document-footer">
              Created with A-CHKO CV Builder
            </footer>
          </article>
        </section>
      </div>

      <p className="cv-disclaimer no-print">
        Kumbuka: CV draft huhifadhiwa kwenye kifaa hiki pekee. Hii haimaanishi
        kuwa imehifadhiwa kwenye akaunti yako ya A-CHKO. Usijaze taarifa zisizo
        za kweli; hakikisha taarifa zako ni sahihi kabla ya kutuma maombi.
      </p>
    </main>
  );
}
