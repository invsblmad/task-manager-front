import React, { useState } from "react";
import style from "./ActivityModule.module.scss";
import { Typography } from "@ui/Typography/Typography";
import { ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Button } from "@ui/Button/Button";
import { MessageCircle } from "lucide-react";
import { RichTextEditor } from "@mantine/rte";

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
    type: "bug",
    priority: "high",
    devTeam: "System Administration",
    status: "ToDo",
    comments: [
        {
            authorImg:
                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
            author: "Нурсултан Таалайбеков",
            timestamp: "2025-04-14T10:38:00",
            text: "Задача готова, завтра плановое обновление с ним и пойдет в прод",
        },
        {
            authorImg:
                "https://st4.depositphotos.com/4538307/21640/i/450/depositphotos_216402012-stock-photo-beautiful-mature-woman-smiling-close.jpg",
            author: "Айзат Мадумарова",
            timestamp: "2025-04-14T16:04:00",
            text: "Задача в проде",
        },
    ],
    logs: [
        {
            id: 1,
            timeSpent: "1 час, 30 минуты",
            description: 'Анализ изменений в "нурцрм", внесенных по задаче',
        },
        {
            id: 2,
            timeSpent: "2 час, 30 минуты",
            description:
                'Анализ изменений в "нурцрм", внесенных по задаче, Анализ изменений в "нурцрм", внесенных по задаче',
        },
    ],
};

export const ActivityModule = () => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("comments");
    const [comments, setComments] = useState(sampleTask.comments);
    const [showEditor, setShowEditor] = useState(false);
    const [newCommentText, setNewCommentText] = useState("");

    const handleCommentsBtnClick = () => {
        setShowEditor((prev) => !prev);
        setNewCommentText("");
    };

    const handleAddComment = () => {
        if (!newCommentText.trim()) return;

        const newComment = {
            authorImg: sampleTask.user.image,
            author: sampleTask.user.name,
            timestamp: new Date().toISOString(),
            text: newCommentText.trim(),
        };

        setComments((prev) => [newComment, ...prev]);
        setNewCommentText("");
        setShowEditor(false);
    };

    const handleCancel = () => {
        setShowEditor(false);
        setNewCommentText("");
    };

    return (
        <div className={style.taskDetailsContainer}>
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
                        Активность
                    </Typography>

                    {isDetailsOpen && (
                        <div className={style.activityBlock}>
                            <div className={style.tabs}>
                                <Button
                                    variant="textEmpty"
                                    className={`${style.tabButton} ${
                                        activeTab === "comments"
                                            ? style.active
                                            : ""
                                    }`}
                                    onClick={() => setActiveTab("comments")}
                                >
                                    Комментарии
                                </Button>
                                <Button
                                    variant="textEmpty"
                                    className={`${style.tabButton} ${
                                        activeTab === "log" ? style.active : ""
                                    }`}
                                    onClick={() => setActiveTab("log")}
                                >
                                    Журнал работ
                                </Button>
                            </div>

                            <div className={style.tabContent}>
                                {activeTab === "comments" && (
                                    <>
                                        {comments.map((comment, index) => (
                                            <div key={index}>
                                                <Typography
                                                    variant="h6"
                                                    color="blue"
                                                    className={
                                                        style.commentAuthor
                                                    }
                                                >
                                                    <img
                                                        src={comment.authorImg}
                                                        className={style.avatar}
                                                        alt="avatar"
                                                    />
                                                    {comment.author}
                                                    <span
                                                        className={
                                                            style.commentDate
                                                        }
                                                    >
                                                        добавил(а) комментарий —{" "}
                                                        {format(
                                                            new Date(
                                                                comment.timestamp
                                                            ),
                                                            "dd/MMM/yy HH:mm",
                                                            { locale: ru }
                                                        )}
                                                    </span>
                                                </Typography>
                                                <Typography
                                                    variant="h5"
                                                    className={
                                                        style.commentText
                                                    }
                                                    dangerouslySetInnerHTML={{
                                                        __html: comment.text,
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </>
                                )}

                                {activeTab === "log" && (
                                    <div className={style.logSection}>
                                        {sampleTask.logs.map((log) => (
                                            <div
                                                key={log.id}
                                                className={style.logEntry}
                                            >
                                                <div
                                                    className={
                                                        style.divTimeSpend
                                                    }
                                                >
                                                    <Typography
                                                        variant="h6"
                                                        className={
                                                            style.logText1
                                                        }
                                                    >
                                                        Затраченное время:
                                                    </Typography>
                                                    <Typography
                                                        variant="h6"
                                                        className={
                                                            style.logText2
                                                        }
                                                    >
                                                        {log.timeSpent}
                                                    </Typography>
                                                </div>
                                                <Typography
                                                    variant="h6"
                                                    className={
                                                        style.logTextDescription
                                                    }
                                                >
                                                    {log.description}
                                                </Typography>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <Button
                        variant="primary"
                        width="150px"
                        height="32px"
                        className={style.commentsBtn}
                        onClick={handleCommentsBtnClick}
                    >
                        <MessageCircle size={18} color="#000" />
                        Комментарий
                    </Button>

                    {showEditor && (
                        <div className={style.commentEditor}>
                            <RichTextEditor
                                value={newCommentText}
                                onChange={setNewCommentText}
                                placeholder="Введите ваш комментарий..."
                                style={{
                                    minHeight: 120,
                                    borderRadius: 8,
                                }}
                                controls={[
                                    ["bold", "italic", "underline", "strike"],
                                    ["unorderedList", "orderedList"],
                                    ["link"],
                                    ["h1", "h2", "h3"],
                                    ["blockquote", "code"],
                                    ["clean"],
                                ]}
                            />

                            <div className={style.editorButtons}>
                                <Button
                                    variant="primary"
                                    height="30px"
                                    width="100px"
                                    color="white"
                                    onClick={handleAddComment}
                                    disabled={!newCommentText.trim()}
                                >
                                    Добавить
                                </Button>
                                <Button
                                    variant="textEmpty"
                                    className={style.commenSection}
                                    onClick={handleCancel}
                                >
                                    Отмена
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
