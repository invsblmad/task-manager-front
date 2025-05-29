import styles from "./CreateTaskModule.module.scss";
import { Typography } from "@ui/Typography/Typography";
import { Button } from "@ui/Button/Button";
import { useState } from "react";
import RichTextEditor from "@mantine/rte";
import { getIconByTypeOrPriority } from "@utils/Helper/Helper";
import epic from "@assets/icons/type/epic.svg";
import improvement from "@assets/icons/type/improvement.svg";
import task from "@assets/icons/type/task.svg";
import bug from "@assets/icons/type/bug.svg";
import subtask from "@assets/icons/type/subtask.svg";

export const CreateTaskModule = ({ onClose }) => {
    const [project, setProject] = useState("");
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [attachments, setAttachments] = useState([]);
    const [executor, setExecutor] = useState("");
    const [estimate, setEstimate] = useState("");
    const [timeLeft, setTimeLeft] = useState("");

    const handleFileChange = (e) => {
        setAttachments([...e.target.files]);
    };
    const typeMap = {
        task: { label: "Задача", icon: task },
        bug: { label: "Баг", icon: bug },
        subtask: { label: "Подзадача", icon: subtask },
        epic: { label: "Эпик", icon: epic },
        improvement: { label: "Улучшение", icon: improvement },
    };
    const priorityMapRu = {
        high: "Высокий",
        medium: "Средний",
        low: "Низкий",
    };
    const projects = {
        project1: "Проект 1",
        project2: "Проект 2",
        project3: "Проект 3",
    };
    const executors = {
        user1: "Алиса Иванова",
        user2: "Бекзат Тургунов",
        user3: "Чолпон Жолдошова",
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <Typography
                    variant="h4"
                    weight="bold"
                    className={styles.createTaskTitle}
                >
                    Создание задачи
                </Typography>

                <div className={styles.createTask}>
                    <div className={styles.field}>
                        <Typography variant="h6" className={styles.titleField}>
                            Проект
                        </Typography>
                        <select
                            value={project}
                            className={styles.inputField}
                            onChange={(e) => setProject(e.target.value)}
                        >
                            {Object.entries(projects).map(([key, name]) => (
                                <option value={key} key={key}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.field}>
                        <Typography variant="h6" className={styles.titleField}>
                            Тип задачи
                        </Typography>
                        <div className={styles.selectWithIcon}>
                            {type && (
                                <img
                                    src={typeMap[type].icon}
                                    alt={typeMap[type].label}
                                    className={styles.iconInside}
                                />
                            )}
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className={styles.inputField2}
                            >
                                {Object.entries(typeMap).map(
                                    ([key, { label }]) => (
                                        <option
                                            key={key}
                                            value={key}
                                            className={styles.optionText}
                                        >
                                            {label}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    </div>

                    <div className={styles.field}>
                        <Typography variant="h6" className={styles.titleField}>
                            Тема
                        </Typography>
                        <input
                            type="text"
                            value={title}
                            className={styles.inputField}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <Typography variant="h6" className={styles.titleField}>
                            Описание
                        </Typography>
                        <RichTextEditor
                            value={description}
                            onChange={setDescription}
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
                    </div>

                    <div className={styles.field}>
                        <Typography variant="h6" className={styles.titleField}>
                            Приоритет
                        </Typography>
                        <select
                            value={priority}
                            className={styles.inputField}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="">Выберите приоритет</option>
                            {Object.entries(priorityMapRu).map(
                                ([key, label]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    <div className={styles.field}>
                        <Typography variant="h6" className={styles.titleField}>
                            Вложения
                        </Typography>

                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                        />
                        {attachments.length > 0 && (
                            <ul className={styles.attachments}>
                                {Array.from(attachments).map((file, index) => (
                                    <li key={index}>{file.name}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className={styles.field}>
                        <Typography variant="h6" className={styles.titleField}>
                            Исполнитель
                        </Typography>
                        <select
                            value={executor}
                            className={styles.inputField}
                            onChange={(e) => setExecutor(e.target.value)}
                        >
                            <option value="">Выберите исполнителя</option>
                            {Object.entries(executors).map(([key, name]) => (
                                <option key={key} value={key}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.timeFields}>
                        <div className={styles.field}>
                            <Typography
                                variant="h6"
                                className={styles.titleField}
                            >
                                Первоначальная оценка времени
                            </Typography>
                            <input
                                type="text"
                                value={estimate}
                                className={styles.inputField}
                                onChange={(e) => setEstimate(e.target.value)}
                                placeholder="например, 8h"
                            />
                        </div>
                        <div className={styles.field}>
                            <Typography
                                variant="h6"
                                className={styles.titleField}
                            >
                                Оставшееся время
                            </Typography>
                            <input
                                type="text"
                                value={timeLeft}
                                className={styles.inputField}
                                onChange={(e) => setTimeLeft(e.target.value)}
                                placeholder="например, 6h"
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.modalActions}>
                    <Button
                        variant="primary"
                        color="white"
                        width="100px"
                        height="34px"
                    >
                        Создать
                    </Button>
                    <Button variant="textEmpty" width="100px" onClick={onClose}>
                        Отменить
                    </Button>
                </div>
            </div>
        </div>
    );
};
