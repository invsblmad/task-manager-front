import React from "react";
import styles from "./WelcomeModule.module.scss";
import { Typography } from "@ui/Typography/Typography";
import { Button } from "@ui/Button/Button";

export const WelcomeModule = () => {
    return (
        <div className={styles.welcomeWrapper}>
            <div className={styles.backgroundBalls}>
                <div className={`${styles.ball} ${styles.ball1}`}></div>
                <div className={`${styles.ball} ${styles.ball2}`}></div>
            </div>
            <div className={styles.backgroundTaskText}>TASK MANAGEMENT</div>

            <div className={styles.welcome}>
                <div className={styles.textBlock}>
                    <Typography variant="h2" className={styles.welcomeText}>
                        Добро пожаловать!
                    </Typography>
                    <Typography variant="p">
                        Это ваша главная панель управления. Здесь вы можете
                        начать работу с проектами.
                    </Typography>
                    <Button
                        className={styles.startButton}
                        width="176px"
                        height="36px"
                        color="white"
                        variant="primary"
                        text="Начать Работу"
                    />
                </div>
                <div>
                    <img
                        src="https://cdn.dribbble.com/userupload/37149514/file/original-56834220c6e520cdc470d98bb8c96cd0.png?resize=1504x1118&vertical=center"
                        alt="Welcome"
                        className={styles.imageWelcome}
                    />
                </div>
            </div>
        </div>
    );
};
