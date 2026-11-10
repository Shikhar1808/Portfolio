import type { Metadata } from "next";
import { Head, pageNav, Shell, StudyCards } from "../ui";

export const metadata: Metadata = {
  title: "Studies | Shikhar Saxena",
  description: "Benchmark studies on LLM serving, GPU vector search and RL for speculative decoding, all on a 6 GB RTX 3050.",
};

export default function StudiesPage() {
  return (
    <Shell nav={pageNav("/studies")}>
      <section className="section">
        <Head
          level={1}
          label="Studies"
          title="Measured, not assumed."
          sub="Longer write-ups of things I benchmarked end to end, with every number and what it taught me."
          rotate={-4}
        />
        <StudyCards />
      </section>
    </Shell>
  );
}
