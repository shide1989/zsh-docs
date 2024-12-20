# Jobs & Signals

::: tip Version Info
Documentation for Zsh 5.9
:::

## Job Control

### Job Monitoring

When the `MONITOR` option is set in an interactive shell, Zsh associates a job with each pipeline and maintains a job table.

```bash
# Enable job control
setopt MONITOR

# View current jobs
jobs

# Example output:
[1]  + running    sleep 100 &
[2]  - suspended  vim file.txt
```

### Job Numbers and Process IDs

When starting an asynchronous job with `&`, Zsh outputs information in this format:
```bash
[1] 1234
#    │   └─ Process ID of the job
#    └───── Job number
```

### Job Disowning

```bash
# Immediate job disowning
command &!    # or
command &|    # Both forms remove job from job table

# Disown after starting
disown %1     # Remove job 1 from job table
disown -r     # Disown all running jobs
disown -h %2  # Mark job 2 to not receive SIGHUP
```

::: warning Suspended Functions
Disowning suspended shell functions is delayed until any process from the parent shell terminates.
:::

## Job Control Operations

### Job Suspension

```bash
# Suspend current job
Ctrl+Z        # Sends TSTP signal

# Resume suspended job
fg            # Bring to foreground
bg            # Continue in background

# Example workflow
vim file.txt  # Start editor
# Press Ctrl+Z to suspend
[1]  + suspended  vim file.txt
bg            # Continue vim in background
fg            # Bring back to foreground
```

### Job References

Jobs can be referenced in several ways:

```bash
%1          # Job number 1
%string     # Job starting with 'string'
%?string    # Job containing 'string'
%%          # Current job
%+          # Current job (same as %%)
%-          # Previous job
$!          # PID of last background job
```

### Background Job Control

```bash
# Control background job output
stty tostop  # Suspend on output attempt
stty -tostop # Allow background output

# Job state notifications
setopt NOTIFY          # Immediate job state notification
unsetopt NOTIFY        # Wait until prompt
```

## Terminal State Management

```bash
# Save/restore terminal state
fg %1        # Restores tty modes from suspension
kill -CONT %1 # Does NOT restore tty modes
bg %1        # Does NOT restore tty modes
```

### Shell Exit Behavior

```bash
# Configure SIGHUP behavior
setopt HUP   # Send SIGHUP to jobs on exit
unsetopt HUP # Don't send SIGHUP on exit

# Prevent job termination
nohup command &   # Using nohup command
disown -h %1      # Using disown builtin
```

## Signal Handling

### Default Signal Behavior

```bash
# Background commands with '&'
command & # INT and QUIT ignored if MONITOR is off

# Signal inheritance
# Shell inherits signal handling from parent process
# QUIT is always ignored by the shell itself
```

### Special Cases

```bash
# Asynchronous operations that don't wait on exit:
# 1. Process substitution
echo $(command)    # Shell may exit before completion

# 2. Multios
command >file1 >file2  # Background processes for multiple redirections
```

### Job Monitoring and Traps

```bash
# Set up CHLD trap for job completion
TRAP_CHLD() {
    echo "Job state changed"
}

# Example monitoring script
monitor_jobs() {
    while true; do
        jobs
        sleep 1
    done
}
```

## Best Practices

### Job Management

```bash
# Check for jobs before exit
if [[ $(jobs) ]]; then
    echo "Jobs are running"
fi

# Clean job handling
cleanup() {
    # Save running jobs
    jobs -l > "$HOME/.zsh_jobs"
    # Disown persistent jobs
    disown -r
}
trap cleanup EXIT
```

::: tip Job Control Tips
1. Use `disown -h` for long-running processes
2. Check job status before shell exit
3. Use `nohup` for processes that should survive logout
4. Monitor background jobs with `jobs -l`
:::

### Error Handling

```bash
# Handle job control errors
if ! fg %1 2>/dev/null; then
    echo "Job not found or not resumable"
fi

# Safe background execution
if command & wait $!; then
    echo "Background job succeeded"
else
    echo "Background job failed"
fi
```