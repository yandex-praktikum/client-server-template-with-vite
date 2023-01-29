import Game from "@/components/Game/Game";
import "./GamePage.scss";
import MainLayout from "@/containers/MainLayout/MainLayout";
const GamePage = () => {
    return (
        <MainLayout data-testid="login-page">
            <Game />
        </MainLayout>
    );
};

export default GamePage;
