import type { Metadata } from "next";
import { study } from "../data";
import { Icon } from "../icons";
import { DataTable, Head, pageNav, Shell, Stats } from "../ui";

export const metadata: Metadata = {
  title: "Internship study | Shikhar Saxena",
  description:
    "LLM serving on vLLM, SGLang and TensorRT-LLM on a 6 GB RTX 3050, and cosine-similarity vector search on CPU, CUDA and HIP.",
};

const nav = pageNav("/study");

function KeyValues({ rows }: { rows: [string, string][] }) {
  return (
    <div className="chamfer kv-panel">
      <dl className="in kv">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function StudyPage() {
  const v = study.vector;
  return (
    <Shell nav={nav}>
      <section className="section">
        <Head
          level={1}
          label="Internship study"
          title="Same GPU, three engines."
          sub="Software intern at Voxomos Systems, June to July 2026. I served one small model on vLLM, SGLang and TensorRT-LLM on a 6 GB laptop GPU to find what actually limits LLM serving, then wrote the GPU kernels behind vector search."
          rotate={12}
        />
        <Stats items={study.llmFindings} />
        <div className="subhead">
          <h2>Setup</h2>
        </div>
        <KeyValues rows={study.setup} />
      </section>

      <section id="serving" className="section tint-ice">
        <Head
          label="LLM serving"
          title="How each engine behaved."
          sub="Each engine ran under its own load tool and workloads, so read these as how each one behaves under pressure, not as a head-to-head ranking."
          rotate={-8}
        />
        {study.runs.map((r) => (
          <div key={r.engine} className="run">
            <div className="subhead">
              <h3>{r.engine}</h3>
              <span>{r.tool}</span>
            </div>
            <p className="subhead-note">{r.note}</p>
            <DataTable cols={r.cols} rows={r.rows} />
          </div>
        ))}
      </section>

      <section className="section">
        <Head
          label="Takeaways"
          title="What the numbers say."
          sub="Five things I'd tell anyone serving models on a small GPU."
          rotate={18}
        />
        <ul className="takeaways">
          {study.takeaways.map((t) => (
            <li key={t.title}>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="vector-search" className="section tint-lilac">
        <Head label="Vector search" title="Where the GPU wins, and where it doesn't." sub={v.intro} rotate={-14} />
        <Stats items={v.findings} />

        <div className="subhead">
          <h3>What I built</h3>
          <a href={v.repo}>
            Code on GitHub <Icon name="arrow" size={14} />
          </a>
        </div>
        <KeyValues rows={v.builds} />

        <div className="subhead">
          <h3>Batch search</h3>
          <span>RTX 3050 Laptop GPU</span>
        </div>
        <DataTable cols={v.batch.cols} rows={v.batch.rows} />

        <div className="subhead">
          <h3>Single query, by dimension</h3>
          <span>One vector at a time</span>
        </div>
        <p className="subhead-note">
          With one query, kernel launch overhead costs more than the GPU saves until vectors pass about 3,000
          dimensions.
        </p>
        <DataTable cols={v.single.cols} rows={v.single.rows} />
      </section>

      <section className="section tint-apricot">
        <Head
          label="Reading"
          title="Also studied."
          sub="Topics I went deep on alongside the benchmarks."
          rotate={6}
        />
        <ul className="tags">
          {study.topics.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>
    </Shell>
  );
}
