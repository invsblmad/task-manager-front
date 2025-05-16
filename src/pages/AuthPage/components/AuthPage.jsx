import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./authPage.module.scss";
import { Typography } from "@ui/typography/Typography";
import { Input } from "@ui/input/Input";
import { PATH } from "@utils/constants/Constants";
import { useAuthStore } from "../store/useAuthStore";
import { Button } from "@ui/Button/Button";

export const AuthPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordPatternErr, setPasswordPatternErr] = useState(false);
    const [loginError, setLoginError] = useState("");
    const { login, initializeToken, accessToken } = useAuthStore();
    const navigate = useNavigate();
    const [emailPatternError, setEmailPatternError] = useState(false);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^[A-Za-z\d]{8,}$/;

    useEffect(() => {
        initializeToken();
    }, [initializeToken]);

    const handleLogin = async () => {
        setEmailError(false);
        setEmailPatternError(false);
        setPasswordError(false);
        setPasswordPatternErr(false);
        setLoginError("");

        const isEmailValid = emailPattern.test(email);
        const isPasswordValid = passwordPattern.test(password);

        if (!email) setEmailError(true);
        if (email && !isEmailValid) setEmailPatternError(true);
        if (!password) setPasswordError(true);
        if (password && !isPasswordValid) setPasswordPatternErr(true);

        if (!email || !password || !isEmailValid || !isPasswordValid) return;

        try {
            await login(email, password);
            navigate(PATH.home);
        } catch (error) {
            setLoginError(error.message || "Login failed");
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.background} />
            <div className={styles.container}>
                <div className={styles.formCard}>
                    <Typography variant="h1" className={styles.title}>
                        Вход в аккаунт
                    </Typography>
                    <Typography variant="p" className={styles.subtitle}>
                        Добро пожаловать! Введите свои данные для входа.
                    </Typography>
                    <div className={styles.formGroup}>
                        <Input
                            type="email"
                            placeholder="Email"
                            width="240px"
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError(false);
                                setEmailPatternError(false);
                                setLoginError("");
                            }}
                            error={
                                emailError || emailPatternError || loginError
                            }
                            errorMsg={
                                loginError
                                    ? "Неправильный email или пароль"
                                    : emailError
                                    ? "Email не должен быть пустым"
                                    : emailPatternError
                                    ? "Неверный формат email"
                                    : ""
                            }
                        />
                        <Input
                            type="password"
                            placeholder="Пароль"
                            width="240px"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordPatternErr(false);
                                setLoginError("");
                            }}
                            error={
                                passwordError ||
                                passwordPatternErr ||
                                loginError
                            }
                            errorMsg={
                                loginError
                                    ? "Неправильный email или пароль."
                                    : passwordPatternErr
                                    ? "Пароль: минимум 8 символов, включая буквы и цифры."
                                    : passwordError
                                    ? "Пароль не может быть пустым."
                                    : ""
                            }
                        />
                        <Button
                            text="Войти"
                            onClick={handleLogin}
                            variant="primary"
                            height="38px"
                            color="white"
                            width="240px"
                        />
                    </div>
                    {accessToken && (
                        <div className={styles.tokenBox}>
                            <Typography variant="caption" weight="small">
                                Access Token:
                            </Typography>
                            <pre className={styles.token}>{accessToken}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
