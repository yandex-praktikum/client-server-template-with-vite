import { Card, Col, Layout, Row, Tabs, Typography } from "antd";
import { ProfileInfoForm } from "../../components/forms/ProfileForm/ProfileInfoForm/ProfileInfoForm";
import { ProfilePasswordForm } from "../../components/forms/ProfileForm/ProfilePasswordForm/ProfilePasswordForm";

export const ProfileChangePage = () => {
    const items = [
        { label: "Info", key: "item-1", children: <ProfileInfoForm /> },
        {
            label: "Password",
            key: "item-2",
            children: <ProfilePasswordForm />,
        },
    ];

    return (
        <Layout className="layout">
            <Row justify={"center"} style={{ height: "100vh" }}>
                <Col className={"col"} xl={12}>
                    <Card
                        style={{
                            width: 500,
                            minHeight: 600,
                        }}>
                        <Typography.Title level={2}>
                            Profile settings
                        </Typography.Title>
                        <Tabs items={items} />
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
};
