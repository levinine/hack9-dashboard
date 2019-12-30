import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm";
import { Test } from "./Test";
import { TestExecution } from "./TestExecution";

@Entity({ name: 'test_to_test_execution' })
export class TestToTestExecution {

    @PrimaryColumn('integer')
    public testId!: number;
    
    @PrimaryColumn('integer')
    public testExecutionId!: number;

    @Column({ type: 'decimal', precision: 10, scale: 3, nullable: false, default: 0.000 })
    public score: number;

    @ManyToOne(type => Test, test => test.testToTestExecutions)
    public test?: Test;

    @ManyToOne(type => TestExecution, testExecution => testExecution.testToTestExecutions)
    public testExecution?: TestExecution;
}