import { PieceType, TeamType } from "../Types";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class Pawn extends Piece { 
  constructor(position: Position, team: TeamType) { 
    super(position, PieceType.PAWN, team);
  }
}