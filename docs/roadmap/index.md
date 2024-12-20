# Roadmap

::: tip Overview
The Zsh Manual, like the shell itself, is extensive and feature-rich. This roadmap provides navigation pointers to help new users find relevant areas of interest.
:::

## When the Shell Starts

When Zsh starts, it reads commands from various configuration files. These files can be customized to suit your needs:

::: info New User Setup
If no personal initialization files exist, Zsh provides a helper function to configure common settings:

```bash
bash
autoload -Uz zsh-newuser-install
zsh-newuser-install -f
```

This feature requires the `zsh/newuser` module to be enabled.
:::

See [Files](/guide/files) for detailed information about configuration files.

## Interactive Use

### Command Line Editor

Zsh includes a built-in line editor (ZLE) with two main editing modes:

- **Emacs Mode** (recommended for beginners)
  ```bash
  bindkey -e  # Enable Emacs mode
  ```
- **Vi Mode**
  ```bash
  bindkey -v  # Enable Vi mode
  ```

See [Zsh Line Editor](/zsh-line-editor/) for complete documentation.

### History Management

Zsh provides command history functionality but requires configuration for persistence:

Key variables:
- `HISTFILE`: Location of history file
- `HISTSIZE`: Number of lines in memory
- `SAVEHIST`: Number of lines to save

::: warning
History saving only works in interactive shells, not in scripts.
:::

### Character Set Support

Zsh supports UTF-8 and other character sets:

- Set `LANG` for global locale settings
- Set `LC_CTYPE` for character handling only
- Enable `COMBINING_CHARS` option for combining characters

## Completion System

Zsh offers two completion systems:

1. **compctl** (legacy)
   - Single command interface
   - Basic functionality

2. **compsys** (recommended)
   - More customizable
   - Extensive command support
   - Function-based architecture

::: tip
The completion system needs explicit activation. See [Completion System](/completion-system/) for setup instructions.
:::

## Line Editor Extensions

ZLE can be extended with various functions:

| Function | Purpose |
|----------|----------|
| `insert-composed-char` | Input special characters |
| `match-words-by-style` | Configure word movement |
| `replace-string` | Global string replacement |
| `edit-command-line` | External editor integration |

See [ZLE Functions](/zsh-line-editor/functions) for more details.

## Pattern Matching

Zsh provides advanced pattern matching features:

### Unique Patterns

```bash
# Match across directories
pat1|pat2 # Alternative patterns
~pat, ^pat # Pattern exclusion (with EXTENDED_GLOB)
(...) # Glob qualifiers for type/attribute matching
```

See [Filename Generation](/pattern-matching/) for complete pattern documentation.

## Syntax Notes

::: warning Important Difference
Unlike other shells, Zsh doesn't automatically split variables into words. Use either:
- Explicit splitting: `${=variable}`
- Arrays for multi-word values
:::

See [Parameter Expansion](/parameters/) for details.

## Programming Features

Zsh favors functions over aliases for extensibility:

### Built-in Utilities

- `promptinit`: Theme system for prompts
- `zsh-mime-setup`: File type handling
- `zcalc`: Command-line calculator
- `zargs`: Enhanced xargs replacement
- `zmv`: Pattern-based file renaming

::: tip Function Autoloading
Most enhancements can be implemented as autoloaded functions. See [Functions](/functions/) for implementation details.
:::

## Further Reading

- [Shell Grammar](/shell-grammar/) - Basic syntax
- [Options](/options/) - Shell behavior configuration
- [User Contributions](/user-contributions/) - Community additions
- [Array Parameters](/parameters/#array-parameters) - Working with arrays