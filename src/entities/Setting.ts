import { PrimaryColumn, Entity, Column, BaseEntity } from 'typeorm';

@Entity()
export class Setting extends BaseEntity {
	@PrimaryColumn()
	guildId: string;

	@Column({ nullable: true, type: 'varchar' })
	managerRoleId: string | null;
}
