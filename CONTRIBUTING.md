# Contributing to Modern Zsh Documentation

Thank you for your interest in contributing to the Modern Zsh Documentation project! This document provides guidelines and information to help you contribute effectively.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct (we value a respectful, inclusive, and harassment-free environment).

## How Can I Contribute?

### Documentation Improvements

- Fix typos or clarify existing documentation
- Add missing documentation for Zsh features
- Improve examples and use cases
- Add cross-references between related topics
- Translate documentation (if applicable)

### Technical Contributions

- Improve site performance
- Enhance search functionality
- Add new features to the documentation platform
- Fix bugs in the VitePress implementation

## Getting Started

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/your-username/zsh-docs.git
cd zsh-docs
```

3. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

4. Make your changes and test locally:
```bash
npm install
npm run docs:dev
```

## Submission Guidelines

### Pull Requests

1. Ensure your PR addresses an existing issue or clearly describes the problem it solves
2. Update relevant documentation
3. Follow the existing code style
4. Include meaningful commit messages
5. Test your changes locally

### Commit Messages

Follow conventional commits format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `docs`: Documentation changes
- `feat`: New features
- `fix`: Bug fixes
- `style`: Formatting changes
- `refactor`: Code refactoring
- `test`: Adding or modifying tests

### Documentation Style Guide

- Use clear, concise language
- Include practical examples
- Follow Markdown best practices
- Maintain consistent formatting
- Link to related documentation when relevant

## File Structure

```
docs/
├── .vitepress/
│   └── config.mts    # VitePress configuration
├── introduction/     # Getting started guides
├── shell-grammar/    # Core syntax documentation
└── ...              # Other documentation sections
```

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run docs:dev
```

3. Build documentation:
```bash
npm run docs:build
```

## Writing Documentation

### File Format
- Use Markdown files with `.md` extension
- Include front matter for page metadata
- Follow the established directory structure

### Content Guidelines
- Start with a clear introduction
- Use headings to organize content
- Include code examples when relevant
- Add tips and warnings using VitePress containers
- Cross-reference related documentation

Example:
```markdown
---
title: Feature Name
description: Brief description
---

# Feature Name

Brief introduction...

## Usage

Basic usage example...

::: tip
Helpful tip about the feature
:::

## Advanced Topics

More detailed information...
```

## Need Help?

- Check existing issues and pull requests
- Join our community discussions
- Create a new issue for questions

## Additional Notes

- For significant changes, please open an issue first
- Keep pull requests focused on a single topic
- Review our [Code of Conduct](CODE_OF_CONDUCT.md)

## Recognition

Contributors will be acknowledged in:
- The project's README
- Our contributors page
- Release notes when applicable

Thank you for contributing to Modern Zsh Documentation!