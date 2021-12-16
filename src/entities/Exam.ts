import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import Subject from "./Subject";
import Semester from "./Semester";
import Teacher from "./Teachers";
import Category from "./Category";

@Entity("exams")
export default class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  link: string;

  @OneToOne(()=> Teacher, { eager: true })
  @JoinColumn({ name: 'teachers_id' })
  teacher: number;

  @OneToOne(()=> Subject, { eager: true })
  @JoinColumn({ name: 'subjects_id' })
  subject: number;

  @OneToOne(()=> Category, { eager: true })
  @JoinColumn({ name: 'categories_id' })
  category: number;

  @OneToOne(()=> Semester, { eager: true })
  @JoinColumn({ name: 'semesters_id' })
  semester: number;
}