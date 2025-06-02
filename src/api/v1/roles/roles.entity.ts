import { BaseEntity } from '@common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Roles extends BaseEntity {
  @Column({ unique: true, length: 50 })
  name!: string;

  @Column({ type: 'json', nullable: true })
  permissions?: string[];
}
