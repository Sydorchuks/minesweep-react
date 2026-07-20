# Minesweeper React

A classic Minesweeper game built with React and TypeScript.

The project keeps the main game rules inside TypeScript classes, while React is used only for rendering the UI and connecting user actions to the game logic through hooks.

## Features

- Three difficulty levels: beginner, intermediate, and expert.
- First click is always safe.
- Left click reveals a cell.
- Right click places or removes a flag.
- Timer and mine counter.
- Win and loss result banner.
- Dark and light theme.
- Responsive board layout with zoom control.
- Development mode toggle for showing mines locally.

## Tech Stack

- React
- TypeScript
- Vite
- CSS modules by component folder

## Project Structure

```text
src/
  components/       React UI components
  constants/        Text labels and UI copy
  domain/           Game logic classes
  hooks/            React hooks that connect logic to UI
  styles/           Global styles and theme variables
  utils/            Small helper functions
```

## Game Logic

The core logic is placed in `src/domain`.

```text
Cell
Mine
Board
MinesweeperGame
```

`MinesweeperGame` controls the current game status, win/loss flow, mine placement, revealing cells, and flagging cells.

React connects to this logic through `useMinesweeper`.

```text
TypeScript classes
        |
useMinesweeper()
        |
React components
```

This keeps the game rules separate from the UI.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Notes

The dev mine preview is available only in development mode. It is useful for testing the board and does not affect the normal game flow.
