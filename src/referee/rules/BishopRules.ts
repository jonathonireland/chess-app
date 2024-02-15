import { Position, TeamType, Piece, samePosition } from '../../Constants';
import { tileIsOccupied, tileIsOccupiedByOpponent, tileIsEmptyOrOccupiedByOpponent } from './GeneralRules';

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

export const getPossibleBishopMoves = (bishop: Piece, boardState: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];
		// Top right movement
    for (let i = 1; i < 8; i++)
    {
			const destination: Position = {x: bishop.position.x + i, y: bishop.position.y + i};
			
			if (!tileIsOccupied(destination, boardState))
			{
				possibleMoves.push(destination);
			} else if(tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
				possibleMoves.push(destination);
			} else {
				break;
			}
    }

		// Bottom right movement
    for (let i = 1; i < 8; i++)
    {
			const destination: Position = {x: bishop.position.x + i, y: bishop.position.y - i};
			
			if (!tileIsOccupied(destination, boardState))
			{
				possibleMoves.push(destination);
			} else if(tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
				possibleMoves.push(destination);
			} else {
				break;
			}
    }

		// Top left movement
		for (let i = 1; i < 8; i++)
		{
			const destination: Position = {x: bishop.position.x - i, y: bishop.position.y - i};

			if (!tileIsOccupied(destination, boardState))
			{
				possibleMoves.push(destination);
			} else if(tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
				possibleMoves.push(destination);
			} else {
				break;
			}
		}
		
		// Bottom left movement
		for (let i = 1; i < 8; i++)
		{
			const destination: Position = {x: bishop.position.x - i, y: bishop.position.y + i};

			if (!tileIsOccupied(destination, boardState))
			{
				possibleMoves.push(destination);
			} else if(tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
				possibleMoves.push(destination);
			} else {
				break;
			}
		}

    return possibleMoves;
}  
