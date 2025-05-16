import React from "react";
import { Typography } from "@ui/Typography/Typography";
import { Button } from "@ui/Button/Button";
import { FaHome, FaUsers, FaTasks } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./Menu.module.scss";

export const Menu = ({ menuOpen, setMenuOpen }) => {
    const navigate = useNavigate();

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const goTo = (path) => {
        navigate(path);
        setMenuOpen(false);
    };

    return (
        <div>
            <header className={styles.header}>
                <div className={styles.leftSection}>
                    <Typography variant="h3" className={styles.title}>
                        Task Manager
                    </Typography>
                    <Button
                        variant="textEmpty"
                        className={styles.menuButton}
                        onClick={toggleMenu}
                    >
                        ☰
                    </Button>
                </div>

                <div className={styles.rightSection}>
                    <span>Username</span>
                    <img
                        src="https://via.placeholder.com/30"
                        alt="User Icon"
                        className={styles.userIcon}
                    />
                </div>
            </header>

            <aside
                className={`${styles.menuContainer} ${
                    menuOpen ? styles.open : styles.closed
                }`}
            >
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
