"use client";

import { updateMedicine } from "@/action/medicine.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { categoryOption } from "@/constants/categoryData";
import { MedicineData } from "@/constants/MedicineData";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

export interface MedicineResponse {
  data: MedicineData;
}

type UpdateMedicineProps = {
  user: {
    id: string;
  };
  data: MedicineResponse | null;
  categories: categoryOption[];
};

const medicineSchema = z.object({
  name: z.string(),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(5000, "Description must be less than 5000 characters"),
  expiryDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  image: z.string().url("Must be a valid URL"),
  categoryId: z.number(),
  manufacturer: z
    .string()
    .min(2, "Manufacturer must be at least 2 characters")
    .max(200, "Manufacturer must be less than 200 characters"),
  price: z.number().min(0, "Price must be greater than 0"),
  stock: z.number().min(0, "Stock must be at least 0"),
});

export function UpdateMedicine({ data, categories }: UpdateMedicineProps) {
  const medicineData = data?.data;
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: medicineData?.name || "",
      description: medicineData?.description || "",
      expiryDate: medicineData?.expiryDate
        ? new Date(medicineData.expiryDate).toISOString().substring(0, 10)
        : "",
      image: medicineData?.image || "",
      manufacturer: medicineData?.manufacturer || "",
      price: medicineData?.price || 0,
      categoryId: medicineData?.categoryId || 0,
      stock: medicineData?.stock || 0,
    },
    validators: {
      onSubmit: medicineSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Saving...");

      // Convert expiryDate to Date
      const payload = {
        ...value,
        expiryDate: new Date(value.expiryDate),
      };

      try {
        if (value) {
          const res = await updateMedicine(medicineData?.id as string, payload);

          if (res.error) {
            toast.error("Something went wrong", { id: toastId });
          } else {
            toast.success(
              medicineData ? "Medicine Updated" : "Medicine Created",
              { id: toastId },
            );
            router.push("/seller-dashboard/medicine");
          }
        }
      } catch (err) {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>
          {medicineData ? "Update Medicine" : "Create Medicine"}
        </CardTitle>
        <CardDescription>
          Fill in the information below for the medicine
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="medicine-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Name */}
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Manufacturer Name"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            {/* Description */}
            <form.Field name="description">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <Textarea
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Medicine Description"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Expiry Date */}
            <form.Field name="expiryDate">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Expiry Date</FieldLabel>
                    <Input
                      type="date"
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            {/* Category */}
            <form.Field name="categoryId">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Category</FieldLabel>

                    <select
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      className="w-full rounded-md border px-3 py-2 text-sm"
                    >
                      <option value="">Select a category</option>
                      {categories?.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Image URL */}
            <form.Field name="image">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Image URL</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="https://..."
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Manufacturer */}
            <form.Field name="manufacturer">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Manufacturer</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Manufacturer Name"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Price */}
            <form.Field name="price">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                    <Input
                      type="number"
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      placeholder="Price"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Stock */}
            <form.Field name="stock">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Stock</FieldLabel>
                    <Input
                      type="number"
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      placeholder="Stock Quantity"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button form="medicine-form" type="submit" className="w-full">
          {medicineData ? "Update" : "Create"}
        </Button>
      </CardFooter>
    </Card>
  );
}
