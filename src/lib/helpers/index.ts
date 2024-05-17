import { Response } from "express";
import { prismaClient } from "../db";

// if we have users we can take user id and create table for every user
export async function updateCount(
  res: Response,
  type: "addData" | "updateDate"
) {
  /* we will have to find many as dont have any user record but 
  for now we will just create one table and update it whenever request comes */
  const countInDb = await prismaClient.requestCount.findFirst();

  if (!countInDb) {
    if (type === "addData") {
      await prismaClient.requestCount.create({
        data: {
          addDataCount: 1,
          updateDataCount: 0,
        },
      });
    } else {
      await prismaClient.requestCount.create({
        data: {
          addDataCount: 0,
          updateDataCount: 1,
        },
      });
    }
  }

  //   we will take the first record as we only have one table for keeping the records of request
  const countData = await prismaClient.requestCount.findFirst();
  const currentAddDataCount = countData?.addDataCount;
  const currentUpdateDataCount = countData?.updateDataCount;

  // we have to do updateMany as we not keep record of user right now
  if (type === "addData") {
    await prismaClient.requestCount.updateMany({
      data: {
        addDataCount: currentAddDataCount! + 1,
      },
    });
  } else {
    await prismaClient.requestCount.updateMany({
      data: {
        updateDataCount: currentUpdateDataCount! + 1,
      },
    });
  }
}
