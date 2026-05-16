# Contributing to PixelPerfect

Thank you for your interest in contributing to **PixelPerfect**! 🎉  
All contributions — bug fixes, new features, docs improvements, and more — are welcome.

---

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)
- [Commit Message Format](#commit-message-format)

---

## Getting Started

### Prerequisites
- Node.js `v18+`
- npm `v9+`
- Git

### Fork & Clone

```bash
# 1. Fork the repo on GitHub, then:
git clone https://github.com/YOUR_USERNAME/image-optimizer.git
cd image-optimizer

# 2. Install dependencies
npm install

# 3. Create a feature branch
git checkout -b feature/your-feature-name

# 4. Start dev server
npm run dev
```

---

## Development Workflow

```
src/
├── app/            → Page layout & global styles
├── components/     → All React UI components
└── lib/            → Pure logic (image processing)
```

- **Components** go in `src/components/` as `.jsx` files
- **Processing logic** goes in `src/lib/imageProcessor.js`
- **Styles** go in `src/app/globals.css` using CSS custom properties

---

## Code Style

- Use **functional components** with hooks (no class components)
- Use **inline styles** for layout-critical CSS, CSS classes for reusable styles
- Add `onMouseDown={e => e.preventDefault()}` to all buttons that shouldn't steal input focus
- Use **Framer Motion** for all animations (`motion.button`, `motion.div`)
- Keep components **under 300 lines** — split if larger

---

## Submitting a Pull Request

1. **Ensure your branch is up to date:**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Test your changes:**
   ```bash
   npm run build   # must pass with no errors
   npm run lint    # must pass with no warnings
   ```

3. **Push and open a PR:**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then go to GitHub and click **"New Pull Request"**.

4. **Fill out the PR template** — describe what changed and why.

---

## Reporting Bugs

Use the **Bug Report** issue template on GitHub.  
Please include:
- Steps to reproduce
- Expected vs actual behavior
- Browser & OS version
- Screenshot or screen recording if possible

---

## Requesting Features

Use the **Feature Request** issue template on GitHub.  
Please include:
- What problem this solves
- How you imagine it working
- Any examples or references

---

## Commit Message Format

Use the following prefix convention:

| Prefix | When to use |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `style:` | Formatting, no logic change |
| `refactor:` | Code restructure, no feature change |
| `perf:` | Performance improvement |
| `chore:` | Build scripts, config, dependencies |

**Examples:**
```
feat: add HEIC format support
fix: unit conversion rounding on blur
docs: update README with deploy guide
```

---

Thank you for helping make PixelPerfect better! 💜
