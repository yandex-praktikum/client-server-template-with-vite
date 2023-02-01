import {
    Model,
    Table,
    AutoIncrement,
    PrimaryKey,
    Column,
    DataType,
    AllowNull,
} from "sequelize-typescript";

@Table({
    timestamps: false, // don't add 'created_at', 'updated_at'
    paranoid: true, // add 'deleted_at'
    tableName: "ladder",
})
export class Ladder extends Model<Ladder> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    ladder_id: number | undefined;

    @AllowNull(false)
    @Column(DataType.STRING)
    user_name: string | undefined;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    count: number | undefined;

    @AllowNull(false)
    @Column(DataType.DATE)
    created: string | undefined;
}

@Table({
    timestamps: false,
    paranoid: true,
    tableName: "forum",
})
export class Forum extends Model<Forum> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    theme_id: number | undefined;

    @AllowNull(false)
    @Column(DataType.STRING)
    title: string | undefined;

    @AllowNull(false)
    @Column(DataType.STRING)
    description: number | undefined;

    @AllowNull(false)
    @Column(DataType.DATE)
    created: string | undefined;
}

@Table({
    timestamps: false, // don't add 'created_at', 'updated_at'
    paranoid: true, // add 'deleted_at'
    tableName: "forum_comments",
})
export class ForumComments extends Model<ForumComments> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    comment_id: number | undefined;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    theme_id: string | undefined;

    @AllowNull(false)
    @Column(DataType.STRING)
    body: string | undefined;

    @AllowNull(false)
    @Column(DataType.DATE)
    created: number | undefined;

    @AllowNull(false)
    @Column(DataType.STRING)
    created_by: number | undefined;
}
