# React Chess

A browser-based chess game built with React and TypeScript. The player controls White against a computer-controlled Black opponent. The project combines drag-and-drop interaction with a typed chess-domain model that calculates legal moves, protects the active king, and coordinates special chess rules.

## Current state

The game currently supports a single-player White-versus-Black-AI mode. White is controlled by the player, while Black automatically chooses a random move from its currently calculated legal moves.

Implemented features include:

- A complete chessboard with all standard pieces
- Human control restricted to the White pieces
- A computer-controlled Black opponent
- Random selection from Black's calculated legal moves
- A short delay before the AI moves
- Alternating White and Black turns
- Drag-and-drop movement for the human player
- Shared board-boundary validation that removes off-board move coordinates
- Highlighted legal destinations for the selected piece
- Standard movement and capture rules for every piece type
- Move simulation that removes choices that would leave the active king in danger
- King-side and queen-side castling
- En passant support for the human move path
- White pawn-promotion selection
- End-of-game winner display
- Restarting the game from a fresh board

The README intentionally does not embed externally hosted screenshots. The previous image URLs were tied to an older portfolio location and had become unreliable.

## Computer opponent

After White completes a legal move, a React effect detects that it is Black's turn. The game gathers the legal destinations for every Black piece, selects one at random, and executes it after a 600-millisecond delay.

The effect also cancels its pending timer when necessary and verifies that it is still Black's turn before applying the selected move. These guards help prevent a delayed AI action from being applied to stale game state.

The current opponent is intentionally simple: every legal move has an equal chance of being selected. It does not yet evaluate captures, material, king safety beyond the existing legal-move rules, positional strength, or future moves.

## Technology

- React 18
- TypeScript
- Create React App
- CSS
- React Testing Library and Jest tooling

## How the game is organized

The application separates board interaction from most chess-domain behavior:

- `Chessboard` renders the tiles and pieces, tracks pointer movement, and converts a drop into a proposed destination.
- `Referee` owns the React board state, restricts the human to White, detects Black's turn, selects the AI move, coordinates accepted moves, and handles promotion and end-of-game feedback.
- `Board` owns the active piece collection, calculates possible moves, filters destinations to the 8-by-8 board, simulates moves for king safety, applies captures and castling, and determines whether the next player has legal moves.
- `Piece`, `Pawn`, and `Position` provide typed, cloneable domain objects.
- `referee/rules` contains the movement calculations used by the board model.

When a move is accepted, the application clones the previous board, applies the state transition, recalculates possible moves, and supplies the updated model to React. The AI turn is triggered by a `useEffect` after the White move updates the board.

## Run locally

### Prerequisites

- Node.js
- npm or Yarn

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

Equivalent Yarn commands can also be used.

## Current limitations

- The player currently controls White only; color selection is not available.
- The Black AI selects randomly and has no difficulty settings or strategic evaluation.
- The AI move path does not yet calculate en passant separately.
- Black pawn promotion is not yet automated.
- Captured pieces are removed from the board but are not displayed separately.
- The game does not show algebraic notation or a move-history panel.
- End-state handling should distinguish checkmate from stalemate and other draw conditions.
- Automated tests currently cover the application scaffold rather than the important chess-rule and AI-turn scenarios.
- The interaction is primarily mouse-oriented and would benefit from stronger touch, keyboard, and responsive support.
- Promotion and other special moves need additional regression tests and state-flow hardening.

## Possible future improvements

### Gameplay and AI

- Score candidate moves using material values and positional considerations.
- Add search with minimax and alpha-beta pruning.
- Add selectable AI difficulty levels.
- Let the player choose White or Black.
- Complete AI handling for en passant and pawn promotion.
- Display captured pieces for both players.
- Add a scrolling move history using algebraic chess notation.
- Add check indicators and clearer “AI is thinking” status messaging.
- Distinguish checkmate, stalemate, insufficient material, repetition, and the fifty-move rule.
- Support resignation, game review, and undo where appropriate.
- Add clocks and configurable time controls.

### Engineering

- Add focused unit tests for every piece and special rule.
- Add board fixtures for pins, checks, castling, en passant, promotion, checkmate, and stalemate.
- Test AI turn detection, move selection, timer cleanup, and stale-state protection.
- Move modal visibility fully into React state instead of manipulating CSS classes through refs.
- Strengthen immutable state transitions and remove remaining duplicated rule paths.
- Improve keyboard navigation, screen-reader announcements, touch interaction, and responsive sizing.
- Save games locally or through an API and support replaying serialized moves.
- Modernize the build tooling beyond Create React App when the project is next upgraded.

## Project background

This project began by following the [Frontend Coding React Chess tutorial series](https://www.youtube.com/playlist?list=PLBmRxydnERkysOgOS917Ojc_-uisgb8Aj). The repository retains the incremental branches and commits from that learning process, while the current code and this README focus on the resulting application rather than reproducing the tutorial timeline.

## Portfolio context

React Chess complements my Python/Pygame and C#/.NET chess projects. Together, they show how the same rules-heavy domain can be modeled through three different languages, UI frameworks, and state-management approaches. The White-versus-AI work also demonstrates React effect-driven behavior, functional state updates, timer cleanup, and incremental extension of an existing domain model.
