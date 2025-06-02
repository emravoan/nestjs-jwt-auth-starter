import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '@common/entities/base.entity';
import { pwdHash } from '@common/utils/password';
import { Roles } from '../roles/roles.entity';

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

  @ManyToOne(() => Roles)
  @JoinColumn({ name: 'role_id' })
  role!: Roles;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await pwdHash(this.password);
  }
}
