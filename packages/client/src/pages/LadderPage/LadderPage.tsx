import MainLayout from "@/containers/MainLayout/MainLayout";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import ContentContainer from "@/containers/ContentContainer/ContentContainer";
import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    leaderboardActions,
    leaderboardSelector,
} from "@/store/slices/leaderboard/leaderBoardSlice";
import { LeaderBoardUser } from "@/api/typesApi";
import { formattedDate } from "@/utils/formattedDate";

interface DataType extends LeaderBoardUser {
    key: number;
}

const LadderPage = () => {
    const dispatch = useAppDispatch();

    const columns: ColumnsType<DataType> = useMemo(
        () => [
            {
                title: "Логин пользователя",
                dataIndex: "name",
                key: "name",
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
        ],
        []
    );

    useEffect(() => {
        dispatch(leaderboardActions.get());
    }, []);

    const { data, fetching } = useAppSelector(leaderboardSelector.leaders);

    const formattedData = useMemo(
        () =>
            data.map((user, index) => {
                const { score, name, date } = user.data.result;

                return {
                    key: index,
                    name,
                    date: formattedDate(new Date(date)),
                    score,
                };
            }),
        [data]
    );

    return (
        <MainLayout data-testid="leader-board">
            <ContentContainer title="Доска лидеров">
                {fetching ? (
                    // TODO: лоадер
                    "Загрузка..."
                ) : (
                    <Table
                        columns={columns}
                        dataSource={formattedData}
                        pagination={false}
                    />
                )}
            </ContentContainer>
        </MainLayout>
    );
};

export default LadderPage;
