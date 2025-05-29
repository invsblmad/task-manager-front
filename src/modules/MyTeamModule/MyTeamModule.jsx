import { useState } from "react";
import style from "./MyTeamModule.module.scss";
import { Button } from "@ui/Button/Button";
import { Typography } from "@ui/Typography/Typography";

const allUsers = [
    {
        rank: 1,
        isMedalist: true,
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        login: "a.sultanov",
        name: "Азамат Султанов",
        role: "Frontend Developer",
        teamName: "Команда сервисной разработки",
    },
    {
        rank: 2,
        isMedalist: true,
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        login: "i.ivanova",
        name: "Ирина Иванова",
        role: "Backend Developer",
        teamName: "Команда сервисной разработки",
    },
    {
        rank: 3,
        isMedalist: true,
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        login: "t.oshurov",
        name: "Тимур Ошуров",
        role: "DevOps Engineer",
        teamName: "Команда инфраструктуры",
    },
    {
        rank: 4,
        isMedalist: false,
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        login: "n.kubatov",
        name: "Нурлан Кубатов",
        role: "QA Engineer",
        teamName: "Команда сервисной разработки",
    },
    {
        rank: 5,
        isMedalist: false,
        avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        login: "m.kudaiberdieva",
        name: "Мадина Кудайбердиева",
        role: "Project Manager",
        teamName: "Команда аналитики",
    },
    {
        rank: 6,
        isMedalist: false,
        avatar: "https://randomuser.me/api/portraits/men/6.jpg",
        login: "d.bekov",
        name: "Данияр Беков",
        role: "UI/UX Designer",
        teamName: "Команда дизайна",
    },
    {
        rank: 7,
        isMedalist: false,
        avatar: "https://randomuser.me/api/portraits/women/7.jpg",
        login: "a.toktosunova",
        name: "Айгүл Токтосунова",
        role: "Data Analyst",
        teamName: "Команда аналитики",
    },
    {
        rank: 8,
        isMedalist: false,
        avatar: "https://randomuser.me/api/portraits/men/8.jpg",
        login: "s.kasymov",
        name: "Санжар Касымов",
        role: "Backend Developer",
        teamName: "Команда мобильной разработки",
    },
    {
        rank: 9,
        isMedalist: false,
        avatar: "https://randomuser.me/api/portraits/women/9.jpg",
        login: "e.zhanybekova",
        name: "Элина Жаныбекова",
        role: "Frontend Developer",
        teamName: "Команда мобильной разработки",
    },
    {
        rank: 10,
        isMedalist: false,
        avatar: "https://randomuser.me/api/portraits/men/10.jpg",
        login: "r.akunov",
        name: "Руслан Акунов",
        role: "System Administrator",
        teamName: "Команда инфраструктуры",
    },
];

export const MyTeamModule = () => {
    const isTeamLead = true;
    const [selectedTeam, setSelectedTeam] = useState(
        "Команда сервисной разработки"
    );
    const [users, setUsers] = useState(allUsers);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToAdd, setUserToAdd] = useState("");

    const filteredUsers = users.filter(
        (user) => user.teamName === selectedTeam
    );

    const availableUsersToAdd = users.filter(
        (user) => user.teamName !== selectedTeam
    );

    const openModal = () => {
        setUserToAdd(
            availableUsersToAdd.length > 0 ? availableUsersToAdd[0].login : ""
        );
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddUser = () => {
        if (!userToAdd) return;

        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.login === userToAdd
                    ? { ...user, teamName: selectedTeam }
                    : user
            )
        );

        setIsModalOpen(false);
    };

    return (
        <div className={style.myTeamContainer}>
            <div className={style.controls}>
                <select
                    className={style.selectTeam}
                    value={selectedTeam}
                    onChange={(e) => setSelectedTeam(e.target.value)}
                >
                    <option>Команда сервисной разработки</option>
                    <option>Команда инфраструктуры</option>
                    <option>Команда аналитики</option>
                    <option>Команда дизайна</option>
                    <option>Команда мобильной разработки</option>
                </select>
                {isTeamLead && (
                    <Button
                        variant="primary"
                        width="160px"
                        height="34px"
                        color="white"
                        onClick={openModal}
                    >
                        Добавить в команду
                    </Button>
                )}
            </div>
            <table className={style.table}>
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Login</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Team Name</th>
                        {isTeamLead && <th>Действия</th>}
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.login}>
                            <td>
                                <img
                                    src={user.avatar}
                                    alt="avatar"
                                    className={style.avatar}
                                />
                            </td>
                            <td>{user.login}</td>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>{user.teamName}</td>
                            {isTeamLead && (
                                <td>
                                    <Button
                                        variant="primary"
                                        width="150px"
                                        height="34px"
                                        color="white"
                                        className={style.removeButton}
                                    >
                                        Удалить
                                    </Button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className={style.modalOverlay}>
                    <div className={style.modal}>
                        <Typography
                            variant="h4"
                            className={style.addUsersToTeam}
                        >
                            Добавить пользователя в команду
                        </Typography>
                        {availableUsersToAdd.length === 0 ? (
                            <Typography variant="h3">
                                Нет доступных пользователей для добавления
                            </Typography>
                        ) : (
                            <>
                                <select
                                    value={userToAdd}
                                    onChange={(e) =>
                                        setUserToAdd(e.target.value)
                                    }
                                    className={style.selectUser}
                                >
                                    {availableUsersToAdd.map((user) => (
                                        <option
                                            key={user.login}
                                            value={user.login}
                                        >
                                            {user.name} ({user.login}) -{" "}
                                            {user.role}
                                        </option>
                                    ))}
                                </select>
                                <div className={style.modalButtons}>
                                    <Button
                                        variant="primary"
                                        width="100px"
                                        height="34px"
                                        color="white"
                                        onClick={handleAddUser}
                                    >
                                        Добавить
                                    </Button>
                                    <Button
                                        variant="primary"
                                        width="100px"
                                        height="34px"
                                        color="var(--grey-grey1)"
                                        className={style.cancelBtn}
                                        onClick={closeModal}
                                    >
                                        Отмена
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
