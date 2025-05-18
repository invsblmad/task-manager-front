import React, { useState, useRef, useEffect } from "react";
import { Typography } from "@ui/Typography/Typography";
import { Button } from "@ui/Button/Button";
import { FaHome, FaUsers, FaTasks, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./Menu.module.scss";

export const Menu = ({ menuOpen, setMenuOpen }) => {
    const navigate = useNavigate();
    const [showProjects, setShowProjects] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const searchRef = useRef(null);

    const handleCreateTask = () => {
        // логика создания задачи
    };

    const handleSearch = (value) => {
        // логика поиска
    };

    const goTo = (path) => {
        navigate(path);
        setMenuOpen(false);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setShowSearch(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            <header className={styles.header}>
                <div className={styles.leftSection}>
                    <Typography variant="h3" className={styles.title}>
                        Task Manager
                    </Typography>
                    <div className={styles.projectDropdown}>
                        <Button
                            variant="text"
                            className={styles.menuButton}
                            onClick={() => setShowProjects((prev) => !prev)}
                        >
                            Проекты
                        </Button>

                        {showProjects && (
                            <div className={styles.projectList}>
                                <div
                                    className={styles.projectItem}
                                    onClick={() => goTo("/project/1")}
                                >
                                    Проект 1
                                </div>
                                <div
                                    className={styles.projectItem}
                                    onClick={() => goTo("/project/2")}
                                >
                                    Проект 2
                                </div>
                                <div
                                    className={styles.projectItem}
                                    onClick={() => goTo("/project/2")}
                                >
                                    Проект 2
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.rightSection}>
                    <Button
                        variant="primary"
                        color="white"
                        width="160px"
                        height="30px"
                        className={styles.createTaskButton}
                        onClick={handleCreateTask}
                    >
                        Создать задачу
                    </Button>

                    <div className={styles.searchContainer} ref={searchRef}>
                        {showSearch && (
                            <input
                                type="text"
                                placeholder="Поиск задач..."
                                className={styles.searchInput}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        )}
                        <Button
                            variant="text"
                            className={styles.searchButton}
                            onClick={() => setShowSearch((prev) => !prev)}
                        >
                            Поиск <FaSearch />
                        </Button>
                    </div>

                    <Typography variant="h6" className={styles.username}>
                        Username
                    </Typography>
                    <img
                        src="https://via.placeholder.com/30"
                        alt="User Icon"
                        className={styles.userIcon}
                    />
                </div>
            </header>

            <aside className={styles.menuContainer}>
                {menuOpen && (
                    <nav className={styles.popupMenu}>
                        <Button
                            variant="text"
                            className={styles.menuItem}
                            onClick={() => goTo("/")}
                        >
                            <FaHome className={styles.icon} />
                            Главная
                        </Button>
                        <Button
                            variant="text"
                            className={styles.menuItem}
                            onClick={() => goTo("/team")}
                        >
                            <FaUsers className={styles.icon} />
                            Моя команда
                        </Button>
                        <Button
                            variant="text"
                            className={styles.menuItem}
                            onClick={() => goTo("/tasks")}
                        >
                            <FaTasks className={styles.icon} />
                            Мои задачи
                        </Button>
                    </nav>
                )}
            </aside>
        </div>
    );
};
