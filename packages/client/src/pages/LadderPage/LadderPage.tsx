import React from "react";
import MainLayout from "../../containers/MainLayout/MainLayout";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import ContentContainer from "../../containers/ContentContainer/ContentContainer";

interface DataType {
    key: string;
    name: string;
    date: string;
    score: string;
}

const LadderPage = () => {
    const columns: ColumnsType<DataType> = [
        {
            title: "Логин пользователя",
            dataIndex: "name",
            key: "name",
            render: text => <a>{text}</a>,
        },
        {
            title: "Дата",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Колличество баллов",
            dataIndex: "score",
            key: "score",
        },
    ];
    const data: DataType[] = [
        {
            key: "1",
            name: "John Brown",
            date: "12.12.2014",
            score: "111",
        },
        {
            key: "2",
            name: "Jim Green",
            date: "1.03.2022",
            score: "23",
        },
        {
            key: "3",
            name: "Joe Black",
            date: "21.06.2018",
            score: "2",
        },
    ];
    return (
        <MainLayout data-testid="leader-board">
            <ContentContainer title="Доска лидеров">
                <Table columns={columns} dataSource={data} pagination={false} />
            </ContentContainer>
        </MainLayout>
    );
};

export default LadderPage;
