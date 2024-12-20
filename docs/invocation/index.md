# Invocation

::: tip Version Info
Documentation for Zsh 5.9 (last updated May 14, 2022)
:::

## Command Line Options

The following flags are interpreted by the shell when invoked to determine where the shell will read commands from:

### Basic Options

| Option | Description |
|--------|-------------|
| `-c` | Take the first argument as a command to execute, rather than reading from a script or standard input. If additional arguments are given, the first one is assigned to `$0`. |
| `-i` | Force shell to be interactive. You can still specify a script to execute. |
| `-s` | Force shell to read commands from standard input. |

### Script Execution

If neither `-c` nor `-s` is supplied and arguments remain after option processing:
- The first argument is taken as the filename of a script containing shell commands
- If `PATH_SCRIPT` option is set and the filename has no directory path (no '/'):
  1. First searches the current directory
  2. Then searches the command path given by `PATH`
- If `PATH_SCRIPT` is not set or filename contains '/', it's used directly

::: warning
Remaining arguments after script name are assigned to positional parameters.
:::

### Emulation Options

The long option `--emulate` can be used to set shell emulation mode:

```bash
zsh --emulate ksh  # Start zsh in ksh emulation mode
```

- Must precede any other options
- Following options are still honored
- Takes extra steps for smooth emulation compared to the `emulate` builtin

### Named Options

Options can be specified by name using `-o`:

```bash
zsh -x -o shwordsplit script.sh
```

- `-o` acts like a single-letter option
- Takes a following string as option name
- Can be turned off using `+o`
- Can be stacked with single-letter options (e.g., `-xoshwordsplit`)

### GNU-style Options

Long options in GNU style are supported:

```bash
zsh --sh-word-split      # Turn on SH_WORD_SPLIT
zsh --no-sh-word-split   # Turn off SH_WORD_SPLIT
```

::: warning
GNU-style options cannot be stacked with other options.
:::

### Special Options

- `--version`: Display shell version and exit
- `--help`: Display help about invocation options and exit

### Ending Option Processing

Option processing can be ended in several ways:

1. Using a lone `-` or `+`
2. Using `--` or `+-`
3. Using `-b` or `+b` (except in sh/ksh emulation)

::: tip
After `-b`, further single-letter options can be stacked and will take effect normally.
:::

## Compatibility

Zsh provides compatibility modes for other shells:

- Emulates `sh` or `ksh` based on invocation name
- Checks first letter (excluding initial 'r'):
  - 'b', 's' → sh emulation
  - 'k' → ksh emulation
- When invoked as `su`, checks `SHELL` environment variable

### Compatibility Mode Changes

In sh/ksh compatibility modes:

1. The following parameters are not special:
   - `ARGC`, `argv`, `cdpath`, `fignore`, `fpath`
   - `HISTCHARS`, `mailpath`, `MANPATH`, `manpath`
   - `path`, `prompt`, `PROMPT`, `PROMPT2`, `PROMPT3`, `PROMPT4`
   - `psvar`, `status`

2. Startup behavior changes:
   - Regular zsh startup/shutdown scripts are not executed
   - Login shells source `/etc/profile` then `$HOME/.profile`
   - If `ENV` is set, it's sourced after profile scripts

::: info
`ENV` value undergoes parameter expansion, command substitution, and arithmetic expansion.
:::

## Restricted Shell

::: warning Deprecation Notice
Restricted shell mode is an outdated security measure. Modern systems should use chroot jails, containers, or zones instead. This feature may be removed in future versions.
:::

Activated when:
- Command name starts with 'r'
- `-r` option is used
- `RESTRICTED` option is set

### Restrictions

In restricted mode, the following are disabled:

1. Directory Operations:
   - Cannot change directories with `cd`

2. Parameter Modifications:
   - Cannot change/unset: `EGID`, `EUID`, `GID`, `HISTFILE`, `HISTSIZE`
   - Cannot modify: `IFS`, `PATH`, `SHELL`, `UID`, `USERNAME`
   - Cannot change library paths (`LD_*` variables)

3. Command Execution:
   - No commands containing '/'
   - No `hash` command pathnames
   - No output redirection to files
   - No `exec` builtin usage
   - No `jobs -Z` to overwrite process space
   - Cannot use `ARGV0` to override `argv[0]`

4. Shell Control:
   - Cannot turn off restricted mode (`set +r` or `unsetopt RESTRICTED`)

::: danger Security Note
Restrictions only apply to the shell itself, not to commands it runs. Carefully consider which commands to allow in restricted environments.
:::