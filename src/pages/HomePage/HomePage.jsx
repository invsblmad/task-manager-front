import { Container } from "@ui/Container/Container";
import { WelcomeModule } from "@modules/WelcomeModule/WelcomeModule";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <WelcomeModule />
        </Container>
    );
};
