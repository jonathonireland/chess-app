import {Position, TeamType, Piece, samePosition } from '../../Constants';
import { tileIsOccupied, tileIsEmptyOrOccupiedByOpponent } from './GeneralRules';

export const kingMove = (
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ):boolean => {
    
    for (let i = 1; i < 2; i ++){
    
      let multiplierX = (desiredPosition.x < initialPosition.x) ? -1 : (desiredPosition.x > initialPosition.x) ? 1 : 0; 
      let multiplierY = (desiredPosition.y < initialPosition.y) ? -1 : (desiredPosition.y > initialPosition.y) ? 1 : 0;
      
      let passedPosition: Position = {x: initialPosition.x + (i * multiplierX), y: initialPosition.y + (i * multiplierY)};
      if(samePosition(passedPosition, desiredPosition)){
          // destination tile
          if(tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)){
              return true;
          }
      } else {
          // passing tile
          if(tileIsOccupied(passedPosition, boardState)){
              break;
          }
      }
    }
    return false;
  }