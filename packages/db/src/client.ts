import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

import * as schema from "./schema";

// export const rels = relations(schema, (r) => ({
//   User: {
//     // accounts: r.many
//   },
// }));
export const db = drizzle(sql, { schema });

// db.query.Post.findMany({
//     where: {

//     }
// })
