import { Router } from "express";
import {
  addData,
  getChildsData,
  getCount,
  updateData,
} from "@/handlers/child-data";

export const childDataRouter = Router();
childDataRouter.get("/", getChildsData);
childDataRouter.get("/count", getCount);
childDataRouter.post("/create", addData);
childDataRouter.put("/update", updateData);
