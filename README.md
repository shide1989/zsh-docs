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

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Original Zsh documentation by Paul Falstad
- Zsh Contributors and Maintainers
- VitePress Team for the documentation framework