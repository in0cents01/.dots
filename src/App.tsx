import { useEffect, useState } from "react";

const projects = [
  {
    name: "kestrel",
    type: "tiny task runner",
    description:
      "A minimal job queue with a single binary, a tiny API, and Postgres as the only dependency.",
    tags: ["go", "postgres", "redis"],
    status: "live",
  },
  {
    name: "lumen",
    type: "markdown notebooks",
    description:
      "A local-first notebook for technical writing. Renders markdown, runs code blocks, and stores everything as plain files.",
    tags: ["typescript", "react", "tauri"],
    status: "wip",
  },
  {
    name: "driftwood",
    type: "static site generator",
    description:
      "A zero-config static site generator that compiles a folder of markdown into a fast, accessible site in under 200ms.",
    tags: ["rust", "mdx"],
    status: "live",
  },
  {
    name: "porthole",
    type: "local tunnel",
    description:
      "Expose a local dev server to the internet with a single command. Self-hostable relay, no account required.",
    tags: ["go", "websocket"],
    status: "archived",
    featured: true,
  },
];

const navItems = ["about", "projects", "contact"] as const;

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-title">
      <h2>
        <span>$</span> cat ~/{children}
      </h2>
      <div className="section-line" />
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.05, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("hello@alexmorgan.dev").catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="site-frame">
      <header className="topbar">
        <a href="#top" className="brand" aria-label="Back to top">
          <span className="status-dot" />
          portfolio
        </a>
        <nav aria-label="Main navigation">
          {navItems.map((item) => (
            <a href={`#${item}`} className={activeSection === item ? "active" : ""} key={item}>
              ~/{item}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero grid-bg" id="top">
          <div className="hero-content">
            <p className="eyebrow">
              <span className="status-dot" /> hello, world
            </p>
            <h1>
              i build <span>software</span>
              <br />
              that stays out of the way.
            </h1>
            <p className="hero-subtitle">
              software engineer · distributed systems · developer
              <br className="desktop-break" /> tooling · clean UI
            </p>

            <div className="terminal">
              <div className="terminal-bar">
                <div className="window-controls" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
                <span>~/portfolio — zsh</span>
              </div>
              <div className="terminal-body">
                <div className="command">
                  <p>
                    <b>$</b> whoami
                  </p>
                  <div>a software engineer who likes simple, durable things.</div>
                </div>
                <div className="command">
                  <p>
                    <b>$</b> cat focus.txt
                  </p>
                  <div>distributed systems · developer tooling · clean UI</div>
                </div>
                <div className="command">
                  <p>
                    <b>$</b> ls skills/
                  </p>
                  <div>typescript go postgres react rust node</div>
                </div>
                <div className="command">
                  <p>
                    <b>$</b> ./say_hello.sh
                  </p>
                  <div>thanks for stopping by — scroll down to see my work.</div>
                </div>
                <p className="prompt">
                  <b>$</b> <i className="cursor" />
                </p>
              </div>
            </div>
            <a href="#about" className="scroll-cue">
              scroll <span>↓</span>
            </a>
          </div>
        </section>

        <section className="section grid-bg" id="about">
          <SectionTitle>about</SectionTitle>
          <div className="about-grid">
            <div className="about-copy">
              <p>
                I&apos;m a software engineer based in <em>somewhere on the internet</em>. I care
                about systems that stay simple as they grow, interfaces that get out of the way, and
                code that reads like it was written for a friend.
              </p>
              <p>
                Lately I&apos;ve been building developer tooling and small distributed services.
                Before that I worked on data pipelines and a handful of side projects that never
                quite got the landing page they deserved.
              </p>
              <p>
                When I&apos;m not at the keyboard you can find me reading sci-fi, over-engineering
                my dotfiles, or trying to convince people that monospace fonts are a lifestyle.
              </p>
              <p className="comment">// currently</p>
              <pre>
                <code>
                  <span>const</span> now = {"{\n"}
                  {"  "}role: <b>&quot;software engineer&quot;</b>,{"\n"}
                  {"  "}stack: [<b>&quot;ts&quot;</b>, <b>&quot;go&quot;</b>,{" "}
                  <b>&quot;postgres&quot;</b>, <b>&quot;rust&quot;</b>],{"\n"}
                  {"  "}status: <b>&quot;open to interesting work&quot;</b>,{"\n"}
                  {"  "}location: <b>&quot;remote&quot;</b>,{"\n"}
                  {"}"}
                </code>
              </pre>
            </div>
            <aside className="stats">
              <p className="comment">// stats</p>
              <div className="stat-card">
                <strong>8+</strong>
                <span>years writing code</span>
              </div>
              <div className="stat-card">
                <strong>40+</strong>
                <span>repos shipped</span>
              </div>
              <div className="stat-card">
                <strong>3</strong>
                <span>coffee/day</span>
              </div>
            </aside>
          </div>
        </section>

        <section className="section projects-section grid-bg" id="projects">
          <SectionTitle>projects</SectionTitle>
          <p className="section-intro">
            // a selection of things i&apos;ve built. run <span>ls -la</span> for the rest.
          </p>
          <div className="project-grid">
            {projects.map((project) => (
              <a
                href="#contact"
                className={`project-card${project.featured ? " featured" : ""}`}
                key={project.name}
              >
                <div className="project-head">
                  <h3>{project.name}</h3>
                  <div>
                    <span className={`badge ${project.status}`}>{project.status}</span>
                    <span className="arrow">↗</span>
                  </div>
                </div>
                <p className="project-type">— {project.type}</p>
                <p className="project-description">{project.description}</p>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="section contact-section grid-bg" id="contact">
          <SectionTitle>contact</SectionTitle>
          <div className="contact-grid">
            <div>
              <p className="contact-lead">
                Open to interesting work, side-project collaborations, and the occasional good book
                recommendation.
              </p>
              <p className="comment">// i read everything. replies usually within a day or two.</p>
              <button type="button" className="email-button" onClick={copyEmail} aria-live="polite">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 6.5h18v12H3zM3.5 7l8.5 7 8.5-7" />
                </svg>
                {copied ? "copied to clipboard" : "hello@alexmorgan.dev"}
                <svg className="copy-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="8" y="8" width="11" height="11" rx="2" />
                  <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
                </svg>
              </button>
            </div>
            <div className="socials">
              <p className="comment">// elsewhere</p>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <span>⌘ &nbsp; github</span>
                <small>@alexmorgan</small>
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer">
                <span>𝕏 &nbsp; twitter</span>
                <small>@alexmorgan</small>
              </a>
              <a href="mailto:hello@alexmorgan.dev">
                <span>✉ &nbsp; email</span>
                <small>hello@alexmorgan.dev</small>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>© 2026 — built with care, not frameworks-of-the-week.</span>
        <span className="system-status">
          <i className="status-dot" /> all systems nominal
        </span>
      </footer>
    </div>
  );
}
 

export default App;
