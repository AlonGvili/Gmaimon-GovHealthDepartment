import { User } from ".prisma/client";
import { ActionFunction } from "remix";
import { db } from "~/utils/db.server";

export let action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let newUser = Object.fromEntries(formData.entries()) as unknown as User;
  console.log("formData", formData);
  console.log("newUser", newUser);
  try {
    let user = await db.user.upsert({
      where: { idNumber: newUser.idNumber },
      create: {
        ...newUser,
      },
      update: {
        ...newUser,
      },
    });
    return user;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
