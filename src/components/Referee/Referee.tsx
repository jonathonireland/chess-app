import { useEffect, useRef, useState } from "react";
import { initialBoard } from "../../Constants";
import Chessboard from "../Chessboard/Chessboard";
import { bishopMove, getPossibleBishopMoves, getPossibleKingMoves, getPossibleKnightMoves, getPossiblePawnMoves, getPossibleQueenMoves, getPossibleRookMoves, kingMove, knightMove, pawnMove, queenMove, rookMove } from "../../referee/rules";
import { Piece, Position } from "../../models";
import { PieceType, TeamType } from "../../Types";
import { Pawn } from "../../models/Pawn";
import { Board } from "../../models/Board";

export default function Referee() { 
  const [board, setBoard] = useState<Board>(initialBoard);
  const [promotionPawn, setPromotionPawn] = useState<Piece>();
  const modalRef = useRef<HTMLDivElement>(null); 
  
  useEffect(() => { 
    updatePossibleMoves();
  },[]);

  function updatePossibleMoves() {
    board.calculateAllMoves();
  }

  function playMove(playedPiece: Piece, destination: Position): boolean {
    if (playedPiece.possibleMoves === undefined) return false;
    
    let playedMoveIsValid = false;

    const validMove = playedPiece.possibleMoves?.some(m => m.samePosition(destination));

    if (!validMove) return false;
    
    const enPassantMove = isEnPassantMove(
      playedPiece.position,
      destination,
      playedPiece.type, 
      playedPiece.team
    );

    // playmove modifies the board ths we 
    // need to call setBoard
    setBoard((previousBoard) => {
      // Playing the move
      playedMoveIsValid = board.playMove(
        enPassantMove,
        validMove,
        playedPiece,
        destination);
      
      return board.clone();
    });
    
    // This is for promoting a pawn
    let promotionRow = (playedPiece.team === TeamType.OUR) ? 7 : 0;
    if(destination.y === promotionRow && playedPiece.isPawn){
      modalRef.current?.classList.remove("hidden");
      setPromotionPawn((previousPromotionPawn) => { 
        const clonedPlayedPiece = playedPiece.clone();
        clonedPlayedPiece.position = destination.clone();
        return clonedPlayedPiece;
      });
    }
    
    return playedMoveIsValid;
  }

  function isEnPassantMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType
  ){
    const pawnDirection = team === TeamType.OUR ? 1 : -1;

      if (type === PieceType.PAWN){
        if (
          (desiredPosition.x - initialPosition.x === -1 || desiredPosition.x - initialPosition.x === 1) && 
          desiredPosition.y - initialPosition.y === pawnDirection
        ) {
        const piece = board.pieces.find(
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
      const clonedBoard = board.clone();

      clonedBoard.pieces = clonedBoard.pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(promotionPawn)) {
          results.push(new Piece(piece.position.clone(), pieceType, piece.team));
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

  return (
    <>
      <div id="pawn-promotion-modal" className="hidden" ref={modalRef}>
          <div className="modal-body">
              <img onClick={() => promotePawn(PieceType.ROOK)} src={`/assets/images/rook_${promotionTeamType()}.png`} alt="Rook Piece" />
              <img onClick={() => promotePawn(PieceType.BISHOP)} src={`/assets/images/bishop_${promotionTeamType()}.png`} alt="Bishop Piece" />
              <img onClick={() => promotePawn(PieceType.KNIGHT)} src={`/assets/images/knight_${promotionTeamType()}.png`} alt="Knight Piece" />
              <img onClick={() => promotePawn(PieceType.QUEEN)} src={`/assets/images/queen_${promotionTeamType()}.png`} alt="Queen Piece" />
          </div>
      </div>
      <Chessboard playMove={playMove}
        pieces={board.pieces} />
    </>
  );
}