# Stack Cards 🗂️

> Standardized, human-readable transparency for full-stack software projects.
> Inspired by [Model Cards](https://arxiv.org/abs/1810.03993) for ML models.

[![Spec Version](https://img.shields.io/badge/spec-v0.1.0-blue)](./SPEC.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## The Problem

With the rise of AI-assisted "vibe coding," millions of creators ship full-stack applications without knowing:
- Which exact versions of React, Node, or their database they are running
- What 1,200+ transitive dependencies are buried in their lockfile
- Whether a critical CVE announced yesterday affects their specific stack
- What their project was *intended* for — and who should *not* use it

SBOMs are machine-readable compliance artifacts for auditors. READMEs are freeform, non-standardized, and empirically decayed. Neither answers: **"What was this built for? Who should not use it? What could go wrong?"**

## What is a Stack Card?

A Stack Card is a short, standardized document that accompanies a software project — like a nutritional label for your codebase. It discloses:

- **Project identity** — name, version, authors, license
- **Intended use** — what it was built for, who should use it, what is out of scope
- **Stack composition** — exact technologies and versions, layer by layer
- **Security posture** — environment variables, auth methods, data handling, known caveats
- **Ethical considerations** — sensitive data, human impact, risks, mitigations
- **Active alerts** — vulnerabilities, deprecations, or breaking changes affecting your versions

**Stack Cards complement SBOMs and READMEs; they do not replace them.** A Stack Card links to your SBOM for exhaustive dependency enumeration, while surfacing the contextual, ethical, and safety information that creators actually need.

## Quick Example

```markdown
# Stack Card: MoodJournal

**Version:** 1.0.0 | **Date:** 2026-07-06

## Intended Use
- **Primary use:** Personal mood tracking with AI-generated insights
- **Intended users:** Individual users tracking daily emotional states
- **Out of scope:** Clinical mental health diagnosis, multi-user deployment, HIPAA compliance

## Stack Composition
| Layer | Technology | Version | Source |
|-------|-----------|---------|--------|
| Frontend | Next.js | 14.2.0 | package.json |
| Styling | Tailwind CSS | 3.4.0 | package.json |
| Backend | Next.js API Routes | 14.2.0 | package.json |
| Database | Supabase (PostgreSQL) | — | supabase/config.toml |
| Auth | Clerk | 4.29.0 | package.json |
| AI | OpenAI GPT-4o | API | .env |

## Security
- **Env vars required:** OPENAI_API_KEY, NEXT_PUBLIC_CLERK_KEY, SUPABASE_URL
- **Data handling:** Stores user journal entries; encrypted at rest via Supabase
- **Auth:** Clerk (OAuth + magic links); no password hashing in-app
- **Known caveats:** No rate limiting on AI insights endpoint; no automated backups

## Ethical Considerations
- **Sensitive data:** Yes — personal journal entries
- **Human impact:** Low for intended use; NOT for clinical diagnosis
- **Mitigations:** Data encrypted at rest; users can delete all data
- **Risks:** AI insights may be inaccurate or harmful if used for mental health decisions

## Active Alerts
| Type | Severity | Technology | Description |
|------|----------|------------|-------------|
| Vulnerability | Medium | semver | < 7.5.2 — ReDoS in range parsing |
```

## Repository Structure

```
stack-cards/
├── SPEC.md                  # Human-readable specification (v0.1)
├── schema/
│   └── stack-card-v0.1.json # JSON Schema for validation
├── templates/
│   └── default.md           # Default Markdown template
├── examples/                # Example Stack Cards for real projects
├── cli/                     # CLI tool for auto-generation (Phase 2)
└── README.md                # This file
```

## The Spec

- **[SPEC.md](./SPEC.md)** — The full Stack Card specification v0.1
- **[schema/stack-card-v0.1.json](./schema/stack-card-v0.1.json)** — JSON Schema for machine validation
- **[templates/default.md](./templates/default.md)** — Markdown template for human reading

## Roadmap

| Phase | Status | Description |
|-------|--------|-------------|
| **0** | ✅ Done | Literature review & gap analysis |
| **1** | 🔄 Now | Spec v0.1 + schema + template |
| **2** | 📋 Next | Minimal CLI for auto-generation from repos |
| **3** | 📋 Planned | Real-world evaluation with vibe coders |
| **4** | 📋 Planned | Paper submission (NIER / ICSE) + arXiv |
| **5** | 📋 Planned | Registry + proactive alerting service |

## Contributing

This is an early-stage research project. We welcome:
- Feedback on the schema and template
- Example Stack Cards for your own projects
- Suggestions for the CLI tool
- Citations and connections to related work

Open an issue or reach out: [your-email or Twitter handle]

## Citation

If you use Stack Cards in your research or project, please cite:

```bibtex
@article{yourname2026stackcards,
  title={Stack Cards: Standardized Transparency for Full-Stack Software Projects},
  author={[Your Name]},
  journal={arXiv preprint},
  year={2026}
}
```

## License

MIT License — see [LICENSE](./LICENSE) for details.

## Acknowledgments

Inspired by [Model Cards for Model Reporting](https://arxiv.org/abs/1810.03993) (Mitchell et al., 2019) and [Datasheets for Datasets](https://arxiv.org/abs/1803.09010) (Gebru et al., 2018).
