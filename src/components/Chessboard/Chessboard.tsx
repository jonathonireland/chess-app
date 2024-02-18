import { useRef, useState } from "react";
import Tile from "../Tile/Tile";
import './Chessboard.css';
import { 
    HORIZONTAL_AXIS, 
    VERTICAL_AXIS, 
    GRID_SIZE, 
    BOARD_SIZE, 
    Piece, 
    Position,
    samePosition
} from '../../Constants'; 

interface Props {
    playMove: (piece: Piece, destination: Position) => boolean;
    pieces: Piece[];
}

export default function Chessboard({ playMove, pieces }: Props) {
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [grabPosition, setGrabPosition] = useState<Position>({ x: -1, y: -1 });
    const chessboardRef = useRef<HTMLDivElement>(null);

    function grabPiece(
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) {
        const element = e.target as HTMLElement;
        const chessboard = chessboardRef.current;
        if (
            element.classList.contains("chess-piece") &&
            chessboard
        ) {
            const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
            const grabY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - BOARD_SIZE) / GRID_SIZE));
				
            setGrabPosition({ x: grabX, y: grabY });

            const mouseX = e.clientX - GRID_SIZE / 2;
            const mouseY = e.clientY - GRID_SIZE / 2;
            element.style.position = "absolute";
            element.style.left = `${mouseX}px`;
            element.style.top = `${mouseY}px`;
				
            setActivePiece(element);
        }
    }

    function movePiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current;
        if (activePiece && chessboard) {
            const minX = chessboard.offsetLeft - 25;
            const minY = chessboard.offsetTop - 25;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
            const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
            const x = e.clientX - GRID_SIZE / 2;
            const y = e.clientY - GRID_SIZE / 2;
            activePiece.style.position = "absolute";
				
            // if x is smaller than the minimum amount
            if (x < minX) {
                activePiece.style.left = `${minX}px`;
                // if x is bigger than the maximum amount
            } else if (x > maxX) {
                activePiece.style.left = `${maxX}px`;
                // if x is in the constraints 
            } else {
                activePiece.style.left = `${x}px`;
            }
				
            // if y is smaller than the minimum amount
            if (y < minY) {
                activePiece.style.top = `${minY}px`;
                // if y is bigger than the maximum amount
            } else if (y > maxY) {
                activePiece.style.top = `${maxY}px`;
                // if y is in the constraints 
            } else {
                activePiece.style.top = `${y}px`;
            }
        }
    }

    function dropPiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current;
        if (activePiece && chessboard) {
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - BOARD_SIZE) / GRID_SIZE));
    
            const currentPiece = pieces.find(
                (p) => samePosition(p.position, grabPosition)
            );
    
            if (currentPiece) {
                var success = playMove(currentPiece, { x, y });
    
                if (!success) {
                    // Resets the piece position 
                    activePiece.style.position = 'relative';
                    activePiece.style.removeProperty('top');
                    activePiece.style.removeProperty('left')
                }
                setActivePiece(null);
            }
        }
    
        let board = [];
        for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
            for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
                const number = j + i + 2;
                let piece = pieces.find(p => samePosition(p.position, { x: i, y: j }));
                let image = piece ? piece.image : undefined;
    
                let currentPiece = activePiece != null ? pieces.find(p => samePosition(p.position, grabPosition)) : undefined;
    
                let highlight = currentPiece?.possibleMoves ? currentPiece.possibleMoves.some(p => samePosition(p, { x: i, y: j })) : false;
    
                board.push(<Tile key={`${j},${i}`} image={image} number={number} highlight={highlight} />);
    
            }
        }
        
        // Return the JSX elements containing the chessboard and its tiles
        return (
            <div
                onMouseMove={(e) => movePiece(e)}
                onMouseDown={(e) => grabPiece(e)}
                onMouseUp={(e) => dropPiece(e)}
                id="chessboard"
                ref={chessboardRef}
            >
                {board}
            </div>
        );
    }
}
