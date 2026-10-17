import Link from "next/link";
import { experience, links, more, pipeline, posts, projects, record, stack, stats, study } from "./data";
import { Icon } from "./icons";
import type { NavItem } from "./nav";
import { Head, Hexagon, Shell, Stats } from "./ui";

const nav: NavItem[] = [
  { href: "#overview", label: "Overview" },
  { href: "#experience", label: "Experience" },
  { href: "#study", label: "Study" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "#record", label: "Record" },
  ...(posts.length ? [{ href: "#writing", label: "Writing" }] : []),
  { href: "#contact", label: "Contact" },
];

// Corner each "Built with" tile cuts, in order, as in the reference grid.
const tileCuts = ["cut-bl", "cut-tr", "cut-br", "cut-tl"];
// Pipeline cards alternate corners, as in the reference's "How every event was decided" row.
const stepCuts = ["cut-bl", "cut-tr"];

export default function Home() {
  return (
    <Shell nav={nav}>
      <section id="overview" className="section">
        <div className="hero-block grain">
          <h1>
            <span className="hero-name">Shikhar Saxena</span>
            <span className="hero-role">Backend and Forward-Deployed Engineer</span>
          </h1>
        </div>
        {/* The side rail carries this on wide screens; phones hide the rail, so it shows here instead */}
        <p className="hero-status">
          <span className="dot" /> Open to work
        </p>

        <div className="statement">
          <p>
            I build backends and make them fast on real hardware: NodeJs, Go and FastAPI services that keep state consistent
            under load, LLM inference and vector search tuned on GPUs, and edge systems deployed right next to the
            cameras they serve. Final-year computer science at Thapar Institute.
          </p>
          <p className="statement-strong">Fast is a number, not a feeling.</p>
          <Hexagon rotate={-14} className="hex-statement" />
        </div>

        <Stats items={stats} />
      </section>

      <section id="experience" className="section tint-ice">
        <Head
          label="Experience"
          title="Measured, then shipped."
          sub="Two internships: one tuning LLM inference on GPUs, one building the backend that dispatches a truck fleet."
          rotate={8}
        />
        <div className="exp-grid">
          {experience.map((job) => (
            <article key={job.company} className="chamfer">
              <div className="in exp">
                <div className="exp-top">
                  <span className="icon-box">
                    <Icon name={job.icon} />
                  </span>
                  <span className="dates">{job.dates}</span>
                </div>
                <h3>{job.company}</h3>
                <p className="role">{job.role}</p>
                <ul className="points">
                  {job.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <dl className="kv">
                  {job.rows.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                {job.link && (
                  <div className="card-links">
                    <Link href={job.link.href}>
                      {job.link.label} <Icon name="arrow" size={15} />
                    </Link>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="study" className="section">
        <Head
          label="Internship study"
          title="Same GPU, three engines."
          sub="At Voxomos I served TinyLlama-1.1B on vLLM, SGLang and TensorRT-LLM on one 6 GB RTX 3050, then wrote the GPU kernels behind vector search. These are the numbers that moved."
          rotate={12}
        />
        <Stats items={study.llmFindings} />
        <div className="cta-row">
          <p>Every engine and workload, the vector search kernels, and what the numbers add up to.</p>
          <Link className="btn" href="/study">
            Read the full study <Icon name="arrow" size={16} />
          </Link>
        </div>
      </section>

      <section id="projects" className="section tint-lilac">
        <Head
          label="Projects"
          title="Built under constraint."
          sub="Three systems, each shaped by one hard problem: noise, trust or traffic."
          rotate={-6}
        />
        <div className="project-grid">
          {projects.map((p) => (
            <article key={p.name} className="chamfer">
              <div className="in project">
                <div className="screen grain">
                  <span className="chip">{p.kind}</span>
                  <Icon name={p.icon} size={22} />
                  <p className="screen-metric">{p.metric}</p>
                  <p className="screen-note">{p.metricNote}</p>
                </div>
                <div className="project-body">
                  <h3>
                    <Link href={`/projects/${p.slug}`}>{p.name}</Link>
                  </h3>
                  <p className="meta">{p.stack}</p>
                  <ul className="points">
                    {p.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <Link className="text-link card-more" href={`/projects/${p.slug}`}>
                    How it works and the stack <Icon name="arrow" size={15} />
                  </Link>
                  <div className="card-links">
                    <a href={`https://${p.repo}`}>
                      <Icon name="github" size={15} />
                      {p.repo.replace("github.com/", "")}
                    </a>
                    {p.live && (
                      <a href={p.live}>
                        Live demo <Icon name="arrow" size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="subhead">
          <h3>How ZaiGuard decides on every event</h3>
          <span>Alert engine, in order</span>
        </div>
        <ol className="pipeline">
          {pipeline.map((s, i) => (
            <li key={s.step} className={`chamfer ${stepCuts[i % stepCuts.length]}`}>
              <div className="in step">
                <span className="icon-box">
                  <Icon name={s.icon} />
                </span>
                <p className="step-name">{s.name}</p>
                <p className="step-num">
                  <span className="sr-only">Layer </span>
                  {s.step}
                </p>
                <p className="step-note">
                  {s.note} <span>({s.tech})</span>
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="subhead">
          <h3>More on GitHub</h3>
          <a href={links.repos}>
            All repositories <Icon name="arrow" size={14} />
          </a>
        </div>
        <ul className="more">
          {more.map((m) => (
            <li key={m.repo}>
              <span className="icon-box">
                <Icon name={m.icon} />
              </span>
              <div>
                <p>
                  <a className="more-name" href={`https://${m.repo}`}>
                    {m.name}
                  </a>
                  <span className="more-meta"> · {m.stack}</span>
                </p>
                <p className="more-note">{m.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="stack" className="section">
        <Head
          label="Stack"
          title="The toolbox."
          sub="What I've used across internships, projects and hackathons."
          rotate={20}
        />
        <ul className="stack-grid">
          {stack.map((g, i) => (
            <li key={g.group} className={`chamfer ${tileCuts[i % tileCuts.length]}`}>
              <div className="in tile">
                <h3>{g.group}</h3>
                <ul className="tags">
                  {g.items.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="record" className="section tint-apricot">
        <Head label="Record" title="On the record." sub="Education, awards and certifications." rotate={-18} />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">What</th>
              <th scope="col">Where</th>
              <th scope="col">Result</th>
              <th scope="col">When</th>
            </tr>
          </thead>
          <tbody>
            {record.map((r) => (
              <tr key={r.what}>
                <th scope="row">{r.what}</th>
                <td>{r.where}</td>
                <td className="result">{r.result}</td>
                <td className="when">{r.when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {posts.length > 0 && (
        <section id="writing" className="section section-ruled">
          <Head label="Writing" title="Written down." sub="Longer write-ups on Medium." rotate={-10} />
          <ul className="posts">
            {posts.map((p) => (
              <li key={p.url}>
                <p className="post-date">{p.date}</p>
                <div>
                  <a className="post-title" href={p.url}>
                    {p.title} <Icon name="arrow" size={16} />
                  </a>
                  <p className="more-note">{p.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

    </Shell>
  );
}
