import {
	IsEmail,
	IsOptional,
	Length,
} from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base_entity';
import { Profession } from './profession';

@Entity('specialists')
export class Specialists extends BaseEntity<Specialists> {
	@Length(1, 50, { always: true })
	@Column({ type: 'varchar', length: 50, nullable: false })
	record: string;

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

	@ManyToOne(() => Profession, profession => profession.specialist)
	profession: Profession;
}
