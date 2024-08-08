import { decimal, pgTable, varchar } from "drizzle-orm/pg-core";

import { __uuidPri, _uuidRel, timeStamps } from "./schema-helper";
import { AcademicTerm, School } from "./school-schema";
import { StudentSessionForm } from "./student-schema";

export const schoolWallet = pgTable("school_wallet", {
  id: __uuidPri,
  schoolId: _uuidRel("schoolId", School.id),
  balance: decimal("balance").default("0.00"),
  ...timeStamps,
});

type PaymentTypes = "credit" | "debit";
export const transaction = pgTable("transaction", {
  id: __uuidPri,
  schoolId: _uuidRel("schoolId", School.id),
  type: varchar("type").$type<PaymentTypes>(),
  headline: varchar("headline"),
  description: varchar("description"),
  amount: decimal("amount").notNull(),
  academicTermId: _uuidRel("academicTermId", AcademicTerm.id),
  ...timeStamps,
});
export const studenTransaction = pgTable("student_transaction", {
  id: __uuidPri,
  schoolId: _uuidRel("schoolId", School.id),
  studentSessionFormId: _uuidRel("studentSessionFormId", StudentSessionForm.id),
  transactionId: _uuidRel("transactionId", transaction.id),
  ...timeStamps,
});
