import { getMedicines } from "@/action/medicine.action";
import AboutSection from "@/components/modules/homePage/aboutSection";
import CategoriesSection from "@/components/modules/homePage/categoriesSection";
import FeaturedMedicines from "@/components/modules/homePage/FeaturedSection";

import Footer from "@/components/modules/homePage/Footer";
import HeroSection from "@/components/modules/homePage/heroSection";
import { Medicine } from "@/constants/MedicineData";
import { categoryService } from "@/services/category.services";
export const dynamic = "force-dynamic";

export default async function home() {
  const { data } = await categoryService.getCategory({
    cache: "no-store",
  });
  const { data: medicine } = await getMedicines();

  const medicineData: Medicine[] = Array.isArray(medicine?.data)
    ? medicine?.data
    : [];

  const recent = [...medicineData]
    .sort(
      (a: Medicine, b: Medicine) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 8);
  return (
    <div className="mx-auto max-w-7xl px-4">
      <HeroSection />
      <AboutSection />
      <CategoriesSection categories={data?.data} />
      <FeaturedMedicines medicines={recent} />
      <Footer />
    </div>
  );
}
