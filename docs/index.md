---
layout: home
title: The Z Shell Manual
titleTemplate: Modern documentation for Zsh

hero:
  name: "The Z Shell"
  text: "A powerful shell for modern systems"
  tagline: A documentation based on the original v5.9 Manual
  actions:
    - theme: brand
      text: Get Started
      link: /introduction/
    - theme: alt
      text: View on GitHub
      link: https://github.com/zsh-users/zsh

features:
  - icon: 🚀
    title: Powerful Shell
    details: Zsh is a UNIX command interpreter (shell) that combines the best features of other shells with innovative new features.
    
  - icon: ⚡️
    title: Enhanced Features
    details: Most closely resembles the Korn shell (ksh) while extending its capabilities with modern features.
    
  - icon: 🛠️
    title: Highly Customizable
    details: Extensive scripting capabilities, programmable command-line completion, and modular design.
    
  - icon: 📚
    title: Rich Documentation
    details: Comprehensive manual covering everything from basic usage to advanced scripting features.
---


This documentation covers Zsh, a freely available UNIX command interpreter (shell). While Zsh most closely resembles the Korn shell (ksh), it includes many enhancements and unique features. Though capable of emulating POSIX shells, its default mode offers extended functionality beyond POSIX compliance.

## About The Original Manual

- **Original Author**: Paul Falstad
- **Current Version**: 5.9
- **Last Updated**: May 14, 2022
- **License**: Permission is granted to:
  - Make and distribute verbatim copies (preserving copyright notice)
  - Distribute modified versions under identical terms
  - Create and distribute translations under the same conditions
- **Source**: [Zsh Manual](https://zsh.sourceforge.io/Doc/Release/)

## Quick Links

- [Introduction](/introduction/) - Get started with Zsh
- [Shell Grammar](/shell-grammar/) - Learn the basic syntax
- [User Guide](/guide/) - Practical usage examples
- [Reference](/reference/) - Complete feature documentation

## Documentation Sections

### Fundamentals
- [Invocation](/invocation/) - Starting and configuring Zsh
- [Shell Grammar](/shell-grammar/) - Basic syntax and command structure
- [Parameters](/parameters/) - Variables and parameter handling
- [Redirection](/redirection/) - Input/output control

### Advanced Features
- [Functions](/functions/) - Shell function definitions
- [Jobs & Signals](/jobs/) - Process management
- [Zsh Line Editor](/zsh-line-editor/) - Command line editing
- [Completion System](/completion-system/) - Programmable completions

### Customization
- [Options](/options/) - Shell behavior configuration
- [Zsh Modules](/zsh-modules/) - Loadable modules
- [User Contributions](/user-contributions/) - Community additions

## Community Resources

- [Mailing Lists](https://zsh.sourceforge.io/Arc/mailing_lists.html)
- [Wiki](https://zsh.sourceforge.io/Wiki/)
- [FAQ](https://zsh.sourceforge.io/FAQ/)

::: info Note
While Zsh can emulate POSIX shells, its default mode includes additional features and may not be fully POSIX-compatible.
:::

::: tip Getting Help
Use `man zsh` for the basic manual or `man zshall` for the complete documentation on your system.
:::