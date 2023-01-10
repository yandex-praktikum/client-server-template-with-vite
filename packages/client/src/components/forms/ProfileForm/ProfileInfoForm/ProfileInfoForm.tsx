import { Form, Button, Input, Avatar, Divider, Upload } from "antd";
import { useEffect, useState } from "react";
import "../ProfileForm.scss";
import { updateInfo } from "@/services/profile";
import { getUserInfo } from "@/services/authorization";
import { useForm } from "antd/es/form/Form";
import { getValidator } from "../validation";
import { UserOutlined } from "@ant-design/icons";
import { PATH } from "@/constants/apiPaths";
import { AvatarApi } from "@/api/AvatarApi";
import { useNotification } from "@/hooks/useNorification";

export type ProfileFormValuesType = {
    first_name: string;
    second_name: string;
    display_name: string;
    email: string;
    phone: string;
    login: string;
};

const initialFormValues: ProfileFormValuesType = {
    first_name: "",
    second_name: "",
    display_name: "",
    email: "",
    login: "",
    phone: "",
};

const validator = getValidator("profile");

export const ProfileInfoForm = () => {
    const [avatar, setAvatar] = useState<string | null>(null);
    const [form] = useForm();

    const [openNotification, contextHolder] = useNotification();
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        const response = await getUserInfo();

        if (response.data) {
            setAvatar(response.data.avatar);
            form.setFieldsValue(response.data);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onFinish = (values: ProfileFormValuesType) => {
        setIsLoading(true);
        updateInfo(values).then(response => {
            setIsLoading(false);
            openNotification({
                status: response?.status,
            });
        });
    };
    return (
        <div>
            {contextHolder}
            <Upload
                customRequest={async options => {
                    const avatarResult = await AvatarApi(options);
                    openNotification({
                        status: avatarResult?.status,
                    });
                    fetchData();
                }}
                showUploadList={false}
                fileList={[]}>
                {avatar ? (
                    <Avatar
                        size={64}
                        icon={<UserOutlined />}
                        src={`${PATH.BASE}${PATH.RESOURCES}/${avatar}`}
                        style={{ cursor: "pointer" }}
                    />
                ) : (
                    <Avatar
                        size={64}
                        icon={<UserOutlined />}
                        style={{ cursor: "pointer" }}
                    />
                )}
            </Upload>
            <Divider />
            <Form
                form={form}
                className="profile-form"
                name="profile-form"
                onFinish={onFinish}
                autoComplete="off"
                initialValues={initialFormValues}>
                <Form.Item
                    name="login"
                    label="Login"
                    rules={[{ validator }]}
                    hasFeedback>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[{ validator }]}
                    hasFeedback>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="first_name"
                    label="First Name"
                    rules={[{ validator }]}
                    hasFeedback>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="second_name"
                    label="Second Name"
                    rules={[{ validator }]}
                    hasFeedback>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="display_name"
                    label="Display Name"
                    rules={[{ validator }]}
                    hasFeedback>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ validator }]}
                    hasFeedback>
                    <Input />
                </Form.Item>

                <div className="profile-form__footer">
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        disabled={isLoading}>
                        Save
                    </Button>
                </div>
            </Form>
        </div>
    );
};
