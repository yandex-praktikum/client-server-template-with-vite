import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Length,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  paranoid: false,
  tableName: 'users',
})
class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number;

  @AllowNull(false)
  @Length({ max: 20, min: 3 })
  @Column(DataType.STRING)
  name: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  avatar_path: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  is_night_mode_enabled: boolean;
}

export default User;
