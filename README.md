# Modern Zsh Documentation

This repository is an attempt to create a modern, user-friendly documentation site for the Z Shell (Zsh), built with VitePress.

## Overview

This project provides comprehensive, well-organized documentation for the Z Shell, making it easier for both newcomers and experienced users to learn and reference Zsh features.

## Features

- 📚 Comprehensive coverage of Zsh functionality
- 🎯 Clear, organized navigation structure
- ⚡️ Fast, modern documentation site built with VitePress
- 🔍 Full-text search capability with local search provider
- 📱 Mobile-friendly responsive design
- 🔄 Version-aware documentation with last updated timestamps
- 📑 Multi-level navigation with organized sections

## Tech Stack

- **Framework**: VitePress 1.5+
- **Language**: TypeScript
- **Build System**: Vite
- **Search**: Local search implementation
- **Deployment**: Static site generation

## Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd zsh-docs
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run docs:dev
```

4. Build for production:
```bash
npm run docs:build
```

5. Preview production build:
```bash
npm run docs:preview
```

## Documentation Structure

```
docs/
├── .vitepress/
│   └── config.mts    # VitePress configuration
├── introduction/     # Getting started guides
├── shell-grammar/    # Core syntax documentation
├── parameters/       # Parameter handling
├── expansion/        # Expansion rules
├── redirection/      # I/O redirection
└── ...              # Additional documentation sections
```

## Contributing

We welcome contributions to improve the Zsh documentation! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

## Acknowledgments

- Original Zsh documentation by Paul Falstad
- Zsh Contributors and Maintainers
- VitePress Team for the documentation framework

## Community & Support

- [Report a bug](https://github.com/your-repo/zsh-docs/issues)
- [Request a feature](https://github.com/your-repo/zsh-docs/issues)
- [Join our discussions](https://github.com/your-repo/zsh-docs/discussions)