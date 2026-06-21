import { getCategory } from "@/action/category.action";
import { getMedicinesById } from "@/action/medicine.action";
import { UpdateMedicine } from "@/components/modules/admin/UpdateMedicine";

import { userService } from "@/services/user.services";

export default async function UpdateMedicinePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const { data } = await getMedicinesById(id);

  const { data: userSession } = await userService.getSession();

  if (!userSession?.user?.id) {
    return <div>No user session found.</div>;
  }
  const { data: category } = await getCategory();

  const categories = category?.data;

  const userId = userSession?.user?.id as string;
  return (
    <div className="flex min-h-screen items-center justify-center">
      <UpdateMedicine
        user={{ id: userId }}
        data={{ data: data?.data }}
        categories={categories}
      />
    </div>
  );
}
