import React, { useRef, useState, useEffect  } from 'react';

function Whiteboard() {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(2);
    const [dimensions, setDimensions] = useState({ height: 500, width: 500 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }, [dimensions])

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.strokeStyle = color;
        context.lineWidth = brushSize;
        context.lineCap = 'round';

    }, [color, brushSize])

    const startDrawing = (event) => {
        const { offsetX, offsetY } = event.nativeEvent;
        setIsDrawing(true);
        setLastPosition({ x: offsetX, y: offsetY });
        
    };

    const stopDrawing = (event) => {
        setIsDrawing(false)
    }

    const draw = (event) => {
        if (!isDrawing) return;

        const { offsetX, offsetY } = event.nativeEvent;
        const ctx = canvasRef.current.getContext('2d');

        ctx.beginPath();
        ctx.moveTo(lastPosition.x, lastPosition.y);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();

        setLastPosition({ x: offsetX, y: offsetY });
    }

    const resetCanvas = (event) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    return (
    <div>
        <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onMouseMove={draw}
            style={{ border: '2px solid #000000'}}
        />
        <div>
            <input
                type='color'
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
            <input 
                type='range'
                min='1'
                max='20'
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
            />
            <button onClick={resetCanvas}>Clear</button>
        </div>
    </div>
    );
};

export default Whiteboard;