import React, { useState } from "react";
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

export const TaskModule = () => {
    const [tasks, setTasks] = useState(initialColumns);
    const [activeId, setActiveId] = useState(null);
    const [newTaskTexts, setNewTaskTexts] = useState(() =>
        Object.keys(initialColumns).reduce((acc, key) => {
            acc[key] = "";
            return acc;
        }, {})
    );

    const sensors = useSensors(useSensor(PointerSensor));

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
                            weigth="bold"
                            className={styles.columnTitle}
                        >
                            {column.title}
                        </Typography>
                        <SortableContext
                            items={column.items.map((item) => item.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className={styles.tasks}>
                                {column.items.map((item) => (
                                    <DraggableCard key={item.id} id={item.id}>
                                        {item.content}
                                    </DraggableCard>
                                ))}

                                <div className={styles.addTaskForm}>
                                    <input
                                        type="text"
                                        placeholder="Новая задача"
                                        value={newTaskTexts[columnId]}
                                        onChange={(e) =>
                                            setNewTaskTexts((prev) => ({
                                                ...prev,
                                                [columnId]: e.target.value,
                                            }))
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                addTask(columnId);
                                            }
                                        }}
                                    />
                                    <button onClick={() => addTask(columnId)}>
                                        Добавить
                                    </button>
                                </div>
                            </div>
                        </SortableContext>
                    </Droppable>
                ))}
            </div>

            <DragOverlay>
                {activeId ? (
                    <div className={styles.taskCard + " " + styles.dragging}>
                        {
                            Object.values(tasks)
                                .flat()
                                .find((task) => task.id === activeId)?.content
                        }
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};
