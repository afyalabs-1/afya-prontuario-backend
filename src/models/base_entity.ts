import type { DeepPartial } from 'typeorm';
import {
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { nanoid } from 'nanoid/async';

const ID_LENGTH = 16;

export class BaseEntity<T> {
  constructor(partialObject?: DeepPartial<T>) {
    Object.assign(this, partialObject);
  }

  @IsString()
  @PrimaryColumn({ length: ID_LENGTH })
  id: string;

  @Expose({ groups: ['showDate'] })
  @CreateDateColumn()
  createdDate?: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedDate?: Date;

  @Exclude()
  // flag to prevent EntityValidator from acting on the entity
  _doNotValidate: boolean;

  @BeforeInsert()
  async generateId() {
    if (!this.id) {
      this.id = await nanoid(ID_LENGTH);
    }
  }
}
