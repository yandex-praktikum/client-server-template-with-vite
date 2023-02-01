import "./SignUpPage.scss";
import SignUpForm from "@/components/forms/SignUpForm/SignUpForm";
import { Layout } from "antd";
import { useAppSelector } from "@/store/hooks";
import { themeSelectors } from "@/store/slices/theme/themeSlice";

export const SignUpPage = () => {
    const { theme } = useAppSelector(themeSelectors.all);

    return (
        <Layout
            className="layout main"
            style={{ backgroundImage: theme.images.backgroundLong }}>
            <SignUpForm />
        </Layout>
    );
};
