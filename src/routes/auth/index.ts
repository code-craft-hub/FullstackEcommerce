import { Router } from "express";
import { validateData } from "../../middlewares/validationMiddleware";
import {
  createUserSchema,
  loginSchema,
  usersTable,
} from "../../../database/usersSchema";
import db from "../../../database/drizzle";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const authRouter = Router();

authRouter.post(
  "/register",
  validateData(createUserSchema),
  async (req, res) => {
    try {
      const data = req.cleanBody;
      data.password = await bcrypt.hash(data.password, 10);
      const [user] = await db.insert(usersTable).values(data).returning();
      const {password, ...createdUser} = user;
      res.status(201).json({ user: createdUser });
    } catch (error) {
      res.status(500).send("Something went wrong.");
    }
  }
);

authRouter.post("/login", validateData(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.cleanBody;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) res.status(401).json({ error: "Authentication failed" });

    const matched = await bcrypt.compare(password, user.password);
    if (!matched)
      res.status(401).json({ error: "Authentication failed" });

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      "your-secret",
      { expiresIn: "30d" }
    );

    const { password:_, ...userWithoutPassword } = user;
    res.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

export default authRouter;
