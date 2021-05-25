import {
	IsEmail,
	IsOptional,
	IsString,
	Length,
} from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base_entity';
import { Profession } from './profession';

@Entity()
export class Specialists extends BaseEntity<Specialists> {
	@IsString({ always: true })
	@Length(0, 50, { always: true })
	@Column({ type: 'varchar', length: 50, nullable: false, unique: true })
	record: string;

	@IsString({ always: true })
	@Length(1, 150, { always: true })
	@Column({ type: 'varchar', length: 150, nullable: false })
	name: string;

	@IsOptional({ always: true })
	@Column({ nullable: true })
	phoneNumber: string;

	@Column({ nullable: false })
	cellPhone: string;

	@IsEmail({}, { always: true })
	@Column({ type: 'varchar', length: 255 })
	email: string;

	@ManyToOne(() => Profession, profession => profession.specialists)
	profession: Profession;
}
