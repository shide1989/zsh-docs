import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "The Z Shell Manual",
  description: "Modern documentation for the Z Shell (Zsh)",
  
  themeConfig: {
    nav: [
      { text: 'Introduction', link: '/introduction/' },
      {
        text: 'Getting Started',
        items: [
          { text: 'Invocation', link: '/invocation/' },
          { text: 'Roadmap', link: '/roadmap/' },
          { text: 'Files', link: '/files/' },
          { text: 'Shell Grammar', link: '/shell-grammar/' }
        ]
      },
      {
        text: 'Core Concepts',
        items: [
          { text: 'Parameters', link: '/parameters/' },
          { text: 'Expansion', link: '/expansion/' },
          { text: 'Redirection', link: '/redirection/' }
        ]
      },
      {
        text: 'Advanced',
        items: [
          { text: 'Zsh Modules', link: '/zsh-modules/' },
          { text: 'User Contributions', link: '/user-contributions/' }
        ]
      }
    ],

    sidebar: {
      '/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/introduction/' },
            { text: 'Roadmap', link: '/roadmap/' },
            { text: 'Invocation', link: '/invocation/' },
            { text: 'Files', link: '/files/' }
          ]
        },
        {
          text: 'Shell Fundamentals',
          items: [
            { text: 'Shell Grammar', link: '/shell-grammar/' },
            { text: 'Redirection', link: '/redirection/' },
            { text: 'Command Execution', link: '/command-execution/' },
            { text: 'Functions', link: '/functions/' },
            { text: 'Jobs & Signals', link: '/jobs/' }
          ]
        },
        {
          text: 'Shell Programming',
          items: [
            { text: 'Arithmetic Evaluation', link: '/arithmetic-evaluation/' },
            { text: 'Conditional Expressions', link: '/conditional-expressions/' },
            { text: 'Prompt Expansion', link: '/prompt-expansion/' },
            { text: 'Expansion', link: '/expansion/' },
            { text: 'Parameters', link: '/parameters/' }
          ]
        },
        {
          text: 'Configuration',
          items: [
            { text: 'Options', link: '/options/' },
            { text: 'Shell Builtin Commands', link: '/shell-builtin-commands/' }
          ]
        },
        {
          text: 'Line Editor',
          items: [
            { text: 'Zsh Line Editor', link: '/zsh-line-editor/' },
            { text: 'Completion Widgets', link: '/completion-widgets/' },
            { text: 'Completion System', link: '/completion-system/' },
            { text: 'Completion Using compctl', link: '/completion-using-compctl/' }
          ]
        },
        {
          text: 'Additional Features',
          items: [
            { text: 'Zsh Modules', link: '/zsh-modules/' },
            { text: 'Calendar Function System', link: '/calendar-function-system/' },
            { text: 'TCP Function System', link: '/tcp-function-system/' },
            { text: 'Zftp Function System', link: '/zftp-function-system/' }
          ]
        },
        {
          text: 'Community',
          items: [
            { text: 'User Contributions', link: '/user-contributions/' }
          ]
        },
        {
          text: 'Reference',
          items: [
            { text: 'Concept Index', link: '/concept-index/' },
            { text: 'Variables Index', link: '/variables-index/' },
            { text: 'Options Index', link: '/options-index/' },
            { text: 'Functions Index', link: '/functions-index/' },
            { text: 'Editor Functions Index', link: '/editor-functions-index/' },
            { text: 'Style and Tag Index', link: '/style-and-tag-index/' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zsh-users/zsh' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 1990-2024 Paul Falstad and Zsh Contributors'
    },

    // Version information
    docFooter: {
      prev: 'Previous',
      next: 'Next'
    },

    // Add version
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'short'
      }
    }
  }
})