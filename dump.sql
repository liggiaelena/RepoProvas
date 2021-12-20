CREATE TABLE "exams" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"link" TEXT NOT NULL,
	"categories_id" integer NOT NULL,
	"teachers_id" integer NOT NULL,
	"subjects_id" integer NOT NULL,
	CONSTRAINT "exams_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "teachers" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "teachers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "subjects" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"semester_id" bigint NOT NULL,
	CONSTRAINT "subjects_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "teachers_subjects" (
	"id" serial NOT NULL,
	"teachers_id" integer NOT NULL,
	"subjects_id" integer NOT NULL,
	CONSTRAINT "teachers_subjects_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "categories" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "semesters" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "semesters_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "exams" ADD CONSTRAINT "exams_fk0" FOREIGN KEY ("categories_id") REFERENCES "categories"("id");
ALTER TABLE "exams" ADD CONSTRAINT "exams_fk1" FOREIGN KEY ("teachers_id") REFERENCES "teachers"("id");
ALTER TABLE "exams" ADD CONSTRAINT "exams_fk2" FOREIGN KEY ("subjects_id") REFERENCES "subjects"("id");


ALTER TABLE "subjects" ADD CONSTRAINT "subjects_fk0" FOREIGN KEY ("semester_id") REFERENCES "semesters"("id");

ALTER TABLE "teachers_subjects" ADD CONSTRAINT "teachers_subjects_fk0" FOREIGN KEY ("teachers_id") REFERENCES "teachers"("id");
ALTER TABLE "teachers_subjects" ADD CONSTRAINT "teachers_subjects_fk1" FOREIGN KEY ("subjects_id") REFERENCES "subjects"("id");








