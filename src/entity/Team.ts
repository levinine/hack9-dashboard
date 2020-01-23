import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from "typeorm";
import { User } from "./User";
import { TestExecution } from "./TestExecution";

@Entity()
export class Team {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, length: 150, nullable: false })
  @Index('name_UNIQUE', { unique: true })
  name: string;

  @Column({ type: 'varchar', name: 'api_url', length: 255, default: null })
  apiUrl: string;

  @Column({ type: 'decimal', precision:10, scale: 3, nullable: false, default: 0.000 })
  score: number;

  @Column({ name: 'score_diversity', type: 'decimal', precision:10, scale: 3, nullable: false, default: 0.000 })
  scoreDiversity: number;

  @Column({ name: 'score_costs', type: 'decimal', precision:10, scale: 3, nullable: false, default: 0.000 })
  scoreCosts: number;

  @Column({ type: 'enum', name: 'cloud_provider', enum: ['aws', 'azure', 'gcp'], nullable: false })
  cloudProvider: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  region: string;

  @Column({ type: 'enum', enum: ['ready', 'scheduled', 'running'], nullable: false, default: 'ready' })
  status: string;

  @OneToMany(type => User, user => user.team)
  users: User[];

  @OneToMany(type => TestExecution, testExecution => testExecution.team)
  testExecutions: TestExecution[];
}