import type { Metadata } from "next";
import Image from "next/image";
import { rlStudy } from "../../data";
import { Icon } from "../../icons";
import { DataTable, Head, KeyValues, pageNav, Shell, Stats } from "../../ui";

export const metadata: Metadata = {
  title: "RL for speculative decoding | Shikhar Saxena",
  description:
    "Four RL agents learn when to stop drafting in speculative decoding: up to 1.75× faster generation on a 6 GB RTX 3050, with the same output.",
};

const nav = pageNav("/studies");

const pairs = ["qwen", "smol"] as const;
const pairNames = { qwen: "Qwen2.5 0.5B → 1.5B", smol: "SmolLM2 135M → 1.7B" };

// One figure from the RL repo, Qwen and SmolLM2 side by side (stacked when wide).
function Figures({ fig, wide = false }: { fig: (typeof rlStudy.figures)[keyof typeof rlStudy.figures]; wide?: boolean }) {
  return (
    <div className="gallery" style={wide ? { gridTemplateColumns: "minmax(0, 1fr)" } : undefined}>
      {pairs.map((pair, i) => (
        <figure key={pair} className="chamfer">
          <div className="in">
            <Image
              src={`/studies/rl/${fig.file}_${pair}.png`}
              alt={`${fig.caption} ${pairNames[pair]}.`}
              width={fig.sizes[i][0]}
              height={fig.sizes[i][1]}
              sizes={wide ? "100vw" : "(max-width: 900px) 100vw, 50vw"}
            />
            <figcaption>
              <strong>{pairNames[pair]}.</strong> {fig.caption}
            </figcaption>
          </div>
        </figure>
      ))}
    </div>
  );
}

export default function RlStudyPage() {
  const r = rlStudy;
  return (
    <Shell nav={nav}>
      <section className="section">
        <Head
          level={1}
          label="Course study · RL for speculative decoding"
          title="Learning when to stop drafting."
          sub="A small draft model guesses tokens and a big target model checks them all in one pass. After each guess, an RL agent decides: guess one more, or stop and verify. The output stays exactly the target's; only the speed changes. I compared four RL algorithms against fixed rules, in a simulator and live on the GPU."
          rotate={-10}
        />
        <Stats items={r.findings} />
        <div className="subhead">
          <h2>Setup</h2>
          <a href={r.repo}>
            Code on GitHub <Icon name="arrow" size={14} />
          </a>
        </div>
        <KeyValues rows={r.setup} />
      </section>

      <section className="section tint-ice">
        <Head
          label="The problem"
          title="Speculation as a decision process."
          sub="Draft too few tokens and the target is called too often. Draft too many and most get rejected. The agent sees how confident the draft is and chooses each step."
          rotate={14}
        />
        <KeyValues rows={r.mdp} />
        <div className="subhead">
          <h3>Measured cost of a draft step</h3>
          <span>RTX 3050 Laptop GPU</span>
        </div>
        <p className="subhead-note">
          Without CUDA graphs, a one-token step was limited by how fast the CPU launches kernels, so the small model
          was nearly as slow as the big one. Recording each forward pass as a CUDA graph is what made speculation pay.
        </p>
        <DataTable cols={r.constants.cols} rows={r.constants.rows} />
      </section>

      <section className="section">
        <Head
          label="Algorithms"
          title="Four ways to learn the same choice."
          sub="All four solve the same problem on the 399 training prompts and are scored on 99 unseen ones. Baselines: a fixed draft length, and HuggingFace's rule of stopping when draft confidence falls below 0.4."
          rotate={-6}
        />
        <ul className="takeaways">
          {r.algorithms.map((t) => (
            <li key={t.title}>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </li>
          ))}
        </ul>
        <div className="subhead">
          <h3>What each agent learned</h3>
          <span>Policy on the test prompts</span>
        </div>
        <Figures fig={r.figures.heatmap} wide />
      </section>

      <section className="section tint-lilac">
        <Head
          label="Results"
          title="Every agent beat every baseline."
          sub="Live: 30 test prompts × 3 runs, every method on the same CUDA-graph runners, method order rotated per prompt. Speedup is against the target model generating alone."
          rotate={10}
        />
        <div className="subhead">
          <h3>Live, wall clock</h3>
          <span>Tokens per second</span>
        </div>
        <DataTable cols={r.live.cols} rows={r.live.rows} />
        <Figures fig={r.figures.live} />

        <div className="subhead">
          <h3>Live, by task</h3>
          <span>Value Iteration against the threshold rule</span>
        </div>
        <DataTable cols={r.byTask.cols} rows={r.byTask.rows} />
        <Figures fig={r.figures.perTask} />

        <div className="subhead">
          <h3>Simulator</h3>
          <span>99 unseen prompts</span>
        </div>
        <p className="subhead-note">
          The simulator replays logged model outputs and counts time in target calls. It ranks the methods the same way
          as the live run, but reads 8–14% high because it skips per-step overhead.
        </p>
        <DataTable cols={r.sim.cols} rows={r.sim.rows} />
        <Figures fig={r.figures.sim} />
        <Figures fig={r.figures.simVsLive} />

        <div className="subhead">
          <h3>Across training seeds</h3>
          <span>Simulator speedup, mean ± std over 3 seeds</span>
        </div>
        <DataTable cols={r.seeds.cols} rows={r.seeds.rows} />
        <Figures fig={r.figures.training} />

        <div className="subhead">
          <h3>Price of a target call</h3>
          <span>Value Iteration, Qwen</span>
        </div>
        <p className="subhead-note">
          Too cheap and the agent drafts long rounds that get rejected; too dear and it stops after one token. The best
          speedup sits at the λ the Dinkelbach update picked.
        </p>
        <DataTable cols={r.lambda.cols} rows={r.lambda.rows} />
        <Figures fig={r.figures.lambda} />
      </section>

      <section className="section">
        <Head
          label="Takeaways"
          title="What the agents taught me."
          sub="Six things this study showed."
          rotate={18}
        />
        <ul className="takeaways">
          {r.takeaways.map((t) => (
            <li key={t.title}>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section tint-apricot">
        <Head label="Limits" title="What this doesn't cover." sub="Where these numbers stop applying." rotate={6} />
        <ul className="tags">
          {r.limits.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>
    </Shell>
  );
}
