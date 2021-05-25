import {
	IsString,
	Length
} from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base_entity';
import { Specialists } from '../models/';
@Entity()
export class Profession extends BaseEntity<Profession> {
	@IsString({ always: true })
	@Length(3, 100, { always: true })
	@Column({ type: 'varchar', nullable: false })
	name: string;

	@OneToMany(() => Specialists, specialists => specialists.profession)
	specialists: Specialists[];
}