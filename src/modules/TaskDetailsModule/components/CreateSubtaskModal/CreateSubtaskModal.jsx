import React from "react";
import style from "./CreateSubtaskModal.module.scss";
import { Typography } from "@ui/Typography/Typography";
import { Button } from "@ui/Button/Button";
import { X } from "lucide-react";

export const CreateSubtaskModal = ({ onClose }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
    };

    return (
        <div className={style.modalOverlay}>
            <div className={style.modal}>
                <div className={style.modalHeader}>
                    <Typography variant="h5" weight="bold">
                        Создание подзадачи
                    </Typography>
                    <X className={style.closeIcon} onClick={onClose} />
                </div>
                <form onSubmit={handleSubmit} className={style.formCreateTask}>
                    <div className={style.formGroup}>
                        <Typography variant="h6">Название</Typography>
                        <input
                            type="text"
                            required
                            className={style.inputSubtaskCreate}
                        />
                    </div>
                    <div className={style.formGroup2}>
                        <Typography variant="h6">Тип</Typography>
                        <input
                            type="text"
                            value="Подзадача"
                            disabled
                            className={style.inputSubtaskCreate}
                        />
                    </div>
                    <Button
                        variant="primary"
                        width="120px"
                        height="30px"
                        color="white"
                        type="submit"
                        className={style.createSubtaskBtn}
                    >
                        Создать
                    </Button>
                </form>
            </div>
        </div>
    );
};
