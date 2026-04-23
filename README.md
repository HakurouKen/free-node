# free-node

![GitHub stars](https://img.shields.io/github/stars/HakurouKen/free-node?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/HakurouKen/free-node?style=flat-square)
![License](https://img.shields.io/github/license/HakurouKen/free-node?style=flat-square)

A lightweight repository that collects public V2Ray style nodes and publishes ready-to-use subscription files.

## Table of Contents
- [Overview](#overview)
- [Subscription URLs](#subscription-urls)
- [How It Works](#how-it-works)
- [Use Locally](#use-locally)
- [Project Structure](#project-structure)
- [Notes](#notes)
- [License](#license)

## Overview

`free-node` is a small automation project for users who want a single place to fetch public V2Ray node collections.
The repository appears to refresh subscriptions through GitHub Actions and keeps the generated assets in version control.

## Subscription URLs

Import the generated subscription into your client of choice:

- Main branch file: `https://raw.githubusercontent.com/HakurouKen/free-node/main/public`

If you prefer to inspect the generated content before importing it, review the repository history and workflow first.

## How It Works

From the current repository layout, the project is organized around a Node.js based pipeline:

- `lib/node-collections.js` collects upstream node sources
- `lib/speed-test.mjs` filters or scores nodes
- `lib/index.mjs` coordinates the update flow
- `.github/workflows/main.yml` automates scheduled refreshes
- `public` stores the published output

## Use Locally

### Prerequisites

- Node.js 18+
- pnpm

### Install

```bash
pnpm install
```

### Run the pipeline

Review `package.json` first, then run the relevant script locally, for example:

```bash
pnpm run start
```

If you only want the generated subscription, you can skip local setup and consume the published file directly.

## Project Structure

```text
.
├── .github/workflows/main.yml
├── lib/
│   ├── index.mjs
│   ├── node-collections.js
│   ├── speed-test.mjs
│   └── utils.mjs
├── package.json
└── public
```

## Notes

- This repository indexes public node information from the internet. Review the origin, legality, and safety of any endpoint before using it.
- Public nodes are often unstable and may disappear without notice.
- If maintainers want, a future README pass could also document update frequency and source policy.

## License

This project is released under the MIT License.
