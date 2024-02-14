import { Position, TeamType, Piece, samePosition } from '../../Constants';
import { tileIsOccupied, tileIsEmptyOrOccupiedByOpponent } from './GeneralRules';

export const bishopMove = (
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[] 
  ):boolean => {
      for (let i = 1; i < 8; i++)
      {
          // Top Right Movement
          if(desiredPosition.x  > initialPosition.x && desiredPosition.y > initialPosition.y){
              let passedPosition: Position = {x: initialPosition.x + i, y: initialPosition.y + i};
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
          
          // Bottom Right Movement
          if(desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y){
              let passedPosition: Position = {x: initialPosition.x + i, y: initialPosition.y - i};
              // Check if the tile is the destination tile
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

          // Bottom Left Movement
          if (desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y){
              let passedPosition: Position = {x: initialPosition.x - i, y: initialPosition.y - i};
              // Check if the tile is the destination tile
              if(samePosition(passedPosition, desiredPosition)){
                  // destination tile
                  if(tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)){
                      return true;
                  }
              } else {
                  if(tileIsOccupied(passedPosition, boardState)){
                      break;
                  }
              }
          }
          
          // Top Left Movement
          if (desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y){
              let passedPosition: Position = {x: initialPosition.x - i, y: initialPosition.y + i};
              // Check if the tile is the destination tile
              if(samePosition(passedPosition, desiredPosition)){
                  // destination tile
                  if(tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)){
                      return true;
                  }
              } else {
                  if(tileIsOccupied(passedPosition, boardState)){
                      break;
                  }
              }
          }
      }
  
    return false;
  }
