import { prismaClient } from "@/lib/db";
import { Request, Response } from "express";
import { updateCount } from "@/lib/helpers";
import { z } from "zod";

const createInput = z.object({
  childName: z.string({ required_error: "childName is required" }),
  data: z.string({ required_error: "data is required" }),
});

const updateInput = z.object({
  id: z.number({ required_error: "Id is required" }),
  data: z.string({ required_error: "data is required" }),
});

// get child data
export async function getChildsData(req: Request, res: Response) {
  try {
    //
    const childData = await prismaClient.childData.findMany({
      orderBy: { createdAt: "asc" },
    });
    //
    return res.status(200).json({
      success: true,
      data: childData,
      message: "fetched child data",
    });
    //
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// get count
export async function getCount(req: Request, res: Response) {
  try {
    const count = await prismaClient.requestCount.findMany();
    //as three will only be one count data in db we will return first elemtn of count
    return res.status(200).json({
      success: true,
      message: "fetched count successfully",
      data: count[0],
    });
    //
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// get create new data for child
export async function addData(req: Request, res: Response) {
  try {
    // updating count
    updateCount(res, "addData");
    //
    const reqBody = req.body;
    console.log("reqBody", reqBody);
    const parsedInput = createInput.safeParse(reqBody);
    //
    if (!parsedInput.success) {
      return res.status(400).json({
        success: false,
        message: parsedInput.error.formErrors.fieldErrors,
      });
    }
    const { childName, data } = parsedInput.data;
    //
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "data should be provided",
      });
    }
    // finding child in db
    const childInDb = await prismaClient.child.findUnique({
      where: { childName },
    });
    // if no data with this child name creating one
    if (!childInDb) {
      await prismaClient.child.create({
        data: {
          childName,
        },
      });
    }
    //
    await prismaClient.childData.create({
      data: {
        child: { connect: { childName } },
        data,
      },
    });
    //
    return res.status(200).json({
      success: true,
      message: "created child data successfully",
    });
    //
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// update data handler

export async function updateData(req: Request, res: Response) {
  try {
    // updating count
    updateCount(res, "updateDate");
    //
    const reqBody = req.body;
    console.log("reqBody", reqBody);
    const parsedInput = updateInput.safeParse(reqBody);
    //
    if (!parsedInput.success) {
      return res.status(400).json({
        success: false,
        message: parsedInput.error.formErrors.fieldErrors,
      });
    }
    const { id, data } = parsedInput.data;
    //
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "data should be provided",
      });
    }

    //
    await prismaClient.childData.update({
      where: { id },
      data: {
        data,
      },
    });
    //
    return res.status(200).json({
      success: true,
      message: "updated child data successfully",
    });
    //
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
