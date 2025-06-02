import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

import { BaseEntity } from '@common/entities/base.entity';
import { pwdHash } from '@common/utils/password';

@Entity()
export class Users extends BaseEntity {
  @Column({ name: 'role_id' })
  roleId!: number;

  @Column({ unique: true, length: 50 })
  email: string;

  @Column({ unique: true, length: 20 })
  username: string;

  @Column({ select: false, length: 255 })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await pwdHash(this.password);
  }
}
