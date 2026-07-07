# Stack Card Specification v0.1.0

**Status:** Draft  
**Date:** 2026-07-06  
**Authors:** Sumera  

## 1. Overview

A Stack Card is a standardized document accompanying a software project that provides:
- **Benchmarked transparency** into the project's technology stack, exact versions, and dependencies
- **Contextual metadata** about intended use, out-of-scope applications, and known limitations
- **Ethical and safety boundaries** relevant to the project's domain
- **Proactive alerting** for vulnerabilities, deprecations, and breaking changes affecting the disclosed versions

Stack Cards are designed for **human readability first, machine readability second**. They are intended for creators, deployers, stakeholders, and impacted individuals—not just auditors and security scanners.

## 2. Design Principles

1. **Complement, don't replace.** A Stack Card links to an SBOM (for exhaustive dependency enumeration) and coexists with a README (for freeform narrative). It does not duplicate their functions.
2. **Creator-centric.** The primary audience is the person who built or deployed the project, who may not have formal software engineering training.
3. **Decision-oriented.** Every section should help a stakeholder answer: "Should I use this? Is it safe? What could go wrong?"
4. **Version-locked.** All technology disclosures include exact versions, not vague ranges (e.g., "React 18.2.0" not "React 18+").
5. **Living document.** Stack Cards are updated when the stack changes, when new vulnerabilities are discovered, or when intended use evolves.

## 3. Schema

The machine-readable representation is a JSON document conforming to [schema/stack-card-v0.1.json](./schema/stack-card-v0.1.json). The human-readable representation is a Markdown document generated from the JSON via [templates/default.md](./templates/default.md).

### 3.1 Top-Level Structure

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `stack_card_version` | Yes | string | Spec version (e.g., "0.1.0") |
| `project` | Yes | object | Project identity metadata |
| `intended_use` | Yes | object | Use cases, users, and boundaries |
| `stack` | Yes | array | Technology layers and versions |
| `dependencies` | No | object | Dependency summary and SBOM link |
| `security` | No | object | Security posture and caveats |
| `ethical_considerations` | No | object | Ethical analysis (mirrors Model Cards) |
| `caveats` | No | array | Additional concerns and recommendations |
| `alerts` | No | array | Active vulnerability/deprecation notices |

### 3.2 Project Section

```json
{
  "name": "MoodJournal",
  "version": "1.0.0",
  "date_created": "2026-07-01",
  "date_updated": "2026-07-06",
  "authors": ["Jane Doe"],
  "repository_url": "https://github.com/janedoe/moodjournal",
  "license": "MIT",
  "contact": "jane@example.com"
}
```

### 3.3 Intended Use Section

```json
{
  "primary_use": "Personal mood tracking with AI-generated insights",
  "intended_users": "Individual users tracking daily emotional states",
  "out_of_scope": [
    "Clinical mental health diagnosis",
    "Multi-user or enterprise deployment",
    "HIPAA-compliant medical data storage"
  ]
}
```

**Rationale:** Explicit out-of-scope declarations prevent misuse and set legal/ethical boundaries. Inspired by Model Cards' "Out-of-scope uses" and warning labels on consumer products.

### 3.4 Stack Section

The `stack` array lists technology layers. Each entry must include:

```json
{
  "layer": "frontend",
  "technology": "Next.js",
  "version": "14.2.0",
  "source_file": "package.json",
  "notes": "App Router enabled"
}
```

**Layer categories (extensible):** `frontend`, `backend`, `database`, `auth`, `hosting`, `ai_model`, `other`

**Rationale:** Exact versions enable precise vulnerability correlation. Source file attribution allows verification.

### 3.5 Dependencies Section

```json
{
  "direct_count": 47,
  "transitive_count": 1203,
  "sbom_reference": "https://github.com/janedoe/moodjournal/blob/main/sbom.json"
}
```

**Rationale:** Stack Cards do not enumerate all dependencies (that's the SBOM's job). They provide a summary and a link.

### 3.6 Security Section

```json
{
  "environment_variables_required": [
    "OPENAI_API_KEY",
    "NEXT_PUBLIC_CLERK_KEY",
    "SUPABASE_URL"
  ],
  "data_handling": "Stores user journal entries; encrypted at rest via Supabase",
  "authentication_method": "Clerk (OAuth + magic links); no password hashing in-app",
  "known_caveats": [
    "No rate limiting on AI insights endpoint",
    "No automated backups configured"
  ]
}
```

### 3.7 Ethical Considerations Section

Mirrors the Model Cards framework:

```json
{
  "uses_sensitive_data": true,
  "impacts_human_life": false,
  "mitigations": [
    "Data encrypted at rest",
    "Users can delete all data via settings"
  ],
  "risks_and_harms": "AI insights may be inaccurate or harmful if used for mental health decisions. Not a substitute for professional care."
}
```

### 3.8 Alerts Section

Populated by a scanning service, not manually:

```json
[
  {
    "type": "vulnerability",
    "severity": "medium",
    "affected_technology": "semver",
    "affected_version": "< 7.5.2",
    "description": "ReDoS in range parsing",
    "remediation": "Upgrade to semver 7.5.2 or later",
    "date_detected": "2026-07-05"
  }
]
```

**Alert types:** `vulnerability`, `deprecation`, `breaking_change`
**Severities:** `critical`, `high`, `medium`, `low`

## 4. Relationship to Existing Tools

| Tool | Purpose | Stack Card Relationship |
|------|---------|------------------------|
| **SBOM** (SPDX/CycloneDX) | Exhaustive machine-readable dependency enumeration | Stack Card links to SBOM; does not duplicate |
| **README** | Freeform project narrative and setup instructions | Stack Card coexists; README is unstructured, Stack Card is standardized |
| **Dependabot / Snyk** | Automated vulnerability scanning and PR generation | Stack Card displays alerts in human-readable context |
| **Model Cards** | ML model transparency | Stack Cards extend the same philosophy to software stacks |

## 5. Versioning

This specification follows [SemVer](https://semver.org/):
- **MAJOR:** Breaking schema changes
- **MINOR:** New sections or fields (backward compatible)
- **PATCH:** Clarifications, examples, typo fixes

## 6. Future Work

- `performance` section: expected load, latency, resource requirements
- `accessibility` section: WCAG compliance, known gaps
- `deployment` section: hosting region, CDN, environment details
- `changelog` section: version history of the Stack Card itself
- Multi-language template support

## 7. References

- Mitchell, M., et al. (2019). Model Cards for Model Reporting. *FAT* '19*.
- Gebru, T., et al. (2018). Datasheets for Datasets. *arXiv:1803.09010*.
