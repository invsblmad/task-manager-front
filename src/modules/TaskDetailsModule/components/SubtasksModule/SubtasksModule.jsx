import React, { useState } from "react";
import style from "./SubtasksModule.module.scss";
import { Typography } from "@ui/Typography/Typography";
import { Button } from "@ui/Button/Button";
import { CheckCircle, ChevronDown } from "lucide-react";
import { CreateSubtaskModal } from "../CreateSubtaskModal/CreateSubtaskModal";

const sampleTask = {
    issueKey: "PROJ-123",
    title: "Fix login bug",
    description:
        "Users cannot log in with their Google accounts. The OAuth flow is broken.",
    subtasks: [
        {
            id: 0,
            name: "Analyze the problem",
            author: "Aizat Madumarova",
            percentage: 75,
        },
        {
            id: 1,
            name: "Update OAuth config",
            author: "Ivan Ivanov",
            percentage: 40,
        },
        {
            id: 2,
            name: "Test login with different accounts",
            author: "Alina Akmatova",
            percentage: 10,
        },
    ],
    user: { name: "Ivan Ivanov" },
    author: "Anna Petrova",
    createdAt: "2025-05-01",
    updatedAt: "2025-05-20",
    estimate: "8h",
    timeSpent: "6h",
    type: "bug",
    priority: "high",
    devTeam: "System Administration",
    status: "ToDo",
};
export const SubtasksModule = () => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePlusSubtask = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className={style.taskDetailsContainer}>
            <div className={style.taskContent}>
                <div className={style.taskMain}>
                    <div className={style.wrapperSubtasksTitle}>
                        <Typography
                            variant="h6"
                            weight="bold"
                            className={style.sectionTitle}
                            onClick={() => setIsDetailsOpen((prev) => !prev)}
                            style={{ cursor: "pointer" }}
                        >
                            <span className={style.sectionTitleWrapper}>
                                <ChevronDown
                                    size={18}
                                    style={{
                                        transform: isDetailsOpen
                                            ? "rotate(0deg)"
                                            : "rotate(-90deg)",
                                        transition: "transform 0.3s ease",
                                    }}
                                />
                            </span>
                            Подзадачи
                        </Typography>
                        <Button
                            variant="textEmpty"
                            color="black"
                            fontSize="44px"
                            className={style.plusBtn}
                            onClick={handlePlusSubtask}
                        >
                            +
                        </Button>
                        {isModalOpen && (
                            <CreateSubtaskModal onClose={handleCloseModal} />
                        )}
                    </div>

                    {isDetailsOpen && (
                        <div className={style.subtasksWrapper}>
                            {sampleTask.subtasks.map((subtask) => (
                                <div
                                    key={subtask.id}
                                    className={style.subtaskItem}
                                >
                                    <Typography
                                        variant="h6"
                                        className={style.id}
                                    >
                                        {subtask.id}
                                        <CheckCircle
                                            style={{ color: "green" }}
                                        />
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        className={style.name}
                                    >
                                        {subtask.name}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        className={style.name}
                                    >
                                        {subtask.author}
                                    </Typography>
                                    <div className={style.progressBarWrapper}>
                                        <div className={style.progressBar}>
                                            <div
                                                className={style.progress}
                                                style={{
                                                    width: `${subtask.percentage}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <Typography
                                            variant="h6"
                                            className={style.progressText}
                                        >
                                            {subtask.percentage}%
                                        </Typography>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
