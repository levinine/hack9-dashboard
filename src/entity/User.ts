import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, JoinColumn, OneToMany } from "typeorm";
import { Team } from "./Team";
import { Message } from "./Message";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  @Index('email_UNIQUE', { unique: true })
  email: string;

  @Column({ type: 'enum', enum: ['Serbia', 'Ukraine', 'Romania', 'Netherlands'], nullable: false, default: 'Serbia' })
  country: string;

  @Column({ type: 'enum', enum: ['user', 'admin'], nullable: false, default: 'user' })
  type: string;

  @ManyToOne(type => Team, team => team.users)
  @JoinColumn({
    name: 'team_id',
  })
  team?: Team;

  @Column({ type: 'integer', name: 'team_id' })
  teamId: number;

  @OneToMany(type => Message, message => message.user)
  public messages?: Message[];
}