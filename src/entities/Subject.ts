import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import Exam from "./Exam";
import Semester from "./Semester";
import Teacher from "./Teachers";

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