# Command Execution

::: tip Version Info
Documentation for Zsh 5.9 (last updated May 14, 2022)
:::

## Command Resolution Order

When a command name contains no slashes, Zsh follows this resolution order:

1. **Shell Functions**: If a function exists with that name
2. **Shell Builtins**: If a builtin exists with that name
3. **External Commands**: Search in `$path` for an executable

```bash
# Example resolution
function ls { echo "function ls"; }
ls              # Calls function
command ls      # Bypasses function, calls external
\ls             # Escapes function, calls external
```

## External Command Search

For commands without slashes, the shell searches each directory in `$path`:

```bash
# Example PATH search
echo $path
# Output: /usr/local/bin /usr/bin /bin

# Search order for 'python':
# 1. /usr/local/bin/python
# 2. /usr/bin/python
# 3. /bin/python
```

## Execution Failures

When execution fails, the shell returns specific error codes:

| Error Code | Description |
|------------|-------------|
| 127 | Command not found ('command not found: cmd') |
| 126 | Insufficient permissions, is directory/special file, or unrecognized format |

```bash
# Examples
nonexistent_cmd    # Returns 127
chmod 000 script.sh
./script.sh        # Returns 126
```

## Script Execution

If a file is not in executable format (and not a directory), Zsh:

1. Assumes it's a shell script
2. Spawns `/bin/sh` to execute it

### Shebang Handling

For files beginning with `#!`:

```bash
#!/bin/bash
echo "This script runs with bash"
```

::: info Interpreter Resolution
- First line specifies interpreter
- Shell executes specified interpreter
- Kernel handles execution on supported systems
:::

## Command Not Found Handler

```bash
# Define handler function
command_not_found_handler() {
    echo "Command not found: $1"
    echo "Arguments: ${@:2}"
    return 127
}
```

::: warning Handler Limitations
The handler:
- Runs in a subshell
- Cannot affect main shell environment
- Changes to directories/parameters are isolated
:::

## Command Search Optimization

### Command Hash Table

```bash
# View current hash table
hash
# Output: hash -d
# /usr/bin/ls=ls
# /usr/bin/git=git

# Add command to hash table
hash git=/usr/local/bin/git

# Clear hash table
hash -r

# Remove specific entry
hash -d ls
```

::: tip Performance
The hash table speeds up command lookup by caching paths of previously executed commands.
:::

### Path Search Rules

```bash
# Command with slash - direct execution
./script.sh     # Current directory
../bin/tool    # Relative path
/usr/bin/python # Absolute path

# Command without slash - PATH search
python         # Searches each directory in $path
```

## Command Execution Environment

### Variable Inheritance

```bash
# Local variable - not inherited
local_var="local"
bash -c 'echo $local_var'  # Empty output

# Export variable - inherited
export PATH="/custom/path:$PATH"
bash -c 'echo $PATH'       # Shows modified PATH
```

### Function Export

```bash
# Export function to subshells
export -f my_function

# Check exported functions
export -f

# Remove function export
export -fn my_function
```

## Execution Contexts

### Subshell Execution

```bash
# Command group in subshell
(cd /tmp && ls)  # Directory change isolated
echo $PWD        # Original directory unchanged

# Process substitution
diff <(ls dir1) <(ls dir2)
```

::: warning Subshell Limitations
- Cannot modify parent shell environment
- Slower than current shell execution
- Creates new process
:::

### Current Shell Execution

```bash
# Command group in current shell
{ cd /tmp && ls; }  # Directory change affects current shell
echo $PWD           # Shows /tmp

# Source script
. ./script.sh       # Execute in current shell
source script.sh    # Alternative syntax
```

## Error Recovery

### Trap Handling

```bash
# Set up error trap
trap 'echo "Command failed: $BASH_COMMAND"' ERR

# Clean up on exit
trap 'rm -f /tmp/tempfile' EXIT

# Ignore signals
trap '' INT QUIT
```

### Debug Mode

```bash
# Enable command tracing
set -x
command1
command2
set +x

# Debug specific command
zsh -x script.sh

# Debug and show line numbers
PS4='+${BASH_SOURCE}:${LINENO}:' zsh -x script.sh
```

## Best Practices

### Command Location

```bash
# Find command location
which command_name    # Simple path search
whence -v command_name # Detailed command information
type command_name     # Show command type
```

### Performance Considerations

```bash
# Cache command locations
hash command_name     # Add to hash table
rehash               # Rebuild command hash table
```

### Security

::: danger Security Note
When executing commands:
- Always validate input paths
- Be cautious with command substitution
- Consider using absolute paths for critical commands
:::

### Debugging

```bash
# Debug command execution
setopt xtrace        # Show commands as they execute
set -x              # Same as above
zsh -x script.sh    # Debug entire script
```

::: tip Troubleshooting
Common issues:
- PATH not set correctly
- Insufficient permissions
- Missing dependencies
- Binary format incompatibility
:::