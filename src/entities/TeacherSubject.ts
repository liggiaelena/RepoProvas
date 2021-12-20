import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, JoinColumn, ManyToOne } from "typeorm";
import Subject from "./Subject";
import Teacher from "./Teachers";

@Entity("teachers_subjects")
export default class TeacherSubject {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> Subject, subject => subject.id)
    @JoinColumn({ name: 'subjects_id' })
    subjectId: number

    @ManyToOne(()=> Teacher, teacher => teacher.id, {eager:true})
    @JoinColumn({ name: 'teachers_id' })
    teacherId: number

}