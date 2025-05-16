import { Typography } from "@ui/Typography/Typography";
import React, { useState } from "react";
import styles from "./input.module.scss";

export const Input = ({
    type = "text",
    name,
    placeholder = "",
    error = false,
    onChange,
    className = "",
    value = "",
    errorMsg,
    children,
    width,
}) => {
    const [inputValue, setInputValue] = useState(value);

    const handleChange = (e) => {
        setInputValue(e.target.value);
        if (onChange) onChange(e);
    };

    const inputClasses = `${styles.input} ${className} ${
        error ? styles.error : ""
    }`;
    const containerClasses = `${styles.inputContainer} ${
        children ? styles.hasIcon : ""
    }`;

    return (
        <div className={containerClasses}>
            {children && <div className={styles.icon}>{children}</div>}
            <input
                type={type}
                name={name}
                value={inputValue}
                onChange={handleChange}
                placeholder={placeholder}
                className={inputClasses}
                style={{ width: width || "100%" }}
            />

            {error && errorMsg && (
                <Typography
                    variant="p"
                    weight="extraSmall"
                    className={styles.errorMessage}
                >
                    {errorMsg}
                </Typography>
            )}
        </div>
    );
};
