# Files

::: tip Version Info
Documentation for Zsh 5.9 (last updated May 14, 2022)
:::

## Startup/Shutdown Files

### System-wide Files

| File | Description |
|------|-------------|
| `/etc/zshenv` | Always run for every zsh |
| `/etc/zprofile` | Run for login shells |
| `/etc/zshrc` | Run for interactive shells |
| `/etc/zlogin` | Run for login shells |
| `/etc/zlogout` | Run for login shells when exiting |

### User-specific Files

| File | Description |
|------|-------------|
| `~/.zshenv` | Always run for every zsh |
| `~/.zprofile` | Run for login shells |
| `~/.zshrc` | Run for interactive shells |
| `~/.zlogin` | Run for login shells |
| `~/.zlogout` | Run for login shells when exiting |

::: warning Order of Operations
Files are sourced in the following order:
1. zshenv
2. zprofile
3. zshrc
4. zlogin

And on exit:
1. zlogout
:::

## File Locations

### Default Paths

The following paths are used by default:

```bash
ZDOTDIR=$HOME
HELPDIR=/usr/local/share/zsh/$ZSH_VERSION/help
```

::: tip Environment Variables
If `ZDOTDIR` is set, it overrides `$HOME` for locating user-specific files.
:::

### Functions Directory

Function files are searched in directories specified in `$fpath`:

```bash
fpath=(
    /usr/local/share/zsh/$ZSH_VERSION/functions
    /usr/local/share/zsh/site-functions
    $fpath
)
```

## Configuration Files

### Login Shell Files

Login shells source these files in order:
1. `/etc/zprofile`
2. `$ZDOTDIR/.zprofile`
3. `/etc/zlogin`
4. `$ZDOTDIR/.zlogin`

::: info Login Shell Detection
A shell is considered a login shell if:
- Started with argument 0 containing `-`
- Invoked with the `-l` flag
:::

### Interactive Shell Files

Interactive shells read:
1. `/etc/zshrc`
2. `$ZDOTDIR/.zshrc`

::: tip Interactive Shell Detection
A shell is interactive if:
- Started without scripts or commands to execute
- Started with the `-i` flag
- Has the `interactive` option set
:::

## Environment Variables

### Important Variables

| Variable | Description |
|----------|-------------|
| `ZDOTDIR` | Location of personal initialization files |
| `HELPDIR` | Location of help files |
| `MODULE_PATH` | Directories to search for dynamically loadable modules |
| `fpath` | Function search path |
| `PATH` | Command search path |

### Module-specific Variables

```bash
# Example module paths
MODULE_PATH=/usr/local/lib/zsh/$ZSH_VERSION
MODULE_PATH=$MODULE_PATH:/usr/local/lib/zsh/site-functions
```

## Special Files

### Help Files

Help files are searched in `$HELPDIR`:
- Format: `<command>.md` or `<command>`
- Used by the `run-help` function

### Function Files

Function files can have various extensions:
- `.zwc`: Compiled function file
- No extension: Plain function file

::: tip Performance
Functions can be compiled for faster loading:
```bash
zcompile ~/.zshrc
zcompile ~/.zsh/functions/*
```
:::

## Security Considerations

::: danger Security Note
Always verify the contents of initialization files, especially in shared environments.
:::

### File Permissions

Recommended permissions:
- Personal files: `600` or `644`
- System files: `644` or `755`
- Directories: `755`

### Environment Inheritance

::: warning
Be cautious with inherited environment variables, especially in:
- Shared systems
- When running with elevated privileges
:::

## Debugging

For startup file debugging:

```bash
zsh -x        # Show execution trace
zsh -v        # Show input lines
zsh -i -v -x  # Combine for detailed debugging
```

::: tip Troubleshooting
To identify which files are being sourced:
```bash
zsh -o sourcetrace
```
:::