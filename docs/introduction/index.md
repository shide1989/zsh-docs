# Introduction

::: tip Current Version
Zsh 5.9 (Released on May 14, 2022)
:::

Zsh is a UNIX command interpreter (shell) that serves two main purposes:
- An interactive login shell
- A powerful shell script command processor

## Overview

While Zsh shares similarities with other shells, particularly ksh (Korn shell), it stands out with numerous enhancements and unique features. By default, it operates in its own mode rather than strictly adhering to POSIX compatibility.

### Key Features

- Command line editing
- Built-in spelling correction
- Programmable command completion
- Shell functions with autoloading
- Extensive history mechanism
- Floating point arithmetic
- Hash tables and arrays

## Project Information

### Author and Maintenance

- **Original Author**: Paul Falstad
- **Current Maintenance**: zsh-workers mailing list team
- **Project Coordinator**: Peter Stephenson (<pws@zsh.org>)

::: info Contact
For code-related matters, please use the mailing lists rather than contacting the coordinator directly. The coordinator can be reached at <coordinator@zsh.org> for other concerns.
:::

### Availability

You can obtain Zsh from the following official sources:

- **HTTP/FTP Sites**:
  - [https://www.zsh.org/pub/](https://www.zsh.org/pub/)
  - [ftp://ftp.zsh.org/pub/](ftp://ftp.zsh.org/pub/)

- **Source Code**:
  - Latest source code is available via Git from [Sourceforge](https://sourceforge.net/projects/zsh/)
  - Additional information at [zsh.sourceforge.io](https://zsh.sourceforge.io/)

### Community Resources

#### Mailing Lists

Zsh maintains several mailing lists organized in a nested structure:

1. **zsh-announce@zsh.org**
   - Announcements about releases and major changes
   - Monthly FAQ postings
   - *Moderated list*

2. **zsh-users@zsh.org**
   - General user discussions
   - All zsh-announce posts are forwarded here

3. **zsh-workers@zsh.org**
   - Development discussions
   - Bug reports and patches
   - All zsh-users posts are forwarded here

4. **zsh-security@zsh.org** (Private)
   - Security-related bug reports
   - Limited to security discussions

::: warning Mailing List Subscription
You only need to join ONE list as they are nested. All announcements flow through to users, and all user discussions flow through to workers.
:::

To subscribe or unsubscribe, send mail to the appropriate address:
- Subscribe: `<listname>-subscribe@zsh.org`
- Unsubscribe: `<listname>-unsubscribe@zsh.org`

For subscription issues, contact: <listmaster@zsh.org>

#### Documentation

- **FAQ**: 
  - Maintained by Peter Stephenson
  - Available at [www.zsh.org/FAQ/](https://www.zsh.org/FAQ/)
  - Contact: <faqmaster@zsh.org>

- **User Guide**:
  - Complementary to this manual
  - Provides practical explanations and examples
  - Available at [zsh.sourceforge.io/Guide/](https://zsh.sourceforge.io/Guide/)

- **Web Resources**:
  - Official website: [www.zsh.org](https://www.zsh.org/)
  - Mailing list archives: [www.zsh.org/mla/](https://www.zsh.org/mla/)

## Related Documentation

For additional context and comparison, refer to these related shell manuals:
- sh(1)
- csh(1)
- tcsh(1)
- rc(1)
- bash(1)
- ksh(1)

::: info Standards
For POSIX compliance information, refer to:
IEEE Standard for Information Technology - Portable Operating System Interface (POSIX) - Part 2: Shell and Utilities, IEEE Inc, 1993, ISBN 1-55937-255-9.
:::