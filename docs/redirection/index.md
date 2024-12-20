# Redirection

::: tip Version Info
Documentation for Zsh 5.9
:::

## Basic Redirection

Redirection operators can appear anywhere in a simple command or can precede/follow a complex command. When a command is followed by `&` (and job control is inactive), the default input is `/dev/null`.

### Input Redirection

```bash
# Basic input redirection
< file              # Open file for reading as standard input
<> file             # Open file for reading and writing
```

### Output Redirection

```bash
# Basic output redirection
> file              # Write output to file (creates/truncates)
>| file             # Write output to file (overrides CLOBBER)
>! file             # Same as >|
>> file             # Append output to file
>>| file            # Append output (overrides CLOBBER)
>>! file            # Same as >>|
```

::: warning CLOBBER Option
When `CLOBBER` is unset:
- `>` fails if file exists
- `>>` fails if file doesn't exist and `APPEND_CREATE` is unset
:::

### Here Documents and Here Strings

```bash
# Here document
<< 'EOF'            # No parameter expansion (quoted)
some text
EOF

<< EOF              # Parameter expansion performed
$HOME
EOF

<<- EOF             # Leading tabs removed
    indented text
EOF

# Here string
<<< "string"        # Pass string to standard input
```

### File Descriptor Operations

```bash
# Duplicating file descriptors
<& number           # Duplicate input from fd
>& number           # Duplicate output to fd

# Closing file descriptors
<& -               # Close standard input
>& -               # Close standard output

# Coprocess redirection
<& p               # Input from coprocess
>& p               # Output to coprocess
```

### Combined Output Redirection

```bash
# Redirect both stdout and stderr
&> file            # Same as >file 2>&1
>&| file           # Force overwrite
&>> file           # Append both outputs
```

## Advanced Redirection

### File Descriptor with Parameters

When `IGNORE_BRACES` is not set, you can use named file descriptors:

```bash
# Open new file descriptor (number ≥ 10)
{myfd}>&1          # Duplicate fd 1 to new fd stored in $myfd
echo "log" >&$myfd # Write to the new fd
{myfd}>&-          # Close the fd

# Practical example
integer myfd
exec {myfd}>~/logs/mylogfile.txt
print "Log entry" >&$myfd
exec {myfd}>&-
```

::: warning Parameter Restrictions
- Cannot use readonly parameters
- With `CLOBBER` unset, parameter must not already reference an open fd
:::

## Multios

When `MULTIOS` is set (default), multiple redirections are handled specially:

### Multiple Outputs

```bash
# Write to multiple files
date >file1 >file2  # Output goes to both files

# Combining with pipes
date >file1 | grep "2024"  # Write to file and pipe
```

::: info Order Matters
Redirections are evaluated left-to-right:
```bash
date >&1 >output    # Copies output to both
date >output >&1    # Both go to 'output'
```
:::

### Multiple Inputs

```bash
# Read from multiple files
sort <file1 <file2  # Equivalent to: cat file1 file2 | sort

# With brace expansion
sort <file{1,2}     # Same as above
```

### Multios Caveats

When using multios with external programs:

```bash
# Potential race condition
cat file >file1 >file2
cat file1 file2     # Might not show complete content

# Safe alternative using subshell
{ cat file } >file1 >file2
```

## Redirections Without Commands

When using redirections without a command, behavior depends on shell options:

```bash
# Default behavior (NULLCMD=cat)
< file              # Display file contents

# With READNULLCMD=more
< file              # Display file with paging

# With CSH_NULLCMD set
< file              # Error (csh compatibility)

# With SH_NULLCMD set
< file              # Equivalent to: : < file
```

::: tip Configuration
Set `NULLCMD` and `READNULLCMD` to customize behavior:
```bash
NULLCMD=cat         # Default command for output
READNULLCMD=more    # Default command for input
```
:::