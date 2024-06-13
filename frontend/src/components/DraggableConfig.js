import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const DraggableConfig = ({ id, index, moveConfig, children, style }) => {
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: ItemTypes.CONFIG,
        hover(item) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            moveConfig(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CONFIG,
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <div ref={ref} style={{ ...style, opacity: isDragging ? 0.5 : 1, position: 'absolute' }}>
            {children}
        </div>
    );
};

export default DraggableConfig;
