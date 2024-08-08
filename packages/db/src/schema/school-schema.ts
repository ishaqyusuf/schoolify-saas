// school, academicSession, academicTerm
// classes,

import { integer, jsonb, pgTable, varchar } from "drizzle-orm/pg-core";

import { __uuidPri, _uuidRel, timeStamps } from "./schema-helper";

export const School = pgTable("school", {
  id: __uuidPri,
  name: varchar("name", { length: 256 }).notNull(),
  meta: jsonb("meta").$type<{
    id: string;
  }>(),
  ...timeStamps,
});
export const AcademicSession = pgTable("academic_session", {
  id: __uuidPri,
  name: varchar("name", { length: 256 }).notNull(),
  schoolId: _uuidRel("schoolId", School.id),
  ...timeStamps,
});
export const AcademicTerm = pgTable("academic_term", {
  id: __uuidPri,
  name: varchar("name", { length: 256 }).notNull(),
  schoolId: _uuidRel("schoolId", School.id),
  academicSessionId: _uuidRel("academicSessionId", AcademicSession.id),
  ...timeStamps,
});
export const AcademicClass = pgTable("academic_class", {
  id: __uuidPri,
  name: varchar("name", { length: 256 }).notNull(),
  schoolId: _uuidRel("schoolId", School.id),
  classLevel: integer("classLevel").notNull().default(1),
  ...timeStamps,
});
export const Subjects = pgTable("subjects", {
  id: __uuidPri,
  name: varchar("name", { length: 256 }).notNull(),
  schoolId: _uuidRel("schoolId", School.id),
  ...timeStamps,
});
export const SessionClass = pgTable("session_class", {
  id: __uuidPri,
  schoolId: _uuidRel("schoolId", School.id),
  academicSessionId: _uuidRel("academicSessionId", AcademicSession.id),
  academicClassId: _uuidRel("academicClassId", AcademicClass.id),
  ...timeStamps,
});
export const ClassSubject = pgTable("class_subject", {
  id: __uuidPri,
  name: varchar("name", { length: 256 }).notNull(),
  schoolId: _uuidRel("schoolId", School.id),
  academicSessionId: _uuidRel("academicSessionId", AcademicSession.id),
  academicClassId: _uuidRel("academicClassId", AcademicClass.id),
  sessionClassId: _uuidRel("sessionClassId", SessionClass.id),
  ...timeStamps,
});
