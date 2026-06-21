import { getCategory } from "@/action/category.action";
import { getMedicines } from "@/action/medicine.action";
import ShopPage from "@/components/modules/shop/ShopPage";

export default async function MedicineShopPage() {
  const { data: medicine } = await getMedicines();
  const { data: categories } = await getCategory();

  const medicineData = medicine?.data;
  const categoriesData = categories?.data;

  return (
    <div className="mx-auto max-w-7xl px-4">
      <ShopPage medicines={medicineData} categories={categoriesData} />
    </div>
  );
}
