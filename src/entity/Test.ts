import { Entity, PrimaryGeneratedColumn, Column, Index, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { TestToTestExecution } from "./TestToTestExecution";

@Entity()
export class Test {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type:'varchar',unique: true, length: 150, nullable: false })
  @Index('test_name_UNIQUE', { unique: true })
  name: string;

  @Column({ type: 'integer' })
  weight: number;

  @Column({ type:'smallint', name: 'is_score_descrete' })
  isScoreDescrete: boolean;

  @Column({ type: 'varchar', name: 'test_data_file', length: 150, nullable: true })
  testDataFile: string;

  @Column({ type:'smallint', name: 'is_score_ascending' })
  isScoreAscending: boolean;

  @OneToOne(type => Test)
  @JoinColumn({
    name: 'depends_on_id',
  })
  dependsOn: Test;

  @OneToMany(type => TestToTestExecution, testToTestExecution => testToTestExecution.test)
  public testToTestExecutions?: TestToTestExecution[];

}

