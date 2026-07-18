import { getMedicines } from "@/action/medicine.action";
import { getReview } from "@/action/review.action";
import AboutSection from "@/components/modules/homePage/aboutSection";
import CategoriesSection from "@/components/modules/homePage/categoriesSection";
import FeaturedMedicines from "@/components/modules/homePage/FeaturedSection";

import Footer from "@/components/modules/homePage/Footer";
import HeroSection from "@/components/modules/homePage/heroSection";
import StatsSection from "@/components/modules/homePage/StatsSection";
import TestimonialsSection from "@/components/modules/homePage/TestimonialsSection";
import { Medicine } from "@/constants/MedicineData";
import { categoryService } from "@/services/category.services";
export const dynamic = "force-dynamic";

export default async function home() {
  const { data } = await categoryService.getCategory({
    cache: "no-store",
  });
  const { data: medicine } = await getMedicines();
  const { data: review } = await getReview();

  const medicineData: Medicine[] = Array.isArray(medicine?.data)
    ? medicine?.data
    : [];

  const recent = [...medicineData]
    .sort(
      (a: Medicine, b: Medicine) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 8);

  const reviewsArr = Array.isArray(review?.data) ? review.data : [];

  const averageRating = reviewsArr.length
    ? reviewsArr.reduce(
        (sum: number, r: { rating: number }) => sum + r.rating,
        0,
      ) / reviewsArr.length
    : 0;

  const categoryCount = Array.isArray(data?.data) ? data.data.length : 0;
  return (
    <div className="mx-auto max-w-7xl px-4">
      <HeroSection />
      <AboutSection />
      <CategoriesSection categories={data?.data} />
      <FeaturedMedicines medicines={recent} />
      <TestimonialsSection reviews={reviewsArr} />
      <StatsSection
        medicineCount={medicine?.meta?.total ?? medicineData.length}
        categoryCount={data?.meta?.total ?? categoryCount}
        reviewCount={review?.meta?.total ?? reviewsArr.length}
        averageRating={averageRating}
      />
      <Footer />
    </div>
  );
}
