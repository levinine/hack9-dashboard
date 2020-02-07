import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, OneToMany, JoinColumn } from "typeorm";
import { Team } from "./Team";
import { TestToTestExecution } from "./TestToTestExecution";

@Entity({ name: 'test_execution' })
export class TestExecution {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['scheduled', 'running', 'finished'], nullable: false, default: 'scheduled' })
  @Index('status_IX')
  status: string;

  @Column({ type: 'varchar', name: 'api_url', length: 255, default: null })
  apiUrl: string;

  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: false, default: 0.000 })
  score: number;

  @Column({ type: 'longtext',  charset: 'utf8mb4', default: null })
  results: string;

  @Column({ type: 'enum', name: 'cloud_provider', enum: ['aws', 'azure', 'gcp'], default: 'aws' })
  cloudProvider: string;

  @Column({ type: 'varchar', length: 15, default: null })
  region: string;

  @Column({ type: 'varchar', length: 40, default: null })
  @Index('test_execution_code_IDX', { unique: true })
  code: string;

  @ManyToOne(type => Team, team => team.testExecutions)
  @JoinColumn({
    name: 'team_id',
  })
  team: Team;

  @Column({ type: 'integer', name: 'team_id' })
  teamId: number;

  @OneToMany(type => TestToTestExecution, testToTestExecution => testToTestExecution.testExecution)
  public testToTestExecutions?: TestToTestExecution[];
}