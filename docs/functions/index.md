# Functions

::: tip Version Info
Documentation for Zsh 5.9
:::

## Function Basics

### Definition Syntax

Functions can be defined using two formats:

```bash
# Traditional shell format
name() {
    commands
}

# Alternative format with 'function' keyword
function name {
    commands
}
```

### Function Names

```bash
# Valid function names
_cleanup() { ... }         # Starts with underscore
.cleanup() { ... }         # Starts with dot
cleanup-files() { ... }    # Contains hyphen
```

::: warning Reserved Words
Function names cannot be reserved words unless special quoting is used.
:::

## Function Parameters

### Positional Parameters

```bash
example_function() {
    echo "Function name: $0"        # Name of the function
    echo "First argument: $1"       # First parameter
    echo "Second argument: $2"      # Second parameter
    echo "All arguments: $@"        # All parameters as separate words
    echo "All arguments: $*"        # All parameters as single word
    echo "Number of arguments: $#"  # Count of parameters
}
```

### Parameter Handling

```bash
# Shift parameters left
function shift_example() {
    echo "Initial parameters: $@"
    shift 2                  # Remove first two parameters
    echo "After shift: $@"
}

# Set positional parameters
function set_params() {
    set -- one two three    # Set $1, $2, $3
    echo $@
}
```

## Function Options

### Local Options

```bash
function local_opts() {
    emulate -L zsh          # Local zsh emulation
    setopt local_options    # Make option changes local
    setopt null_glob        # Set option for this function
    # ... function body ...
}
```

### Option Inheritance

```bash
function inherit_opts() {
    # Inherits options from calling environment
    setopt local_options    # Only new option changes are local
    # ... function body ...
}
```

## Variable Scope

### Local Variables

```bash
function scope_example() {
    local var1="local"      # Local to function
    typeset var2="local"    # Also local to function
    global_var="global"     # Global scope
    
    # Multiple local declarations
    local var3 var4 var5
}
```

### Static Variables

```bash
function static_example() {
    # Static variable persists between calls
    typeset -g static_var   # Declare global
    : ${static_var:=0}      # Initialize if unset
    (( static_var++ ))      # Increment
    echo $static_var
}
```

## Function Features

### Return Status

```bash
function check_file() {
    if [[ -f $1 ]]; then
        return 0        # Success
    else
        return 1        # Failure
    fi
}

# Usage
if check_file "example.txt"; then
    echo "File exists"
fi
```

### Function Tracing

```bash
function traced_func() {
    setopt local_options xtrace  # Enable tracing
    echo "This will be traced"
}

# Or use TRAP functions
function TRAPDEBUG() {
    echo "Debugging $0: $1"
}
```

## Autoloading Functions

### Basic Autoloading

```bash
# Declare autoloaded function
autoload my_function

# With explicit paths
fpath=(~/functions $fpath)
autoload ~/functions/my_function

# Autoload all functions in directory
autoload ~/functions/*(.:t)
```

### Autoload Options

```bash
# Various autoload formats
autoload -U func           # Undefined
autoload -z func          # zsh style
autoload -Uz func         # Both flags
```

::: info Autoload Search
Functions are searched in `$fpath` directories in order.
:::

## Anonymous Functions

```bash
# Create anonymous function
() {
    echo "Anonymous function"
    echo "Args: $@"
} arg1 arg2

# Store in parameter
func='{echo "Stored function"}'
functions -M func
```

## Function Hooks

### Special Functions

```bash
# Precmd - Executed before each prompt
function precmd() {
    echo "Before prompt"
}

# Preexec - Executed before each command
function preexec() {
    echo "Executing: $1"
}

# Chpwd - Executed after cd
function chpwd() {
    ls -la
}
```

### Multiple Hooks

```bash
# Add to hook arrays
precmd_functions+=(my_precmd)
preexec_functions+=(my_preexec)
chpwd_functions+=(my_chpwd)
```

## Function Utilities

### Listing Functions

```bash
functions            # List all functions
functions name       # Show specific function
which funcname      # Show function source
type funcname       # Show function type
```

### Manipulating Functions

```bash
unfunction name     # Remove function
functions -c old new # Copy function
functions -m pattern # Move/rename functions
```

## Advanced Features

### Function Flags

```bash
# Set function flags
functions -t func   # Trace execution
functions -T func   # Trap DEBUG
functions -u func   # Autoload
functions -U func   # Suppress alias expansion
```

### Function Styles

```bash
# Different loading styles
autoload -Uz colors
autoload -Uz compinit
autoload -Uz vcs_info
```

::: tip Best Practices
1. Always use local variables when possible
2. Use meaningful function names
3. Document complex functions
4. Return meaningful exit status
5. Use autoloading for better organization
:::

### Error Handling

```bash
function safe_function() {
    emulate -L zsh
    setopt local_options err_return no_unset pipe_fail

    # Function will exit on any error
    command1 || return
    command2
}
```

### Debugging Functions

```bash
# Enable function tracing
functions -T name

# Debug specific function
PS4='+%N:%i> ' zsh -x -c 'source file; func'

# Set trap
trap 'echo "Line $LINENO"' DEBUG
```