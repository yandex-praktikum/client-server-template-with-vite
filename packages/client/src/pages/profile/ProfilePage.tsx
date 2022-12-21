import {
    Avatar,
    Button,
    Card,
    Col,
    Divider,
    Layout,
    Row,
    Statistic,
    Typography,
} from "antd";
import "./ProfilePage.scss";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../services/authorization";
import { UserInfoRequestData } from "../../api/typesApi";
import { PATH } from "../../constants/apiPaths";

export const ProfilePage = () => {
    const [userInfo, setUserInfo] = useState<UserInfoRequestData | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getUserInfo();
            if (response.data) {
                setUserInfo(response.data);
            }
        };
        fetchData();
    }, []);

    return (
        <Layout className="layout" data-testid="profile-page">
            <Row justify={"center"} style={{ height: "100vh" }}>
                <Col className={"col"} xl={12}>
                    <Card
                        style={{
                            width: 500,
                            height: 295,
                        }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            {userInfo?.avatar ? (
                                <Avatar
                                    size={64}
                                    icon={<UserOutlined />}
                                    src={`${PATH.BASE}${PATH.RESOURCES}/${userInfo.avatar}`}
                                />
                            ) : (
                                <Avatar size={64} icon={<UserOutlined />} />
                            )}

                            <Typography.Title level={3}>
                                {userInfo?.login}
                            </Typography.Title>
                            <Typography>{userInfo?.email}</Typography>
                            <Row>
                                <Col>
                                    <Statistic
                                        title="Best Score"
                                        value={112893}
                                        style={{
                                            marginTop: 10,
                                            marginRight: "3rem",
                                        }}
                                    />
                                </Col>
                                <Col>
                                    <Statistic
                                        title="Rank"
                                        value={1}
                                        style={{ marginTop: 10 }}
                                    />
                                </Col>
                            </Row>

                            <Divider />
                            <Row>
                                <Col span={12}>
                                    <Button
                                        type="default"
                                        onClick={() =>
                                            navigate("/profile-change")
                                        }>
                                        Edit Profile
                                    </Button>
                                </Col>
                                <Col span={12}>
                                    <Button
                                        type="primary"
                                        onClick={() => navigate("/")}>
                                        Home Page
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
};
