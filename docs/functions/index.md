# Zsh Functions

::: tip Version Info
Documentation for Zsh 5.9
:::

## Function Basics

### Definition Syntax

Functions can be defined using three formats:

```bash
# Format 1: Traditional shell format
name() {
    commands
}

# Format 2: Alternative format with 'function' keyword
function name {
    commands
}

# Format 3: Combined format
function name() {
    commands
}
```

### Function Names

Function names follow these rules:
- Can contain any characters allowed in standard shell words
- Cannot be reserved words unless special quoting is used
- Can include hyphens (unlike many other shells)

```bash
# Valid function names
_cleanup() { ... }         # Starts with underscore
.cleanup() { ... }         # Starts with dot
cleanup-files() { ... }    # Contains hyphen
'if'() { ... }            # Reserved word (requires quotes)
```

::: warning Reserved Words
Function names cannot be reserved words unless special quoting is used. This is particularly important when porting scripts from other shells.
:::

## Function Parameters

### Positional Parameters

Functions receive parameters similar to scripts:

```bash
example_function() {
    echo "Function name: $0"        # Name of the function
    echo "First argument: $1"       # First parameter
    echo "Second argument: $2"      # Second parameter
    echo "All arguments: $@"        # All parameters as separate words
    echo "All arguments: $*"        # All parameters as single string
    echo "Number of arguments: $#"  # Count of parameters
    
    # Access array of parameters
    print -l $*             # Print each parameter on new line
    print -l ${@}          # Same as above, but more explicit
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

# Loop through parameters
process_args() {
    for arg in "$@"; do
        echo "Processing: $arg"
    done
}
```

## Function Options

### Local Options

Functions can have their own option settings that don't affect the calling environment:

```bash
function local_opts() {
    emulate -L zsh          # Local zsh emulation
    setopt local_options    # Make option changes local
    setopt null_glob        # Set option for this function
    setopt no_case_glob     # Another local option
    # ... function body ...
}
```

### Option Inheritance

By default, functions inherit options from the calling environment:

```bash
function inherit_opts() {
    # Inherits options from calling environment
    setopt local_options    # Only new option changes are local
    # ... function body ...
}
```

::: tip Best Practice
Always use `emulate -L zsh` at the start of functions that need predictable behavior, regardless of user settings.
:::

## Variable Scope

### Local Variables

Variables in functions can be local or global:

```bash
function scope_example() {
    local var1="local"      # Local to function
    typeset var2="local"    # Also local to function
    global_var="global"     # Global scope
    
    # Multiple local declarations
    local var3 var4 var5
    
    # Local with type specification
    local -i number=42      # Integer
    local -a array=()       # Array
    local -A hash=()        # Associative array
}
```

### Static Variables

Static variables persist between function calls:

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

Functions can return status codes:

```bash
function check_file() {
    if [[ -f $1 ]]; then
        return 0        # Success
    else
        return 1        # Failure
    fi
}

# Usage examples
if check_file "example.txt"; then
    echo "File exists"
fi

# Store return value
check_file "test.txt"
status=$?
echo "Function returned: $status"
```

### Function Output Capture

```bash
# Capture function output
function get_data() {
    echo "line 1"
    echo "line 2"
    return 0
}

# Different capture methods
result=$(get_data)      # Command substitution
result=`get_data`       # Old-style substitution
get_data > output.txt   # Redirect to file
```

### Function Tracing

```bash
function traced_func() {
    setopt local_options xtrace  # Enable tracing
    echo "This will be traced"
    local var="test"
    echo $var
}

# Or use TRAP functions
function TRAPDEBUG() {
    echo "Debugging $0: $1"
    echo "Line number: $LINENO"
}
```

## Autoloading Functions

### Basic Autoloading

Autoloading allows functions to be loaded on demand:

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
autoload -w func          # Show where function was loaded from
```

::: info Autoload Search
Functions are searched in `$fpath` directories in order. The first matching file is used.
:::

### Creating Autoload Functions

```bash
# Example autoload function file: ~/.zsh/functions/my_func
#! /usr/bin/env zsh
# Function description here

local arg=$1
echo "Processing $arg"
return 0
```

## Anonymous Functions

```bash
# Create and execute anonymous function
() {
    echo "Anonymous function"
    echo "Args: $@"
} arg1 arg2

# Store in parameter
func='{echo "Stored function"}'
functions -M func

# Execute stored function
$func
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

# Define hook functions
function my_precmd() {
    echo "Custom precmd hook"
}
```

## Function Utilities

### Listing Functions

```bash
functions            # List all functions
functions name       # Show specific function
which funcname      # Show function source
type funcname       # Show function type
whence -v funcname  # Detailed function info
```

### Manipulating Functions

```bash
unfunction name     # Remove function
functions -c old new # Copy function
functions -m pattern # Move/rename functions
functions -M        # Mark as autoloaded
```

## Advanced Features

### Function Flags

```bash
# Set function flags
functions -t func   # Trace execution
functions -T func   # Trap DEBUG
functions -u func   # Autoload
functions -U func   # Suppress alias expansion
functions -z func   # Native zsh format
```

### Function Styles

```bash
# Different loading styles
autoload -Uz colors
autoload -Uz compinit
autoload -Uz vcs_info

# Conditional loading
autoload -Uz +X zed-set-file-name 2>/dev/null
```

### Error Handling

```bash
function safe_function() {
    emulate -L zsh
    setopt local_options err_return no_unset pipe_fail

    # Function will exit on any error
    command1 || return
    command2
}

# With error trapping
function TRAPZERR() {
    echo "Error occurred in $0"
    return 1
}
```

::: tip Best Practices
1. Always use local variables when possible
2. Use meaningful function names
3. Document complex functions
4. Return meaningful exit status
5. Use autoloading for better organization
6. Consider using `emulate -L zsh` for consistent behavior
7. Handle errors appropriately
8. Use function hooks judiciously
:::

### Debugging Functions

```bash
# Enable function tracing
functions -T name

# Debug specific function
PS4='+%N:%i> ' zsh -x -c 'source file; func'

# Set trap
trap 'echo "Line $LINENO"' DEBUG

# Verbose debugging
setopt xtrace
function_name args
setopt no_xtrace
```