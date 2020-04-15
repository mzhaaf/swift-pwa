import { withTranslation } from '@i18n'
import Layout from "@components/Layouts";
import Content from "./component"

const Page = props => {
    const { t } = props;
    const pageConfig = {
        title: t("customer:address:pageTitle"),
        header: "relative", // available values: "absolute", "relative", false (default)
        headerTitle: t("customer:address:title"),
        bottomNav: "account"
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Content {...props} />
        </Layout>
    );
};

export default withTranslation()(Page);
