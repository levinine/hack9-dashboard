import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Message {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  content: number;

  @Column({ type: 'enum', enum: ['Serbia', 'Ukraine', 'Romania', 'Netherlands'], nullable: true })
  country: string;

  @Column({ type: 'boolean', name: 'is_global', nullable: false })
  isGlobal: string;

  @Column({ type: 'integer',  name: 'expiration_time', nullable: true })
  expirationTime: number;

  @Column({ type: 'integer', name: 'user_id' })
  userId: number;

  @ManyToOne(user => User, user => user.messages)
  @JoinColumn({
    name: 'user_id',
  })
  user?: User;
}