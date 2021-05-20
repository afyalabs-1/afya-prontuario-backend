import {
	IsString,
	Length
} from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../_commons/base_entity';

@Entity()
export class Profession extends BaseEntity<Profession> {

	@IsString({ always: true })
	@Length(3, 100, { always: true })
	@Column({ type: 'varchar', nullable: false })
	name: string;

}