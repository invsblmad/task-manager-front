import React from "react";
import { useDraggable } from "@dnd-kit/core";

export const DraggableCard = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id,
        });

    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
        opacity: isDragging ? 0.5 : 1,
        background: "#fff",
        padding: "1rem",
        marginBottom: "0.5rem",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        cursor: "grab",
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </div>
    );
};
