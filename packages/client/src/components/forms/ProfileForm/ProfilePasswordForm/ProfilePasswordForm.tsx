import { Form, Button, Input } from "antd";

import "../ProfileForm.scss";
import { updatePassword } from "../../../../services/profile";
import { useForm } from "antd/es/form/Form";
import { getValidator } from "../validation";

export type ProfilePasswordFormValuesType = {
    oldPassword: string;
    newPassword: string;
};

const initialFormValues = {
    oldPassword: "",
    newPassword: "",
};

const validator = getValidator("password");

export const ProfilePasswordForm = () => {
    const [form] = useForm();

    const onFinish = async (values: ProfilePasswordFormValuesType) => {
        const isUpdated = await updatePassword(values);
        // TODO: добавить нотификацию

        if (isUpdated) {
            form.resetFields();
            console.log("OK");
        }
    };
    return (
        <div>
            <Form
                form={form}
                className="profile-form"
                name="profile-form"
                onFinish={onFinish}
                autoComplete="off"
                initialValues={initialFormValues}>
                <Form.Item
                    name="oldPassword"
                    label="Old Password"
                    rules={[{ validator }]}
                    hasFeedback>
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="newPassword"
                    label="New Password"
                    dependencies={["oldPassword"]}
                    rules={[{ validator }]}
                    hasFeedback>
                    <Input.Password />
                </Form.Item>
                <div className="profile-form__footer">
                    <Button type="primary" htmlType="submit" block>
                        Save
                    </Button>
                </div>
            </Form>
        </div>
    );
};
