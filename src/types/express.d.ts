import { users } from '../db/schema.js'

type UserSelect = typeof users.$inferSelect  

declare global {
  namespace Express {
    interface Request {
      user?: UserSelect;
    }
  }
}