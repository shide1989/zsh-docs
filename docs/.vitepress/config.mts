import { defineConfig } from "vitepress";

export default defineConfig({
  title: "The Z Shell Docs",
  description: "Modern documentation for the Z Shell (Zsh)",

  themeConfig: {
    nav: [
      { text: "Introduction", link: "/introduction/" },
      {
        text: "Getting Started",
        items: [
          { text: "Invocation", link: "/invocation/" },
          { text: "Files", link: "/files/" },
          { text: "Shell Grammar", link: "/shell-grammar/" },
        ],
      },
      {
        text: "Shell Basics",
        items: [
          { text: "Parameters", link: "/parameters/" },
          { text: "Expansion", link: "/expansion/" },
          { text: "Redirection", link: "/redirection/" },
          { text: "Execution", link: "/command-execution/" },
        ],
      },
      {
        text: "Shell Features",
        items: [
          { text: "Jobs & Signals", link: "/jobs/" },
          { text: "Arithmetic", link: "/arithmetic-evaluation/" },
          {
            text: "Conditional Expressions",
            link: "/conditional-expressions/",
          },
        ],
      },
      {
        text: "Line Editor",
        items: [
          { text: "Zle Basics", link: "/zle/" },
          { text: "Zle Widgets", link: "/zle-widgets/" },
          { text: "Zle Builtins", link: "/zle-builtins/" },
        ],
      },
    ],

    sidebar: {
      "/": [
        {
          text: "The Z Shell Manual",
          items: [
            { text: "Introduction", link: "/introduction/" },
            { text: "Invocation", link: "/invocation/" },
            { text: "Files", link: "/files/" },
          ],
        },
        {
          text: "Core Shell Concepts",
          items: [
            { text: "Shell Grammar", link: "/shell-grammar/" },
            { text: "Redirection", link: "/redirection/" },
            { text: "Command Execution", link: "/command-execution/" },
            { text: "Functions", link: "/functions/" },
            { text: "Jobs & Signals", link: "/jobs/" },
          ],
        },
        {
          text: "Basic Shell Features",
          items: [
            { text: "Parameters", link: "/parameters/" },
            { text: "Expansion", link: "/expansion/" },
            { text: "Pattern Matching", link: "/pattern-matching/" },
            { text: "Options", link: "/options/" },
          ],
        },
        {
          text: "Shell Builtin Commands",
          items: [
            {
              text: "Shell Builtin Commands",
              link: "/shell-builtin-commands/",
            },
            { text: "Shell Arithmetic", link: "/arithmetic/" },
            {
              text: "Conditional Expressions",
              link: "/conditional-expressions/",
            },
          ],
        },
        {
          text: "Line Editor",
          items: [
            { text: "Zle Basics", link: "/zle/" },
            { text: "Zle Widgets", link: "/zle-widgets/" },
            { text: "Zle Builtins", link: "/zle-builtins/" },
            { text: "User Contributions", link: "/user-contributions/" },
          ],
        },
        {
          text: "Completion System",
          items: [
            { text: "Completion System", link: "/completion-system/" },
            { text: "Completion Widgets", link: "/completion-widgets/" },
            { text: "Completion Functions", link: "/completion-functions/" },
            { text: "Control Functions", link: "/control-functions/" },
          ],
        },
        {
          text: "Zsh Modules",
          items: [
            { text: "Zsh Modules", link: "/zsh-modules/" },
            { text: "Zsh/Attr", link: "/zsh-attr/" },
            { text: "Zsh/DateTime", link: "/zsh-datetime/" },
            { text: "Zsh/Files", link: "/zsh-files/" },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/zsh-users/zsh" }],

    search: {
      provider: "local",
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 1990-2024 Paul Falstad and Zsh Contributors",
    },

    // Version information
    docFooter: {
      prev: "Previous",
      next: "Next",
    },

    // Add version
    lastUpdated: {
      text: "Updated at",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "short",
      },
    },
  },
});
