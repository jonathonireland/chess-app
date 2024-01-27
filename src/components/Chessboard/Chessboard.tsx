import { useRef, useState } from "react";
import Tile from "../Tile/Tile";
import './Chessboard.css';
import Referee from '../../referee/Referee';

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export interface Piece {
    image: string;
    x: number;
    y: number;
    type: PieceType;
    team: TeamType;
}

export enum TeamType{
    /*0*/ OPPONENT,
    /*1*/ OUR
}

export enum PieceType{
    /*0*/ PAWN,
    /*1*/ BISHOP,
    /*2*/ KNIGHT,
    /*3*/ ROOK,
    /*4*/ QUEEN,
    /*5*/ KING
}

const initialBoardState: Piece[] = [];

/** ROOKS, KNIGHTS, BISHOPS, QUEENS, KINGS */
for (let p = 0; p < 2; p++) {
    const teamType = (p === 0) ? TeamType.OPPONENT : TeamType.OUR;
    const type = (teamType === TeamType.OPPONENT) ? "b" : "w";
    const y = (teamType === TeamType.OPPONENT) ? 7 : 0;
    initialBoardState.push({image: `assets/images/rook_${type}.png`, x:0, y, type: PieceType.ROOK, team: teamType});
    initialBoardState.push({image: `assets/images/rook_${type}.png`, x:7, y, type: PieceType.ROOK, team: teamType});
    initialBoardState.push({image: `assets/images/knight_${type}.png`, x:1, y, type: PieceType.KNIGHT, team: teamType});
    initialBoardState.push({image: `assets/images/knight_${type}.png`, x:6, y, type: PieceType.KNIGHT, team: teamType});
    initialBoardState.push({image: `assets/images/bishop_${type}.png`, x:2, y, type: PieceType.BISHOP, team: teamType});
    initialBoardState.push({image: `assets/images/bishop_${type}.png`, x:5, y, type: PieceType.BISHOP, team: teamType});
    initialBoardState.push({image: `assets/images/queen_${type}.png`, x:3, y, type: PieceType.QUEEN, team: teamType});
    initialBoardState.push({image: `assets/images/king_${type}.png`, x:4, y, type: PieceType.KING, team: teamType});
}

 // PAWNS
/** Black Pawns */
for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: "/assets/images/pawn_b.png", x: i, y: 6, type: PieceType.PAWN, team: TeamType.OPPONENT });
}
/** White Pawns */
for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: "/assets/images/pawn_w.png", x: i, y: 1, type: PieceType.PAWN, team: TeamType.OUR });
}

export default function Chessboard() {
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState) 
    const chessboardRef = useRef<HTMLDivElement>(null);
    const referee = new Referee();

    function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>){
        const chessboard = chessboardRef.current;
        const element = e.target as HTMLElement;
        if (element.classList.contains("chess-piece") && chessboard){
            setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
            setGridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)));

            const mouseX = e.clientX - 50;
            const mouseY = e.clientY - 50;
            element.style.position = "absolute";
            element.style.left = `${mouseX}px`;
            element.style.top = `${mouseY}px`;
            
            setActivePiece(element);
        }
    }

    function movePiece(e: React.MouseEvent){
        const chessboard = chessboardRef.current;
        if (activePiece && chessboard){
            const minX = chessboard.offsetLeft -25;
            const minY = chessboard.offsetTop -25;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth -75;
            const maxY = chessboard.offsetTop + chessboard.clientHeight -75;
            const x = e.clientX -50;
            const y = e.clientY -50;
            activePiece.style.position = "absolute";
            
            // if x is smaller than the minimum amount
            if(x < minX) {
                activePiece.style.left = `${minX}px`;
            // if x is bigger than the maximum amount
            } else if( x > maxX) {
                activePiece.style.left = `${maxX}px`;
            // if x is in the constraints 
            } else {
                activePiece.style.left = `${x}px`;
            }
            
            // if y is smaller than the minimum amount
            if(y < minY) {
                activePiece.style.top = `${minY}px`;
            // if y is bigger than the maximum amount
            } else if( y > maxY) {
                activePiece.style.top = `${maxY}px`;
            // if y is in the constraints 
            } else {
                activePiece.style.top = `${y}px`;
            }
        }
    }

    function dropPiece(e: React.MouseEvent){
        const chessboard = chessboardRef.current;
        if(activePiece && chessboard){
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop -800) / 100));

            const currentPiece = pieces.find(p => p.x === gridX && p.y === gridY);
            const attackedPiece = pieces.find(p => p.x === x && p.y === y);

            if(currentPiece) {
                const validMove = referee.isValidMove(gridX, gridY, x, y, currentPiece.type, currentPiece.team, pieces);

                // REDUCE FUNCTION
                // RESULTS => Array of results
                // PIECE => the current piece we are handling
                if(validMove){
                    // Updates the piece position 
                    const updatedPieces = pieces.reduce((results, piece) => {
                        if(piece.x === currentPiece.x && piece.y === currentPiece.y){
                            piece.x = x;
                            piece.y = y;
                            results.push(piece);
                        } else if(!(piece.x === x && piece.y === y)) {
                            results.push(piece);
                        }
                        return results;
                    }, [] as Piece[]);

                    setPieces(updatedPieces);

                    // // And if a piece is attacked, remove the piece
                    // setPieces( (value) => {
                    //     const pieces = value.reduce((results, piece) => {
                    //         if(piece.x === currentPiece.x && piece.y === currentPiece.y){
                    //             piece.x = x;
                    //             piece.y = y;
                    //             results.push(piece);
                    //         } else if(!(piece.x === x && piece.y === y)) {
                    //             results.push(piece);
                    //         }

                    //         return results;
                    //     }, [] as Piece[]);
                        
                    //     return pieces
                    // })

                } else {
                    // Resets the piece position 
                    activePiece.style.position = 'relative';
                    activePiece.style.removeProperty('top');
                    activePiece.style.removeProperty('left')
                }
            }
            setActivePiece(null);
        }
    }

    let board = [];
    for(let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i=0; i < horizontalAxis.length; i++) {
            const number = j + i + 2;
            let image = undefined;

            pieces.forEach((p) => {
                if (p.x === i && p.y === j) {
                    image = p.image
                }
            });

            board.push(<Tile key={`${j},${i}`} image={image} number={number} />);

        }
    }
    return (
        <div 
            onMouseMove={(e)=> movePiece(e)} 
            onMouseDown={(e)=> grabPiece(e)} 
            onMouseUp={(e)=>dropPiece(e)}
            id="chessboard"
            ref={chessboardRef}
        >
            {board}
        </div>
    );
}
