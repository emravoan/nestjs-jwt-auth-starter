import { BaseEntity } from '@common/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Users } from '../users/users.entity';

@Entity()
export class Roles extends BaseEntity {
  @Column({ unique: true, length: 50 })
  name!: string;

  @Column({ type: 'json', nullable: true })
  permissions?: string[];

  @OneToMany(() => Users, (user) => user.role)
  users!: Users[];
}
