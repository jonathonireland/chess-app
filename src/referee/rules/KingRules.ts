import {Position, TeamType, Piece, samePosition } from '../../Constants';
import { tileIsOccupied, tileIsOccupiedByOpponent, tileIsEmptyOrOccupiedByOpponent } from './GeneralRules';

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

  export const getPossibleKingMoves = (king: Piece, boardState: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];

    // Top Movement
    for (let i = 1; i < 2; i++)
    {
      const destination: Position = {x: king.position.x, y: king.position.y + i};
			
			if (!tileIsOccupied(destination, boardState))
			{
				possibleMoves.push(destination);
			} else if(tileIsOccupiedByOpponent(destination, boardState, king.team)) {
				possibleMoves.push(destination);
			} else {
				break;
			}
    }
    
    // Bottom Movement
    for (let i = 1; i < 2; i++)
    {
      const destination: Position = {x: king.position.x, y: king.position.y - i};
			
			if (!tileIsOccupied(destination, boardState))
			{
				possibleMoves.push(destination);
			} else if(tileIsOccupiedByOpponent(destination, boardState, king.team)) {
				possibleMoves.push(destination);
			} else {
				break;
			}
    }

    // Left Movement
    for (let i = 1; i < 2; i++)
    {
      const destination: Position = {x: king.position.x - i, y: king.position.y};
      
      if (!tileIsOccupied(destination, boardState))
      {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardState, king.team)) {
        possibleMoves.push(destination);
      } else {
        break;
      }
    }

    // Right Movement
    for (let i = 1; i < 2; i++)
    {
      const destination: Position = {x: king.position.x + i, y: king.position.y};
      
      if (!tileIsOccupied(destination, boardState))
      {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardState, king.team)) {
        possibleMoves.push(destination);
      } else {
        break;
      }
    }

    // Top right movement
    for (let i = 1; i < 2; i++)
    {
			const destination: Position = {x: king.position.x + i, y: king.position.y + i};
			
			if (!tileIsOccupied(destination, boardState))
			{
				possibleMoves.push(destination);
			} else if(tileIsOccupiedByOpponent(destination, boardState, king.team)) {
				possibleMoves.push(destination);
			} else {
				break;
			}
    }

		// Bottom right movement
    for (let i = 1; i < 2; i++)
    {
			const destination: Position = {x: king.position.x + i, y: king.position.y - i};
			
			if (!tileIsOccupied(destination, boardState))
			{
				possibleMoves.push(destination);
			} else if(tileIsOccupiedByOpponent(destination, boardState, king.team)) {
				possibleMoves.push(destination);
			} else {
				break;
			}
    }

		// Top left movement
		for (let i = 1; i < 2; i++)
		{
			const destination: Position = {x: king.position.x - i, y: king.position.y - i};

			if (!tileIsOccupied(destination, boardState))
			{
				possibleMoves.push(destination);
			} else if(tileIsOccupiedByOpponent(destination, boardState, king.team)) {
				possibleMoves.push(destination);
			} else {
				break;
			}
		}
		
		// Bottom left movement
		for (let i = 1; i < 2; i++)
		{
			const destination: Position = {x: king.position.x - i, y: king.position.y + i};

			if (!tileIsOccupied(destination, boardState))
			{
				possibleMoves.push(destination);
			} else if(tileIsOccupiedByOpponent(destination, boardState, king.team)) {
				possibleMoves.push(destination);
			} else {
				break;
			}
		}

    return possibleMoves;
  }