import MainLayout from "@/containers/MainLayout/MainLayout";
import Game from "@/components/Game/Game";
import "./GamePage.scss";

const GamePage = () => {
    const isBrowser = typeof window !== "undefined";

    // Рендерим Game только в браузере
    return <MainLayout>{<div>Game</div>}</MainLayout>;
};

export default GamePage;
