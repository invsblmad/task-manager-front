import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./TaskDetailsModule.module.scss";
import { Typography } from "@ui/Typography/Typography";
import { Button } from "@ui/Button/Button";
import { Pencil, ChevronDown } from "lucide-react";
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
};
const typeMapRu = {
    bug: "Баг",
    task: "Задача",
    subtask: "Подзадача",
    epic: "Эпик",
    improvement: "Улучшение",
};
const priorityMapRu = {
    high: "Высокий",
    medium: "Средний",
    low: "Низкий",
};
const statusMapRu = {
    Ready: "Готово",
    InProgress: "В процессе",
    ToDo: "Нужно Сделать",
};

const statusClassMap = {
    Ready: style.statusReady,
    InProgress: style.statusInProgress,
    ToDo: style.statusToDo,
};
export const TaskDetailsModule = () => {
    const { taskId } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDetailsOpen, setIsDetailsOpen] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => {
            setTask(sampleTask);
            setLoading(false);
        }, 100);

        return () => clearTimeout(timer);
    }, [taskId]);

    if (loading) return <div className={style.loading}>Загрузка задачи...</div>;

    const mappedType = typeMapRu[task.type] || task.type;
    const mappedPriority = priorityMapRu[task.priority] || task.priority;
    const mappedStatus = statusMapRu[task.status] || task.status;

    return (
        <div className={style.taskDetailsContainer}>
            <header className={style.taskHeader}>
                <div>
                    <img
                        src="https://picsum.photos/id/6/367/267"
                        alt="Company Logo"
                        className={style.companyLogo}
                    />
                </div>
                <div>
                    <Typography
                        variant="h5"
                        color="var(--state-info)"
                        className={style.issueKey}
                    >
                        {task.issueKey}
                    </Typography>
                    <Typography variant="h2" className={style.taskTitle}>
                        {task.title}
                    </Typography>
                </div>
            </header>

            <div className={style.buttonRow}>
                <Button
                    variant="greyBtn"
                    color="black"
                    width="150px"
                    height="30px"
                    className={style.btn}
                >
                    <span className={style.flexContent}>
                        Редактировать
                        <Pencil size={16} />
                    </span>
                </Button>
                <Button
                    variant="greyBtn"
                    color="black"
                    width="180px"
                    height="30px"
                    className={style.btn}
                >
                    Вести журнал работы
                </Button>
                <Button
                    variant="greyBtn"
                    color="black"
                    width="90px"
                    height="30px"
                    className={style.btn}
                >
                    <span className={style.flexContent}>
                        Статус
                        <ChevronDown size={16} />
                    </span>
                </Button>
            </div>

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
                        Детали задачи
                    </Typography>

                    <div
                        className={`${style.detailTask} ${
                            isDetailsOpen ? style.open : style.closed
                        }`}
                    >
                        <div>
                            <section className={style.typePriority}>
                                <Typography
                                    variant="p"
                                    className={style.sectionTitleType}
                                >
                                    Тип:
                                </Typography>
                                <Typography
                                    variant="p"
                                    className={style.taskDescription}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: 8,
                                            fontSize: 12,
                                            color: "#5e6c84",
                                        }}
                                    >
                                        {getIconByTypeOrPriority({
                                            type: task.type,
                                        })}
                                    </div>
                                    {mappedType}
                                </Typography>
                            </section>
                            <section className={style.typePriority}>
                                <Typography
                                    variant="p"
                                    className={style.sectionTitleType}
                                >
                                    Приоритет:
                                </Typography>
                                <Typography
                                    variant="p"
                                    className={style.taskDescription}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: 8,
                                            fontSize: 12,
                                            color: "#5e6c84",
                                        }}
                                    >
                                        {getIconByTypeOrPriority({
                                            priority: task.priority,
                                        })}
                                    </div>
                                    {mappedPriority}
                                </Typography>
                            </section>
                            <section className={style.typePriority}>
                                <Typography
                                    variant="p"
                                    className={style.sectionTitleType}
                                >
                                    Dev Team:
                                </Typography>
                                <Typography
                                    variant="p"
                                    className={style.taskDescription}
                                >
                                    {sampleTask.devTeam}
                                </Typography>
                            </section>
                        </div>
                        <div>
                            <section className={style.typePriority}>
                                <Typography
                                    variant="p"
                                    className={style.sectionTitleType}
                                >
                                    Статус:
                                </Typography>
                                <Typography
                                    variant="p"
                                    className={`${style.taskStatus} ${
                                        statusClassMap[task.status] || ""
                                    }`}
                                >
                                    {mappedStatus}
                                </Typography>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
