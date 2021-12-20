import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import Subject from "./Subject";
import Exam from "./Exam";

@Entity("teachers")
export default class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(()=> Exam, exam => exam.teacher)
    exams: Exam

}