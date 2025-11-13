# AI Code Review Roulette

## Goal
Build a tool where developers paste code snippets and receive instant reviews from AI "personalities" - think strict architect, performance guru, or security hawk. Make it fun and actually useful.

## Tech Stack
- **Frontend**: Vite + React + TypeScript
- **Styling**: TailwindCSS
- **Syntax Highlighting**: Prism.js or react-syntax-highlighter
- **LLM Integration**: One or more of:
  - **Ollama** (runs locally - download models like codellama, llama2)
  - **Hugging Face Inference API** (free tier, no credit card)
  - **Anthropic API** (if you have keys) via fetch to `https://api.anthropic.com/v1/messages`

## Reviewer Personalities
Define prompt templates for different personas:
- **The Architect**: Focus on design patterns, SOLID principles, maintainability
- **Performance Pete**: Optimization opportunities, big-O complexity, caching
- **Security Sam**: SQL injection, XSS, authentication flaws, input validation
- **Clean Code Connie**: Naming, readability, code smells, DRY violations
- **The Pedant**: Style guide compliance, formatting, comments

## Core Features
1. **Code Input**: Large textarea with syntax highlighting
2. **Language Selection**: Auto-detect or manual selection (C#, JavaScript, Python, etc.)
3. **Personality Picker**: Radio buttons or dropdown for reviewer type
4. **Review Output**: Formatted markdown review with specific line references
5. **Copy/Share**: Easy copy of review results

## Quick Start
```bash
npm create vite@latest code-review-roulette -- --template react-ts
cd code-review-roulette
npm install
npm install tailwindcss autoprefixer postcss react-syntax-highlighter prismjs
npx tailwindcss init -p
```

## LLM Integration Options

### Option 1: Ollama (Local, No API Keys)
1. Install Ollama from `https://ollama.ai`
2. Pull a model: `ollama pull codellama`
3. Hit local API: `POST http://localhost:11434/api/generate`

### Option 2: Hugging Face (Free Tier)
```javascript
fetch('https://api-inference.huggingface.co/models/bigcode/starcoder', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ inputs: prompt })
})
```

### Option 3: Use Anthropic API (In Browser)
Since you're in Claude.ai, artifacts can call the API directly:
```javascript
fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    messages: [{ role: 'user', content: constructedPrompt }]
  })
})
```

## Prompt Engineering
Structure prompts like:
```
You are {PERSONALITY}. Review this {LANGUAGE} code and provide:
1. Overall assessment (1-2 sentences)
2. Specific issues found (with line numbers if possible)
3. Recommended improvements
4. Example refactored code if relevant

Code to review:
{CODE}

Format your response in markdown.
```

## Development Approach
- Start with UI: code input + personality selector
- Wire up one LLM option (recommend Ollama for local dev)
- Parse and display formatted reviews
- Add multiple personality prompts
- Polish with syntax highlighting and copy functionality

## Stretch Goals
- GitHub integration: paste a PR URL, fetch diff, review changes
- Side-by-side: original code vs. AI-suggested improvements
- Review history: save past reviews in local storage
- Diff highlighting: show exactly what to change
- Export as PR comment format
