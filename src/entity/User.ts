import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from "typeorm";
import { Team } from "./Team";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  @Index('email_UNIQUE', { unique: true })
  email: number;

  @Column({ type: 'enum', enum: ['user', 'admin'], nullable: false, default: 'user' })
  type: string;

  @ManyToOne(type => Team, team => team.users)
  team: Team;

  @Column({ type: 'integer', name: 'team_id' })
  teamId: number;

}