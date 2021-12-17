import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import Exam from "./Exam";
import Semester from "./Semester";

@Entity("subjects")
export default class Subject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(()=> Semester, semester => semester.id, {eager: true})
    @JoinColumn({ name: 'semester_id' })
    semester: number;

    @OneToMany(()=> Exam, exam => exam.subject)
    @JoinColumn({name: 'id'})
    exams: Exam;
}