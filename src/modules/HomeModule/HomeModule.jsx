import React, { useState } from "react";
import { Typography } from "@ui/Typography/Typography";
import { Input } from "@ui/Input/Input";
import styles from "./HomeModule.module.scss";
import { Button } from "@ui/Button/Button";

export const HomeModule = () => {
    const [search, setSearch] = useState("");

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className={styles.homeContainer}>
            <Typography variant="h1" className={styles.title}>
                Мои задачи
            </Typography>

            <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                <Input
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={handleSearchChange}
                    width="400px"
                    className={styles.inputSearch}
                />
                <Button
                    variant="primary"
                    type="submit"
                    color="white"
                    width="140px"
                    className={styles.searchButton}
                >
                    Поиск
                </Button>
            </form>
        </div>
    );
};
