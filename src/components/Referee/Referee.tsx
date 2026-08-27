import { useEffect, useRef, useState } from "react";
import { initialBoard } from "../../Constants";
import Chessboard from "../Chessboard/Chessboard";
import { bishopMove, kingMove, knightMove, pawnMove, queenMove, rookMove } from "../../referee/rules";
import { Piece, Position } from "../../models";
import { PieceType, TeamType } from "../../Types";
import { Pawn } from "../../models/Pawn";
import { Board } from "../../models/Board";

interface LegalMove {
  piece: Piece;
  destination: Position;
}

function getLegalMoves(board: Board, team: TeamType): LegalMove[] {
  return board.pieces
    .filter(piece => piece.team === team)
    .flatMap(piece =>
      (piece.possibleMoves ?? []).map(destination => ({
        piece,
        destination
      }))
    );
}

function isEnPassantMove(
  currentBoard: Board,
  initialPosition: Position,
  desiredPosition: Position,
  type: PieceType,
  team: TeamType
): boolean {
    const pawnDirection = team === TeamType.OUR ? 1 : -1;

    if (type === PieceType.PAWN){
      if (
        (desiredPosition.x - initialPosition.x === -1 || desiredPosition.x - initialPosition.x === 1) && 
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
      const piece = currentBoard.pieces.find(
        (p) => 
          p.position.x === desiredPosition.x && 
          p.position.y === desiredPosition.y - pawnDirection && 
          p.isPawn &&
          (p as Pawn).enPassant
      );
      if(piece){
        return true;
      }
    }
  }
  return false;
}

export default function Referee() { 
  const [board, setBoard] = useState<Board>(initialBoard);
  const [promotionPawn, setPromotionPawn] = useState<Piece>();
  const modalRef = useRef<HTMLDivElement>(null); 
  const checkmateModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      board.currentTeam !== TeamType.OPPONENT ||
      board.winningTeam !== undefined
    ) {
      return;
    }

    const legalMoves = getLegalMoves(board, TeamType.OPPONENT);

    console.log(`The Black AI has ${legalMoves.length} legal moves.`);

    if (legalMoves.length === 0) return;

    const randomIndex = Math.floor(Math.random() * legalMoves.length);
    const selectedMove = legalMoves[randomIndex];

    console.log("The Black AI selected:", {
      piece: selectedMove.piece.type,
      from: `(${selectedMove.piece.position.x}, ${selectedMove.piece.position.y})`,
      to: `(${selectedMove.destination.x}, ${selectedMove.destination.y})`
    });

    const aiMoveTimer = window.setTimeout(() => {
      setBoard(previousBoard => {
        // Protect against executing a stale AI move.
        if (previousBoard.currentTeam !== TeamType.OPPONENT) {
          return previousBoard;
        }

        const clonedBoard = previousBoard.clone();
        clonedBoard.totalTurns += 1;

        clonedBoard.playMove(
          false,
          true,
          selectedMove.piece,
          selectedMove.destination
        );

        return clonedBoard;
      });
    }, 600);

    return () => window.clearTimeout(aiMoveTimer);
  }, [board]);

  function playMove(playedPiece: Piece, destination: Position): boolean {
    if(playedPiece.team !== TeamType.OUR ) return false;
    // if the playing piece doesn't have any moves, return
    if (playedPiece.possibleMoves === undefined) return false;
    // prevent the inactive team from playing
    if (playedPiece.team === TeamType.OUR && board.totalTurns % 2 !== 1) return false;
    if (board.totalTurns % 2 !== 1) return false;

    
    let playedMoveIsValid = false;

    const validMove = playedPiece.possibleMoves.some(move =>
      move.samePosition(destination)
    );

    if (!validMove) return false;

    setBoard(previousBoard => {
      const enPassantMove = isEnPassantMove(
        previousBoard,
        playedPiece.position,
        destination,
        playedPiece.type,
        playedPiece.team
      );

      const clonedBoard = previousBoard.clone();
      clonedBoard.totalTurns += 1;

      playedMoveIsValid = clonedBoard.playMove(
        enPassantMove,
        validMove,
        playedPiece,
        destination
      );

      if (clonedBoard.winningTeam !== undefined) {
        checkmateModalRef.current?.classList.remove("hidden");
      }

      return clonedBoard;
    });
    
    // This is for promoting a pawn
    let promotionRow = (playedPiece.team === TeamType.OUR) ? 7 : 0;
    if (
      destination.y === promotionRow &&
      playedPiece.isPawn
    ) {
      modalRef.current?.classList.remove("hidden");
      setPromotionPawn((previousPromotionPawn) => { 
        const clonedPlayedPiece = playedPiece.clone();
        clonedPlayedPiece.position = destination.clone();
        return clonedPlayedPiece;
      });
    }
    
    return playedMoveIsValid;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType, 
    team: TeamType
  ) {
      let validMove = false;
      switch(type){
        case PieceType.PAWN:
          validMove = pawnMove(initialPosition, desiredPosition, team, board.pieces);
          break;
        case PieceType.KNIGHT:
          validMove = knightMove(initialPosition, desiredPosition, team, board.pieces);
          break;
        case PieceType.BISHOP:
          validMove = bishopMove(initialPosition, desiredPosition, team, board.pieces);
          break;
        case PieceType.ROOK:
          validMove = rookMove(initialPosition, desiredPosition, team, board.pieces);
          break;
        case PieceType.QUEEN:
          validMove = queenMove(initialPosition, desiredPosition, team, board.pieces);
          break;
        case PieceType.KING:
          validMove = kingMove(initialPosition, desiredPosition, team, board.pieces);
      }
    return validMove;
  }

  function promotePawn(pieceType: PieceType){
    if(promotionPawn === undefined){
        return;
    }
    setBoard((previousBoard) => { 
      const clonedBoard = previousBoard.clone();

      clonedBoard.pieces = clonedBoard.pieces.reduce(
        (results, piece) => {
          if (piece.samePiecePosition(promotionPawn)) {
            results.push(new Piece(piece.position.clone(), pieceType, piece.team, true));
          } else {
            results.push(piece);
          }
          results.push(piece);
          return results;
        }, [] as Piece[]);
    
      clonedBoard.calculateAllMoves();
      return clonedBoard;
    })
    
    modalRef.current?.classList.add("hidden");
  }

  function promotionTeamType(){
    return promotionPawn?.team === TeamType.OUR ? "w" : "b";
  } 

  function restartGame() {
    checkmateModalRef.current?.classList.add("hidden");
    setBoard(initialBoard.clone());
  }


  return (
    <>
      <p style={{ color: "white", fontSize: "24px" }}>{board.totalTurns} {board.totalTurns % 2 === 0 ? `Black Player: Make Your Move`:`White Player: Make Your Move` }</p>
      <div className="modal hidden" ref={modalRef}>
          <div className="modal-body">
              <img onClick={() => promotePawn(PieceType.ROOK)} src={`${process.env.PUBLIC_URL}/assets/images/rook_${promotionTeamType()}.png`} alt="Rook Piece" />
              <img onClick={() => promotePawn(PieceType.BISHOP)} src={`${process.env.PUBLIC_URL}/assets/images/bishop_${promotionTeamType()}.png`} alt="Bishop Piece" />
              <img onClick={() => promotePawn(PieceType.KNIGHT)} src={`${process.env.PUBLIC_URL}/assets/images/knight_${promotionTeamType()}.png`} alt="Knight Piece" />
              <img onClick={() => promotePawn(PieceType.QUEEN)} src={`${process.env.PUBLIC_URL}/assets/images/queen_${promotionTeamType()}.png`} alt="Queen Piece" />
          </div>
      </div>
      <div className="modal hidden" ref={checkmateModalRef}>
        <div className="modal-body">
          <div className="checkmate-body">
            <span>The winning team is {board.winningTeam === TeamType.OUR ? "white" : "black"}!</span>
            <button onClick={restartGame}>Play Again</button>
          </div>
        </div>
      </div>
      <Chessboard playMove={playMove}
        pieces={board.pieces} />
    </>
  );
}