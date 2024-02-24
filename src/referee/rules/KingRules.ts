import { TeamType } from '../../Types';
import { Piece, Position } from '../../models';
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
      
      let passedPosition: Position = new Position(initialPosition.x + (i * multiplierX), initialPosition.y + (i * multiplierY));
      if(passedPosition.samePosition(desiredPosition)){
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
      const destination: Position = new Position(king.position.x, king.position.y + i);
			
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
      const destination = new Position(king.position.x, king.position.y - i);
			
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
      const destination = new Position(king.position.x - i, king.position.y);
      
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
      const destination = new Position(king.position.x + i, king.position.y);
      
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
			const destination = new Position(king.position.x + i, king.position.y + i);
			
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
			const destination = new Position(king.position.x + i, king.position.y - i);
			
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
			const destination = new Position(king.position.x - i, king.position.y - i);

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
			const destination = new Position(king.position.x - i, king.position.y + i);

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

// In this method the enemy moves have already been calculated
export const getCastlingMoves = (king: Piece, boardState: Piece[]): Position[] => {
  const possibleMoves: Position[] = [];
  
  if (king.hasMoved) return possibleMoves;
  
  // We get the rooks from the king's team which haven't moved
  const rooks = boardState.filter(p => p.isRook && p.team === king.team && !p.hasMoved);

  // Loop through the rooks
  for (const rook of rooks) {
    // Determine if we need to go to right or to the left side
    const direction = (rook.position.x - king.position.x > 0) ? 1 : -1;
    const adjacentPosition = king.position.clone();
    adjacentPosition.x -= direction;
    
    if (rook.possibleMoves?.some(m => m.samePosition(adjacentPosition))) continue;
    
    const concerningTiles = rook.possibleMoves?.filter(m => m.y === king.position.y);
    
    const enemyPieces = boardState.filter(p => p.team !== king.team);

    let valid = true;

    for (const enemy of enemyPieces) { 
      if (enemy.possibleMoves === undefined) continue;

      // for (const move of enemy.possibleMoves) {
      //   if (concerningTiles?.some(t => t.samePosition(move))) {
      //     valid = false;
      //   }
      //   if (!valid)
      //   break;
      // }
      // check if any of the possible moves the enemy has is present in the 
      // concerning tiles array
      if (enemy.possibleMoves?.some(m => concerningTiles?.some(t => t.samePosition(m)))) {
        valid = false;
      }
      // if (enemyPieces.some(p => p.possibleMoves?.some(m => concerningTiles?.some(t => t.samePosition(m))))) continue;

      if (!valid)
        break;

      // we now want to add it as a possible move!
      possibleMoves.push(rook.position.clone());

    }
    if (!valid) continue;
  }
  

  return possibleMoves;
}