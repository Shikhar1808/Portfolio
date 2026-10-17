import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectPages, projects } from "../../data";
import { Icon } from "../../icons";
import { Head, pageNav, Shell, Stats } from "../../ui";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const page = projectPages[(await params).slug];
  return page ? { title: `${page.title} | Shikhar Saxena`, description: page.sub } : {};
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const page = projectPages[slug];
  const index = projects.findIndex((p) => p.slug === slug);
  if (!page || index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <Shell nav={pageNav("/#projects")}>
      <section className="section">
        <Head level={1} label={page.team} title={`${page.title}.`} sub={page.sub} rotate={-10} />
        <div className="action-row">
          <a className="btn" href={`https://${project.repo}`}>
            <Icon name="github" size={16} /> Code on GitHub
          </a>
          {project.live && (
            <a className="text-link" href={project.live}>
              Live demo <Icon name="arrow" size={15} />
            </a>
          )}
        </div>
        <div className="statement project-problem">
          <p>{page.problem}</p>
        </div>
        <Stats items={page.highlights} />
      </section>

      <section className="section tint-ice">
        <Head label="How it works" title={page.flowTitle} rotate={8} />
        <ol className="flow">
          {page.flow.map((step, n) => (
            <li key={step.title}>
              <span className="flow-num" aria-hidden="true">
                {n + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section">
        <Head label="Tech stack" title="What it's built with." rotate={16} />
        {page.stack.map((group) => (
          <div key={group.group} className="stack-group">
            <div className="subhead">
              <h3>{group.group}</h3>
            </div>
            <dl className="stack-rows">
              {group.items.map(([tech, role]) => (
                <div key={tech}>
                  <dt>{tech}</dt>
                  <dd>{role}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </section>

      {page.gallery && (
        <section className="section tint-lilac">
          <Head label="Screens" title="On screen." rotate={-6} />
          <div className="gallery">
            {page.gallery.map((shot) => (
              <figure key={shot.src} className="chamfer">
                <div className="in">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                  <figcaption>{shot.caption}</figcaption>
                </div>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="section tint-apricot">
        <Head label="My part" title="What I built." rotate={10} />
        <ul className="mine">
          {page.mine.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <div className="project-pager">
          <p className="label">Next project</p>
          <Link className="pager-link" href={`/projects/${next.slug}`}>
            {next.name} <Icon name="arrow" size={28} />
          </Link>
        </div>
      </section>
    </Shell>
  );
}
