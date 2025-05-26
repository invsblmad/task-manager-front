import React from "react";
import { useParams } from "react-router-dom";
import { TaskDetailsModule } from "@modules/TaskDetailsModule/components/TaskDetailsModule/TaskDetailsModule";
import { initialColumns } from "@utils/Constants/Constants";
import { Container } from "@ui/Container/Container";
import { DescriptionModule } from "@modules/TaskDetailsModule/components/DescriptionModule/DescriptionModule";
import styles from "./TaskDetailPage.module.scss";
import { PeopleDataTimeModule } from "@modules/TaskDetailsModule/components/PeopleDataTimeModule/PeopleDataTimeModule";

export const TaskDetailPage = () => {
    const { taskId } = useParams();

    const allTasks = Object.values(initialColumns).flatMap((col) => col.items);
    const task = allTasks.find((t) => t.id === taskId);

    if (!task) return <div>Task not found</div>;

    return (
        <Container>
            <div className={styles.TaskDetailWrapper}>
                <div className={styles.leftTaskDetail}>
                    <TaskDetailsModule task={task} />
                    <DescriptionModule />
                </div>
                <PeopleDataTimeModule />
            </div>
        </Container>
    );
};
