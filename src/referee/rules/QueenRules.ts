import {Position, TeamType, Piece, samePosition } from '../../Constants';
import { tileIsOccupied, tileIsEmptyOrOccupiedByOpponent } from './GeneralRules';

export const queenMove = (
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ):boolean => {
    
    for (let i = 1; i < 8; i ++){
    
      let multiplierX; 
      let multiplierY;

      if (desiredPosition.x < initialPosition.x){
        multiplierX = -1;
      } else if(desiredPosition.x > initialPosition.x){
        multiplierX = 1;
      } else {
        multiplierX = 0;
      }
      
      if(desiredPosition.y < initialPosition.y){
        multiplierY = -1;
      } else if(desiredPosition.y > initialPosition.y){
        multiplierY = 1;
      } else {
        multiplierY = 0;
      }
      
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