import React, { useState } from "react";
import style from "./DescriptionModule.module.scss";
import { Typography } from "@ui/Typography/Typography";
import { ChevronDown } from "lucide-react";
import { getIconByTypeOrPriority } from "@utils/Helper/Helper";

const sampleTask = {
    issueKey: "PROJ-123",
    title: "Fix login bug",
    description:
        "Users cannot log in with their Google accounts. The OAuth flow is broken.",
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
    img: "https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww",
};

export const DescriptionModule = () => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(true);
    return (
        <div className={style.taskContent}>
            <div className={style.taskMain}>
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
                    Описание
                </Typography>
                <div className={style.taskDescriptionText}>
                    <Typography variant="p" className={style.sectionTitle}>
                        {sampleTask.description}
                    </Typography>
                    <div>
                        <img
                            src={sampleTask.img}
                            className={style.imageTaskDescription}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
