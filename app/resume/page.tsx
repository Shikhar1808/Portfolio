import type { Metadata } from "next";
import { links } from "../data";
import { Icon } from "../icons";
import { Head, pageNav, Shell } from "../ui";

export const metadata: Metadata = {
  title: "Résumé | Shikhar Saxena",
  description: "Shikhar Saxena's résumé: read it in the browser or download the PDF.",
};

export default function ResumePage() {
  return (
    <Shell nav={pageNav()}>
      <section className="section">
        <Head
          level={1}
          label="Résumé"
          title="The short version."
          sub="Everything on this site, on one page. Read it here, or download a copy."
          rotate={-10}
        />
        <div className="action-row">
          <a className="btn" href={links.resume} download="Shikhar-Saxena-Resume.pdf">
            <Icon name="download" size={16} /> Download PDF
          </a>
          <a className="text-link" href={links.resume} target="_blank" rel="noopener">
            Open in a new tab <Icon name="arrow" size={15} />
          </a>
        </div>

        <div className="chamfer resume-frame">
          <div className="in">
            {/* The browser's own PDF viewer renders this inline, so nothing downloads unless asked. */}
            <iframe src={`${links.resume}#view=FitH`} title="Shikhar Saxena's résumé (PDF)" />
          </div>
        </div>
        <p className="resume-fallback">
          If the résumé doesn&rsquo;t show above, your browser can&rsquo;t display PDFs inside a page. Use{" "}
          <a href={links.resume} target="_blank" rel="noopener">
            Open in a new tab
          </a>{" "}
          to read it, or download the PDF.
        </p>
      </section>
    </Shell>
  );
}
