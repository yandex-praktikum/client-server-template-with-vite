import { Col, Layout, Row, Image, Button } from "antd";
import { COLORED_LOGO, PRESENTATION_IMAGE } from "../../constants/imagesPaths";
import "./MainPage.scss";

const background = PRESENTATION_IMAGE;

const screenStyle = {
  backgroundImage: `url(${background})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundColor: "white",
  height: "100vh",
};

export const MainPage = () => {
  return (
    <Layout className="layout" style={screenStyle}>
      <Row
        style={{ height: "100vh", justifyContent: "center" }}
        className="main">
        <Col
          flex={2}
          style={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            rowGap: "2rem",
          }}>
          <div className="main__menu">
            <Button type="primary" size="large" htmlType="submit" block>
              View profile
            </Button>
            <Button type="primary" size="large" htmlType="submit" block>
              View leaderboard
            </Button>
            <Button type="primary" size="large" htmlType="submit" block>
              Sign out
            </Button>
            <Button type="primary" size="large" htmlType="submit" block>
              Start playing
            </Button>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};
