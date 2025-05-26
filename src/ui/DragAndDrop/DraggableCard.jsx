import React from "react";
import { useDraggable } from "@dnd-kit/core";
import epic from "@assets/icons/type/epic.svg";
import improvement from "@assets/icons/type/improvement.svg";
import task from "@assets/icons/type/task.svg";
import bug from "@assets/icons/type/bug.svg";
import subtask from "@assets/icons/type/subtask.svg";
import high from "@assets/icons/priority/high.svg";
import highest from "@assets/icons/priority/highest.svg";
import low from "@assets/icons/priority/low.svg";
import lowest from "@assets/icons/priority/lowest.svg";

const typeIcons = {
    epic: epic,
    improvement: improvement,
    bug: bug,
    subtask: subtask,
    task: task,
};

const priorityIcons = {
    high: high,
    highest: highest,
    low: low,
    lowest: lowest,
};

export const DraggableCard = ({
    id,
    issueKey,
    title,
    user,
    type,
    priority,
    onClick,
}) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({ id });

    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
        opacity: isDragging ? 0.85 : 1,
        background: "#f4f5f7",
        padding: "8px 12px",
        marginBottom: "8px",
        borderRadius: "4px",
        boxShadow: isDragging
            ? "0 4px 8px rgba(0, 0, 0, 0.15)"
            : "0 1px 2px rgba(9, 30, 66, 0.25)",
        cursor: "pointer",
        transition: "box-shadow 0.2s ease",
        fontSize: "14px",
        color: "#172b4d",
        lineHeight: "1.4",
        display: "flex",
        flexDirection: "column",
    };

    return (
        <div ref={setNodeRef} style={style} onClick={onClick}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                }}
            >
                <span style={{ fontSize: 12, color: "#5e6c84" }}>
                    {issueKey}
                </span>
                {user?.avatar && (
                    <img
                        src={user.avatar}
                        alt={user.name}
                        style={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                    />
                )}
            </div>

            <div
                style={{
                    fontWeight: 500,
                    marginBottom: 6,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
            >
                {title}
            </div>

            <div
                style={{
                    display: "flex",
                    gap: 8,
                    fontSize: 12,
                    color: "#5e6c84",
                }}
            >
                {type && (
                    <img
                        src={typeIcons[type]}
                        alt={type}
                        title={`Type: ${type}`}
                        style={{ width: 16, height: 16 }}
                        onError={() =>
                            console.warn("Failed to load icon for type:", type)
                        }
                    />
                )}
                {priority && (
                    <img
                        src={priorityIcons[priority]}
                        alt={priority}
                        title={`Priority: ${priority}`}
                        style={{ width: 16, height: 16 }}
                    />
                )}
            </div>
        </div>
    );
};
