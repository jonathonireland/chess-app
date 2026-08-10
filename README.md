# React Chess

A browser-based two-player chess game built with React and TypeScript. The project combines drag-and-drop interaction with a typed chess-domain model that calculates legal moves, protects the active king, and coordinates special chess rules.

## Current state

The game currently supports local play for two people sharing the same browser.

Implemented features include:

- A complete chessboard with all standard pieces
- Alternating white and black turns
- Drag-and-drop piece movement with board-boundary constraints
- Highlighted legal destinations for the selected piece
- Standard movement and capture rules for every piece type
- Move simulation that removes choices that would leave the active king in danger
- King-side and queen-side castling
- En passant
- Pawn-promotion selection
- End-of-game winner display
- Restarting the game from a fresh board

The README intentionally does not embed externally hosted screenshots. The previous image URLs were tied to an older portfolio location and had become unreliable.

## Technology

- React 18
- TypeScript
- Create React App
- CSS
- React Testing Library and Jest tooling

## How the game is organized

The application separates board interaction from most chess-domain behavior:

- `Chessboard` renders the tiles and pieces, tracks pointer movement, and converts a drop into a proposed destination.
- `Referee` coordinates turns, accepted moves, en passant, promotion, end-of-game feedback, and React state updates.
- `Board` owns the active piece collection, calculates possible moves, simulates moves for king safety, applies captures and castling, and determines whether the next player has legal moves.
- `Piece`, `Pawn`, and `Position` provide typed, cloneable domain objects.
- `referee/rules` contains the movement calculations used by the board model.

When a move is proposed, the application clones the previous board, applies the accepted state transition, recalculates possible moves, and supplies the updated model to React.

## Run locally

### Prerequisites

- Node.js
- npm

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000).

Create a production build:

```bash
npm run build
```

Run the test command:

```bash
npm test
```

## Current limitations

- Both sides are controlled locally; there is no computer opponent.
- Captured pieces are removed from the board but are not displayed separately.
- The game does not show algebraic notation or a move-history panel.
- End-state handling should distinguish checkmate from stalemate and other draw conditions.
- Automated tests currently cover the application scaffold rather than the important chess-rule scenarios.
- The interaction is primarily mouse-oriented and would benefit from stronger touch, keyboard, and responsive support.
- Promotion and other special moves need additional regression tests and state-flow hardening.

## Possible future improvements

### Gameplay

- Display captured pieces for both players.
- Add a scrolling move history using algebraic chess notation.
- Add a computer-controlled opponent with selectable difficulty.
- Let the player choose a color when playing against the computer.
- Add check indicators and clearer current-player messaging.
- Distinguish checkmate, stalemate, insufficient material, repetition, and the fifty-move rule.
- Support resignation, draw offers, undo for local games, and game review.
- Add clocks and configurable time controls.

### Engineering

- Add focused unit tests for every piece and special rule.
- Add board fixtures for pins, checks, castling, en passant, promotion, checkmate, and stalemate.
- Move modal visibility fully into React state instead of manipulating CSS classes through refs.
- Strengthen immutable state transitions and remove remaining duplicated rule paths.
- Improve keyboard navigation, screen-reader announcements, touch interaction, and responsive sizing.
- Save games locally or through an API and support replaying serialized moves.
- Modernize the build tooling beyond Create React App when the project is next upgraded.

## Project background

This project began by following the [Frontend Coding React Chess tutorial series](https://www.youtube.com/playlist?list=PLBmRxydnERkysOgOS917Ojc_-uisgb8Aj). The repository retains the incremental branches and commits from that learning process, while the current code and this README focus on the resulting application rather than reproducing the tutorial timeline.

## Portfolio context

React Chess complements my Python/Pygame and C#/.NET chess projects. Together, they show how the same rules-heavy domain can be modeled through three different languages, UI frameworks, and state-management approaches.
