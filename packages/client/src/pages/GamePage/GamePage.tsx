import MainLayout from "@/containers/MainLayout/MainLayout";
import Game from "@/components/Game/Game";
import "./GamePage.scss";

const GamePage = () => {
    return (
        <MainLayout>
            <Game />
        </MainLayout>
    );
};

export default GamePage;
