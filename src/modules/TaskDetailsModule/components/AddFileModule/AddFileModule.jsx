import React, { useState, useCallback } from "react";
import style from "./AddFileModule.module.scss";
import { Typography } from "@ui/Typography/Typography";
import { ChevronDown, Pin } from "lucide-react";
import { Button } from "@ui/Button/Button";

export const AddFileModule = () => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(true);
    const [files, setFiles] = useState([]);

    const addFiles = useCallback(
        (newFiles) => {
            const mappedFiles = Array.from(newFiles).map((file, index) => ({
                id: Date.now() + index,
                file,
                name: file.name,
                isPinned: false,
                url: file.type.startsWith("image/")
                    ? URL.createObjectURL(file)
                    : null,
            }));

            setFiles((prev) => [...prev, ...mappedFiles]);
        },
        [setFiles]
    );

    const handleFileInputChange = (e) => {
        addFiles(e.target.files);
        e.target.value = null;
    };
    const handleDrop = (e) => {
        e.preventDefault();
        addFiles(e.dataTransfer.files);
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    const togglePin = (id) => {
        setFiles((prevFiles) =>
            prevFiles.map((file) =>
                file.id === id ? { ...file, isPinned: !file.isPinned } : file
            )
        );
    };
    const removeFile = (id) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
    };

    const sortedFiles = [...files].sort(
        (a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0)
    );

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
                        Вложенные файлы
                    </Typography>

                    {isDetailsOpen && (
                        <>
                            <div
                                className={style.dropzone}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                            >
                                <Typography variant="p">
                                    Перенесите файл, чтобы прикрепить, или{" "}
                                    <Button
                                        variant="textEmpty"
                                        weight="40px"
                                        color="var(--state-info)"
                                        type="button"
                                        className={style.browseButton}
                                        onClick={() =>
                                            document
                                                .querySelector(
                                                    `.${style.fileInput}`
                                                )
                                                ?.click()
                                        }
                                    >
                                        обзор.
                                    </Button>
                                </Typography>

                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileInputChange}
                                    className={style.fileInput}
                                    accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                />

                                <div className={style.filePreviewArea}>
                                    {sortedFiles.length > 0 && (
                                        <ul className={style.fileList}>
                                            {sortedFiles.map(
                                                ({ id, name, url }) => (
                                                    <li
                                                        key={id}
                                                        className={
                                                            style.fileItem
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                style.nameAndImg
                                                            }
                                                        >
                                                            {url && (
                                                                <img
                                                                    src={url}
                                                                    alt={name}
                                                                    className={
                                                                        style.filePreview
                                                                    }
                                                                />
                                                            )}
                                                            <span>{name}</span>
                                                        </div>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    )}
                                </div>
                                {files.length > 0 && (
                                    <div className={style.removeAllWrapper}>
                                        <Button
                                            type="button"
                                            variant="text"
                                            color="var(--danger)"
                                            onClick={() => setFiles([])}
                                            className={style.removeAllButton}
                                        >
                                            Удалить все
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
