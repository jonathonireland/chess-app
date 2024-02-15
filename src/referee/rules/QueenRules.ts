import {Position, TeamType, Piece, samePosition } from '../../Constants';
import { tileIsOccupied, tileIsOccupiedByOpponent, tileIsEmptyOrOccupiedByOpponent } from './GeneralRules';

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

  export const getPossibleQueenMoves = (queen: Piece, boardState: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];

    // Top Movement
    for (let i = 1; i < 8; i++)
    {
      const destination: Position = {x: queen.position.x, y: queen.position.y + i};
			
			if (!tileIsOccupied(destination, boardState))
			{
				possibleMoves.push(destination);
			} else if(tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
				possibleMoves.push(destination);
			} else {
				break;
			}
    }
    
    // Bottom Movement
    for (let i = 1; i < 8; i++)
    {
      const destination: Position = {x: queen.position.x, y: queen.position.y - i};
			
			if (!tileIsOccupied(destination, boardState))
			{
				possibleMoves.push(destination);
			} else if(tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
				possibleMoves.push(destination);
			} else {
				break;
			}
    }

    // Left Movement
    for (let i = 1; i < 8; i++)
    {
      const destination: Position = {x: queen.position.x - i, y: queen.position.y};
      
      if (!tileIsOccupied(destination, boardState))
      {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
        possibleMoves.push(destination);
      } else {
        break;
      }
    }

    // Right Movement
    for (let i = 1; i < 8; i++)
    {
      const destination: Position = {x: queen.position.x + i, y: queen.position.y};
      
      if (!tileIsOccupied(destination, boardState))
      {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
        possibleMoves.push(destination);
      } else {
        break;
      }
    }

    // Top right movement
    for (let i = 1; i < 8; i++)
    {
			const destination: Position = {x: queen.position.x + i, y: queen.position.y + i};
			
			if (!tileIsOccupied(destination, boardState))
			{
				possibleMoves.push(destination);
			} else if(tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
				possibleMoves.push(destination);
			} else {
				break;
			}
    }

		// Bottom right movement
    for (let i = 1; i < 8; i++)
    {
			const destination: Position = {x: queen.position.x + i, y: queen.position.y - i};
			
			if (!tileIsOccupied(destination, boardState))
			{
				possibleMoves.push(destination);
			} else if(tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
				possibleMoves.push(destination);
			} else {
				break;
			}
    }

		// Top left movement
		for (let i = 1; i < 8; i++)
		{
			const destination: Position = {x: queen.position.x - i, y: queen.position.y - i};

			if (!tileIsOccupied(destination, boardState))
			{
				possibleMoves.push(destination);
			} else if(tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
				possibleMoves.push(destination);
			} else {
				break;
			}
		}
		
		// Bottom left movement
		for (let i = 1; i < 8; i++)
		{
			const destination: Position = {x: queen.position.x - i, y: queen.position.y + i};

			if (!tileIsOccupied(destination, boardState))
			{
				possibleMoves.push(destination);
			} else if(tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
				possibleMoves.push(destination);
			} else {
				break;
			}
		}

    return possibleMoves;
  }