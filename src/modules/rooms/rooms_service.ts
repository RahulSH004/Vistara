import { db } from "../../db/connection.js";
import { rooms } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { ApiError } from "../../utils/ApiError.js";

