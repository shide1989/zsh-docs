# Shell Grammar

::: tip Version Info
Documentation for Zsh 5.9
:::

## Shell Commands

### Simple Commands

A simple command is a sequence of optional parameter assignments followed by blank-separated words, with optional I/O redirections.

```bash
# Basic structure
VAR=value command arg1 arg2 > output.txt

# Examples of parameter assignments
PATH=/custom/path command    # Temporary PATH for this command
LANG=C grep foo file        # Use C locale for this grep
FOO=bar BAR=foo cmd         # Multiple assignments

# Word expansion examples
echo {a,b,c}*.txt           # Brace + glob expansion
printf "%s\n" $~PATH        # Split PATH with $~
```

::: warning Parameter Assignment
Parameter assignments before a command affect only that command's environment. To make permanent changes, use `export` or make the assignment separately.
:::

### Pipelines

A pipeline is a sequence of one or more commands separated by `|` or `|&`.

```bash
# Basic pipeline
command1 | command2 | command3

# Error redirection pipeline (|&)
command1 |& command2  # Equivalent to: command1 2>&1 | command2

# Process substitution in pipeline
paste <(ls) <(ls -l) | sort

# Named pipes (when MULTIOS is set)
command1 > >(command2) > >(command3)
```

::: info Pipeline Execution
- Commands run simultaneously
- Each command runs in a separate subshell
- Exit status is that of the last command (unless PIPEFAIL is set)
:::

### Lists

Lists are sequences of one or more pipelines separated by `;`, `&`, `&&`, or `||`.

```bash
# Sequential execution (;)
command1 ; command2    # Run command2 after command1 finishes

# Background execution (&)
command1 & command2    # Run command1 in background

# Logical AND (&&)
command1 && command2   # Run command2 only if command1 succeeds
./configure && make && sudo make install

# Logical OR (||)
command1 || command2   # Run command2 only if command1 fails
ping -c 1 host || echo "host is down"

# Combining operators
command1 && command2 || command3
```

### Compound Commands

#### Grouping

```bash
# Subshell grouping ( )
( cd /tmp; pwd; )     # Directory change isolated in subshell
( VAR=value; echo $VAR; ); echo $VAR  # VAR not visible outside

# Current shell grouping { }
{ echo start; command1; echo end; } > output.txt
```

::: tip Grouping Differences
- `( )` runs commands in a subshell
- `{ }` runs commands in the current shell
- `{ }` requires spaces and a trailing semicolon
:::

#### if Statements

```bash
# Basic if
if command1; then
    command2
fi

# if-else
if command1; then
    command2
else
    command3
fi

# if-elif-else
if command1; then
    command2
elif command3; then
    command4
else
    command5
fi
```

#### case Statements

```bash
# Basic case
case word in
    pattern1)
        commands1
        ;;
    pattern2)
        commands2
        ;;
    *)
        default_commands
        ;;
esac

# Modern case with ;& and ;|
case $OSTYPE in
    linux*)
        echo "Linux"
        ;& # Fall through to next pattern
    *unix*)
        echo "Unix-like"
        ;;
    darwin*)
        echo "macOS"
        ;| # Force next pattern test
    *)
        echo "Other"
        ;;
esac
```

::: info Pattern Matching
Case patterns support:
- Glob patterns (`*`, `?`, `[...]`)
- Extended patterns (with EXTENDED_GLOB)
- Alternative patterns (pattern1|pattern2)
- Terminator variants:
  - `;;` - Standard terminator
  - `;&` - Fall through to next pattern
  - `;|` - Force next pattern test
:::

## Loops and Iterations

### for Loops

```bash
# Traditional for loop
for name [ in word ... ]; do
    commands
done

# Examples
for i in *.txt; do
    echo "Processing $i"
done

# Implicit in word list
for arg; do          # Equivalent to: for arg in "$@"
    echo "$arg"
done

# C-style for loop
for (( expr1; expr2; expr3 )); do
    commands
done

# Example C-style loop
for (( i=1; i<=5; i++ )); do
    echo "Iteration $i"
done
```

### select Loops

Creates a numbered menu of selections:

```bash
select name [ in word ... ]; do
    commands
done

# Example
select option in "Coffee" "Tea" "Quit"; do
    case $option in
        Coffee)
            echo "Selected Coffee"
            ;;
        Tea)
            echo "Selected Tea"
            ;;
        Quit)
            break
            ;;
        *)
            echo "Invalid selection"
            ;;
    esac
done
```

::: tip Select Variables
- `$REPLY` contains the line read from input
- `$name` contains the selected word
:::

### while and until Loops

```bash
# while loop
while command; do
    commands
done

# until loop (opposite of while)
until command; do
    commands
done

# Examples
# Read file line by line
while IFS= read -r line; do
    echo "Line: $line"
done < input.txt

# Wait for condition
until ping -c 1 host > /dev/null 2>&1; do
    echo "Waiting for host..."
    sleep 5
done
```

### repeat Loop

```bash
repeat word; do
    commands
done

# Example
repeat 5; do
    echo "Repeated text"
done
```

## Functions

### Function Definition

```bash
# Standard definition
name() {
    commands
}

# Alternative form with 'function' keyword
function name {
    commands
}

# Function with options
function name {
    emulate -L zsh    # Local options
    setopt local_options no_unset
    commands
}
```

### Function Features

```bash
# Accessing parameters
function example {
    echo "Function name: $0"
    echo "First argument: $1"
    echo "All arguments: $@"
    echo "Number of arguments: $#"
}

# Return values
function check_status {
    test -f "$1"
    return $?    # Return status of test
}
```

::: info Function Scope
- Functions have their own parameter scope
- Local variables must be declared with `local`
- Options can be made local with `setopt local_options`
:::

## Time Commands

```bash
# Basic timing
time command

# Complex command timing
time { sleep 1; echo "Done"; }

# Time format
TIMEFMT='%J: %U user %S system %P cpu %*E total'
time expensive_command
```

## Alternative Forms

### Precommand Modifiers

```bash
# Builtin command
builtin cd ..        # Use builtin cd, not function

# Command bypass
command ls          # Bypass function/alias lookup

# Execution trace
exec command        # Replace shell with command

# Noglob
noglob command      # Disable filename generation
```

## Reserved Words

The following words are reserved when unquoted at the beginning of a command:
- `if then else elif fi`
- `case in esac`
- `for while until repeat`
- `do done`
- `function`
- `time coproc`
- `{` `}`
- `select`
- `nocorrect`

::: warning Usage
Reserved words can only be used as commands when:
- Quoted
- Disabled
- Not at command position
:::

## Comments and Quoting

### Comments

```bash
# Single line comment

# Multi-line comment using here document
: <<'END_COMMENT'
This is a
multi-line
comment
END_COMMENT
```

### Quoting Rules

```bash
# Single quotes - No expansion
echo '$HOME'        # Prints: $HOME

# Double quotes - Parameter expansion
echo "$HOME"        # Prints: /home/user

# ANSI-C Quoting
echo $'Line1\nLine2'  # Prints two lines

# Command substitution
echo "Today is $(date)"
echo "Files: `ls`"    # Old style

# Parameter expansion
echo ${PATH}
echo ${name:-default}
```

::: tip Quoting Behaviors
1. Single quotes (`''`):
   - No expansion
   - No interpretation
   - Cannot contain single quotes

2. Double quotes (`""`):
   - Parameter expansion
   - Command substitution
   - Arithmetic expansion
   - Some backslash sequences

3. ANSI-C quotes (`$''`):
   - C-style escape sequences
   - No parameter expansion
:::

## Special Characters

| Character | Meaning |
|-----------|---------|
| `\` | Escape character |
| `'` | Single quote |
| `"` | Double quote |
| `` ` `` | Command substitution (old) |
| `$` | Parameter expansion |
| `|` | Pipeline |
| `&` | Background/AND |
| `;` | Command separator |
| `(` | Subshell |
| `<` | Redirection |
| `>` | Redirection |
| `#` | Comment |

::: warning POSIX_CHARS
When `POSIX_CHARS` is set, additional restrictions apply to special character handling.
:::