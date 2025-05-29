import { useState } from "react";
import { Typography } from "@ui/Typography/Typography";
import styles from "./TaskModule.module.scss";
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
    DragOverlay,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Droppable } from "@ui/DragAndDrop/Droppable";
import { DraggableCard } from "@ui/DragAndDrop/DraggableCard";
import { initialColumns } from "@utils/Constants/Constants";
import { useNavigate } from "react-router-dom";

export const TaskModule = () => {
    const [tasks, setTasks] = useState(initialColumns);
    const [activeId, setActiveId] = useState(null);
    const totalTasksCount = Object.values(tasks).reduce(
        (acc, column) => acc + column.items.length,
        0
    );
    const sensors = useSensors(useSensor(PointerSensor));
    const navigate = useNavigate();
    const handleCardClick = (taskId) => {
        console.log("clicked");
        navigate(`/tasks/${taskId}`);
    };
    const findContainer = (id) => {
        return Object.keys(tasks).find((key) =>
            tasks[key].items.some((item) => item.id === id)
        );
    };

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const sourceColumn = findContainer(active.id);
        const targetColumn = findContainer(over.id) || over.id;

        if (!sourceColumn || !targetColumn) return;
        if (sourceColumn === targetColumn) return;

        const sourceItems = [...tasks[sourceColumn].items];
        const targetItems = [...tasks[targetColumn].items];
        const movingItem = sourceItems.find((item) => item.id === active.id);

        setTasks({
            ...tasks,
            [sourceColumn]: {
                ...tasks[sourceColumn],
                items: sourceItems.filter((item) => item.id !== active.id),
            },
            [targetColumn]: {
                ...tasks[targetColumn],
                items: [movingItem, ...targetItems],
            },
        });

        setActiveId(null);
    };

    const getActiveTask = () => {
        return Object.values(tasks)
            .flatMap((col) => col.items)
            .find((item) => item.id === activeId);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className={styles.board}>
                {Object.entries(tasks).map(([columnId, column]) => (
                    <Droppable
                        key={columnId}
                        id={columnId}
                        taskCount={column.items.length}
                    >
                        <Typography
                            variant="h5"
                            weight="bold"
                            className={styles.columnTitle}
                        >
                            {column.title}
                        </Typography>
                        <SortableContext
                            items={column.items.map((item) => item.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div>
                                {column.items.map((item) => (
                                    <DraggableCard
                                        key={item.id}
                                        id={item.id}
                                        issueKey={item.issueKey}
                                        title={item.title}
                                        user={item.user}
                                        type={item.type}
                                        priority={item.priority}
                                        onClick={() => handleCardClick(item.id)}
                                        style={{ cursor: "pointer" }}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </Droppable>
                ))}
                <div className={styles.totalTasksColumn}>
                    <Typography
                        variant="h5"
                        weight="bold"
                        className={styles.columnTitle}
                    >
                        Всего задач
                    </Typography>
                    <div className={styles.totalTasksCount}>
                        <Typography variant="h3" weigth="bold">
                            {totalTasksCount}
                        </Typography>
                    </div>
                </div>
            </div>

            <DragOverlay>
                {activeId
                    ? (() => {
                          const task = getActiveTask();
                          return task ? (
                              <DraggableCard
                                  id={task.id}
                                  issueKey={task.issueKey}
                                  title={task.title}
                                  user={task.user}
                                  type={task.type}
                                  priority={task.priority}
                              />
                          ) : null;
                      })()
                    : null}
            </DragOverlay>
        </DndContext>
    );
};
