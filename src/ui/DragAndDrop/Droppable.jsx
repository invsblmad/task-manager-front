import React from "react";
import { useDroppable } from "@dnd-kit/core";

export const Droppable = ({ id, children, taskCount }) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            style={{
                minHeight: taskCount > 0 ? "auto" : "10vh",
                margin: "0 20px 20px 20px",
                padding: "1rem",
                backgroundColor: "var(--brand-primary)",
                borderRadius: "8px",
                minWidth: "300px",
                maxWidth: "300px",
            }}
        >
            {children}
        </div>
    );
};
