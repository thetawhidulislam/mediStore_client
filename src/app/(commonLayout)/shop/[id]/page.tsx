import { getMedicinesById, getMedicines } from "@/action/medicine.action";
import MedicineDetailsPage from "@/components/modules/shop/SignlePage";
import { userService } from "@/services/user.services";
import { getMedicineData } from "@/constants/MedicineData";

export default async function SigleShopPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const { data: medicine } = await getMedicinesById(id);

  const medicineData = medicine.data;
  const { data } = await userService.getSession();

  const user = data?.user;

  // Related items: same category, excluding the current medicine.
  const allMedicines = await getMedicines();
  const medicinesList: getMedicineData[] = allMedicines?.data?.data ?? [];
  
  const relatedMedicines: getMedicineData[] = medicinesList
  .filter(
    (m: getMedicineData) =>
      m.categoryId === medicineData.categoryId && m.id !== medicineData.id
  )
    .slice(0, 4);
    
  return (
    <div className="mx-auto max-w-7xl px-4">
      <MedicineDetailsPage
        medicine={medicineData}
        user={user}
        relatedMedicines={relatedMedicines}
      />
    </div>
  );
}