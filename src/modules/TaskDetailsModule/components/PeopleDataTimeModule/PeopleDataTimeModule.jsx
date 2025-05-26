import React, { useState } from "react";
import style from "./PeopleDataTimeModule.module.scss";
import { Typography } from "@ui/Typography/Typography";
import { ChevronDown } from "lucide-react";

const sampleTask = {
    issueKey: "PROJ-123",
    title: "Fix login bug",
    description:
        "Users cannot log in with their Google accounts. The OAuth flow is broken.",
    user: {
        name: "Ivan Ivanov",
        image: "https://st4.depositphotos.com/4538307/21640/i/450/depositphotos_216402012-stock-photo-beautiful-mature-woman-smiling-close.jpg",
    },
    author: "Anna Petrova",
    authorImg:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    createdAt: "2025-05-01",
    updatedAt: "2025-05-20",
    estimate: "8h",
    timeSpent: "6h",
    timeLeft: "2h",
    type: "bug",
    priority: "high",
    devTeam: "System Administration",
    status: "ToDo",
    img: "https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww",
};

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export const PeopleDataTimeModule = () => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(true);

    const spent = parseInt(sampleTask.timeSpent);
    const left = parseInt(sampleTask.timeLeft);
    const data = [
        {
            name: "Оценка",
            value: parseFloat(sampleTask.estimate),
        },
        {
            name: "Затрачено",
            value: parseFloat(sampleTask.timeSpent),
        },
        {
            name: "Осталось",
            value: parseFloat(sampleTask.timeLeft),
        },
    ];

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
                    Люди
                </Typography>
                <div>
                    <section className={style.typePriority}>
                        <Typography
                            variant="p"
                            className={style.sectionTitleType}
                        >
                            Исполнитель:
                        </Typography>
                        <div className={style.personInfo}>
                            <img
                                src={sampleTask.authorImg}
                                alt="author"
                                className={style.avatar}
                            />
                            <Typography
                                variant="p"
                                className={style.taskDescription}
                            >
                                {sampleTask.author}
                            </Typography>
                        </div>
                    </section>
                    <section className={style.typePriority}>
                        <Typography
                            variant="p"
                            className={style.sectionTitleType}
                        >
                            Автор:
                        </Typography>
                        <div className={style.personInfo}>
                            <img
                                src={sampleTask.user.image}
                                alt="user"
                                className={style.avatar}
                            />
                            <Typography
                                variant="p"
                                className={style.taskDescription}
                            >
                                {sampleTask.user.name}
                            </Typography>
                        </div>
                    </section>
                </div>
            </div>

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
                    Даты
                </Typography>
                <div>
                    <section className={style.typePriority}>
                        <Typography
                            variant="p"
                            className={style.sectionTitleType}
                        >
                            Создано:
                        </Typography>
                        <Typography
                            variant="p"
                            className={style.taskDescription}
                        >
                            {sampleTask.createdAt}
                        </Typography>
                    </section>
                    <section className={style.typePriority}>
                        <Typography
                            variant="p"
                            className={style.sectionTitleType}
                        >
                            Обновлено:
                        </Typography>
                        <Typography
                            variant="p"
                            className={style.taskDescription}
                        >
                            {sampleTask.updatedAt}
                        </Typography>
                    </section>
                </div>
            </div>

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
                    Учет времени
                </Typography>

                {isDetailsOpen && (
                    <div className={style.timeStats}>
                        <div className={style.statCard}>
                            <Typography
                                variant="p"
                                className={style.sectionTitleType}
                            >
                                Оценка:
                            </Typography>
                            <Typography variant="p" className={style.barTask}>
                                <div className={style.progressBar}>
                                    <div
                                        className={style.spent}
                                        style={{
                                            flex: parseFloat(
                                                sampleTask.estimate
                                            ),
                                        }}
                                    />
                                    <div
                                        className={style.left}
                                        style={{
                                            flex: 0,
                                        }}
                                    />
                                </div>
                                {sampleTask.estimate}
                            </Typography>
                        </div>
                        <div className={style.statCard}>
                            <Typography
                                variant="p"
                                className={style.sectionTitleType}
                            >
                                Осталось:
                            </Typography>
                            <Typography variant="p" className={style.barTask}>
                                <div className={style.progressBar}>
                                    <div
                                        className={style.spentGrey}
                                        style={{
                                            flex: parseFloat(
                                                sampleTask.estimate
                                            ),
                                        }}
                                    />
                                    <div
                                        className={style.left}
                                        style={{
                                            flex: parseFloat(
                                                sampleTask.timeLeft
                                            ),
                                        }}
                                    />
                                </div>
                                {sampleTask.timeLeft}
                            </Typography>
                        </div>
                        <div className={style.statCard}>
                            <Typography
                                variant="p"
                                className={style.sectionTitleType}
                            >
                                Затрачено:
                            </Typography>
                            <Typography variant="p" className={style.barTask}>
                                <div className={style.progressBar}>
                                    <div
                                        className={style.spent}
                                        style={{
                                            flex: parseFloat(
                                                sampleTask.estimate
                                            ),
                                        }}
                                    />
                                    <div
                                        className={style.spentGrey}
                                        style={{
                                            flex: parseFloat(
                                                sampleTask.timeLeft
                                            ),
                                        }}
                                    />
                                </div>
                                {sampleTask.timeSpent}
                            </Typography>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
