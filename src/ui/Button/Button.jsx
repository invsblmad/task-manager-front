import { Typography } from "@ui/Typography/Typography";
import styles from "./Button.module.scss";

export const Button = ({
    text,
    variant,
    disabled,
    onClick,
    children,
    color,
    hoverColor,
    activeColor,
    className,
    width,
    height,
}) => {
    const buttonClasses = `${styles.button} ${styles[variant]} ${
        disabled ? styles.disabled : ""
    } ${className || ""}`;

    return (
        <button
            className={buttonClasses}
            onClick={!disabled ? onClick : undefined}
            disabled={disabled}
            style={{
                color,
                width: width || "auto",
                height: height || "auto",
                "--hover-color": hoverColor || "initial",
                "--active-color": activeColor || "initial",
            }}
        >
            <Typography
                variant="h6"
                weight="semi-bold"
                className={styles.buttonText}
            >
                {text}
            </Typography>
            {children}
        </button>
    );
};
