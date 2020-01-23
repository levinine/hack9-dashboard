import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { Test } from "./Test";
import { TestExecution } from "./TestExecution";

@Entity({ name: 'test_to_test_execution' })
export class TestToTestExecution {

  @PrimaryColumn({ type: 'integer', name: 'test_id' })
  testId!: number;

  @PrimaryColumn({ type: 'integer', name: 'test_execution_id' })
  testExecutionId!: number;

  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: false, default: 0.000 })
  score: number;

  @Column({ type: 'longtext', charset: 'utf8mb4', default: null })
  output: string;

  @ManyToOne(type => Test, test => test.testToTestExecutions)
  @JoinColumn({
    name: 'test_id',
  })
  test?: Test;

  @ManyToOne(type => TestExecution, testExecution => testExecution.testToTestExecutions)
  @JoinColumn({
    name: 'test_execution_id',
  })
  testExecution?: TestExecution;
}