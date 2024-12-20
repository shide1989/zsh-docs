# Command Execution

::: tip Version Info
Documentation for Zsh 5.9 (last updated May 14, 2022)
:::

## Command Resolution

When executing a command, Zsh follows a specific order to resolve and execute commands:

1. **Functions**: If a shell function exists with the command name
2. **Builtins**: If a shell builtin exists with the command name
3. **External Commands**: Search in `$path` for executable files

```bash
# Example of resolution order
function ls { echo "function ls called"; }
ls              # Calls the function
command ls      # Bypasses function, calls builtin/external
\ls             # Escapes function, calls builtin/external
```

## External Command Search

For commands without slashes, the shell searches each directory in `$path`:

```bash
# Example PATH search
echo $path
# Output: /usr/local/bin /usr/bin /bin

# Search order for 'command':
# 1. /usr/local/bin/command
# 2. /usr/bin/command
# 3. /bin/command
```

## Execution Failures

When command execution fails, the shell returns specific error codes:

| Error Code | Description |
|------------|-------------|
| 127 | Command not found |
| 126 | Permission denied or invalid format |

```bash
# Examples of execution failures
nonexistent_command    # Returns 127
chmod 000 script.sh    # Make file non-executable
./script.sh           # Returns 126
```

## Script Execution

### Direct Execution

When executing a file that's not in executable format:

1. File is assumed to be a shell script
2. `/bin/sh` is spawned to execute it

```bash
# Example script execution
echo 'echo "Hello"' > script.txt
sh script.txt        # Explicit interpreter
./script.txt        # Zsh spawns /bin/sh
```

### Shebang Handling

For files beginning with `#!`:

```bash
#!/bin/bash
echo "This is a bash script"
```

::: info Interpreter Resolution
- First line specifies the interpreter
- Shell executes the specified interpreter
- Useful for non-native executable formats
:::

## Command Not Found Handler

You can define a custom handler for commands that aren't found:

```bash
# Define handler function
command_not_found_handler() {
    echo "Command not found: $1"
    echo "Arguments: ${@:2}"
    return 127
}

# Example usage
nonexistent_command arg1 arg2
# Output:
# Command not found: nonexistent_command
# Arguments: arg1 arg2
```

::: warning Handler Limitations
The handler runs in a subshell, so it cannot:
- Change directories in the main shell
- Modify shell parameters
- Affect the parent shell's environment
:::

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