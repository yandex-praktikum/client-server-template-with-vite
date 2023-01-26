import MainLayout from "@/containers/MainLayout/MainLayout";

const StartPage = () => {
    return (
        <MainLayout>
            <div className="video-container" data-testid="video-container">
                <video width="400" height="300" controls data-testid="video">
                    <source
                        src="/videos/FlappyBird-HowToPlay.mp4"
                        type="video/mp4"
                    />
                </video>
            </div>
        </MainLayout>
    );
};

export default StartPage;
