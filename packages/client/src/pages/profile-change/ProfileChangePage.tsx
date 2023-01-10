import { Card, Tabs, Typography } from "antd";
import { ProfileInfoForm } from "../../components/forms/ProfileForm/ProfileInfoForm/ProfileInfoForm";
import { ProfilePasswordForm } from "../../components/forms/ProfileForm/ProfilePasswordForm/ProfilePasswordForm";
import MainLayout from "../../containers/MainLayout/MainLayout";

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
        <MainLayout>
            <Card
                style={{
                    width: 500,
                    height: 750,
                }}>
                <Typography.Title level={2}>Profile settings</Typography.Title>
                <Tabs items={items} />
            </Card>
        </MainLayout>
    );
};
