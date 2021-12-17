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

  @OneToOne(()=> Teacher)
  @JoinColumn({ name: 'teachers_id' })
  teacher: number;

  @OneToOne(()=> Subject)
  @JoinColumn({ name: 'subjects_id' })
  subject: number;

  @OneToOne(()=> Category)
  @JoinColumn({ name: 'categories_id' })
  category: number;

}