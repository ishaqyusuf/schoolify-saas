import { CreateStudentSchema, Student } from "@acme/db/schema";

import { publicProcedure } from "../trpc";

export const studentRouter = {
  create: publicProcedure
    .input(CreateStudentSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(Student).values(input);
    }),
};
