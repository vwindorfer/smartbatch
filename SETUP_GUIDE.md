# SmartBatch - Setup Guide

## What Is This?

This folder contains everything you need to start building the SmartBatch frontend with Claude Code. SmartBatch is a tablet-first web app for cafeteria kitchens that predicts meal demand, generates cook plans in trays/batches, and tracks food waste.

The backend and ML model are being built by a teammate. This is the frontend only, running on dummy data.

---

## Folder Contents

```
smartbatch-setup/
├── CLAUDE.md              # The brain. Project specs, design system, page definitions,
│                          # dummy data, kitchen UX rules, and dev workflow.
│                          # Claude Code reads this automatically from the project root.
│
├── tasks/
│   ├── todo.md            # Task checklist. Claude Code tracks progress here.
│   └── lessons.md         # Self-correction log. Updated when mistakes happen.
│
└── SETUP_GUIDE.md         # This file.
```

---

## Step-by-Step Setup

### 1. Prerequisites

Make sure you have these installed:

```bash
node --version       # Need >= 18
python3 --version    # Need >= 3.x (for the ui-ux-pro-max-skill search script)
```

If you're on Windows: use `winget install Python.Python.3.12` for Python and install Node.js from nodejs.org.

Also make sure Claude Code is installed:

```bash
npm install -g @anthropic-ai/claude-code
```

### 2. Create the Project Folder

```bash
mkdir ~/projects/smartbatch
cd ~/projects/smartbatch
```

### 3. Copy Setup Files Into the Project

Copy the contents of this `smartbatch-setup` folder into your project:

```bash
# Adjust the source path to wherever you downloaded these files
cp ~/Downloads/smartbatch-setup/CLAUDE.md ~/projects/smartbatch/
cp -r ~/Downloads/smartbatch-setup/tasks ~/projects/smartbatch/
```

Your folder should now look like:

```
smartbatch/
├── CLAUDE.md
└── tasks/
    ├── todo.md
    └── lessons.md
```

### 4. Install the ui-ux-pro-max-skill

This is the external design intelligence skill from GitHub (43k+ stars, 161 design rules, 67 UI styles). Install it with:

```bash
cd ~/projects/smartbatch
npm install -g uipro-cli
uipro init --ai claude
```

This creates a `.claude/skills/ui-ux-pro-max/` folder in your project with all skill files. Claude Code detects and uses it automatically.

After installation, your project looks like:

```
smartbatch/
├── CLAUDE.md
├── .claude/
│   └── skills/
│       └── ui-ux-pro-max/
│           ├── instructions.md
│           ├── scripts/
│           └── data/
└── tasks/
    ├── todo.md
    └── lessons.md
```

### 5. Open in VS Code

```bash
cd ~/projects/smartbatch
code .
```

### 6. Start Claude Code

Open the integrated terminal in VS Code (`Ctrl+Backtick`) and run:

```bash
claude
```

Claude Code automatically reads the `CLAUDE.md` from the project root and detects the installed skill.

### 7. Give the First Prompt

Paste this into Claude Code:

```
Read the CLAUDE.md file and tasks/todo.md. Check .claude/skills/ for installed skills.

This is SmartBatch - a tablet-first kitchen app for cafeterias. Before writing 
any code, generate a design system using the ui-ux-pro-max skill:

python3 .claude/skills/ui-ux-pro-max/scripts/search.py "institutional cafeteria kitchen management dashboard tablet" --design-system -p "SmartBatch"

Then start Phase 1 from tasks/todo.md: scaffold Vite + React + TypeScript, 
install dependencies (tailwindcss, react-router-dom, zustand, recharts, 
lucide-react), configure Tailwind with the color palette from CLAUDE.md, 
and create all TypeScript type definitions and dummy data files.

Important: The kitchen-specific UX rules in CLAUDE.md (touch targets, tray 
counter specs, anti-patterns for wet-hands environments) always override 
generic design recommendations from the skill.

Update tasks/todo.md as you complete each item.
```

### 8. Continue Phase by Phase

After Phase 1, run the dev server in a second terminal:

```bash
npm run dev
```

Open the URL in Chrome, press F12, click the device toolbar icon, and select "iPad" or set custom dimensions to 1024x768.

Then give Claude Code the next prompt:

```
Continue with Phase 2 from tasks/todo.md. Build layout components (AppShell, 
BottomNav, PageHeader) and all shared components. Follow the kitchen UX rules 
from CLAUDE.md and use the ui-ux-pro-max skill for design decisions. Update 
tasks/todo.md as you go.
```

Continue the same way for Phases 3, 4, and 5.

---

## Working with Claude Code - Tips

### Let It Run Autonomously
The CLAUDE.md is detailed enough that Claude Code can work through full phases without much guidance. Let it build, then review.

### Review in Tablet View
Always check results in Chrome DevTools with tablet emulation. The app is designed for 1024x768 landscape. If something looks off at that size, flag it.

### Give Feedback, Don't Micromanage
Describe problems and let Claude Code fix them. It will log lessons from corrections in `tasks/lessons.md`.

Example:
```
The tray counter buttons are too small. CLAUDE.md says increment/decrement 
buttons need to be 64x64px minimum. Fix all TrayCounter instances.
```

### If Things Go Sideways
```
Stop. Re-read CLAUDE.md from scratch. Compare what you've built against 
the specifications. Fix all gaps. Update tasks/todo.md.
```

---

## For Your Backend Teammate

When the ML backend is ready to integrate:

1. Replace static imports from `src/data/` with API calls
2. The Zustand store (`src/store/useStore.ts`) is the single source of truth
3. Expected endpoints are documented at the bottom of CLAUDE.md
4. Confidence scores should be 0-100 integers
5. Tray recommendations should include: dish_id, recommended_trays, backup_trays, confidence