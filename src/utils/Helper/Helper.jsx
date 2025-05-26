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
    epic,
    improvement,
    task,
    bug,
    subtask,
};

const priorityIcons = {
    high,
    highest,
    low,
    lowest,
};

export const getIconByTypeOrPriority = ({ type, priority }) => {
    if (type && typeIcons[type]) {
        return (
            <img
                src={typeIcons[type]}
                alt={type}
                title={`Type: ${type}`}
                style={{ width: 16, height: 16, verticalAlign: "middle" }}
            />
        );
    }

    if (priority && priorityIcons[priority]) {
        return (
            <img
                src={priorityIcons[priority]}
                alt={priority}
                title={`Priority: ${priority}`}
                style={{ width: 16, height: 16, verticalAlign: "middle" }}
            />
        );
    }

    return null;
};
