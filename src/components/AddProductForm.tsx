import { useTheme } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { tokens } from "../theme";

interface ProductForm {
  name: string;
  sku: string;
  description: string;
  price: number;
}

interface AddProductFormProps {
  onSubmit: (data: ProductForm) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onSubmit }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>();

  const onSubmitHandler = (data: ProductForm) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div>
        <label>Name</label>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <div>
              <input {...field} />
            </div>
          )}
        />
        <p>{errors.name?.message}</p>
      </div>

      <div>
        <label>SKU</label>
        <Controller
          name="sku"
          control={control}
          rules={{ required: "SKU is required" }}
          render={({ field }) => (
            <div>
              <input {...field} />
            </div>
          )}
        />
        <p>{errors.sku?.message}</p>
      </div>

      <div>
        <label>Description</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <div>
              <textarea {...field} />
            </div>
          )}
        />
      </div>

      <div>
        <label>Price</label>
        <Controller
          name="price"
          control={control}
          rules={{ required: "Price is required" }}
          render={({ field }) => (
            <div>
              <input type="number" {...field} />
            </div>
          )}
        />
        <p>{errors.price?.message}</p>
      </div>

      <button
        type="submit"
        style={{ backgroundColor: `${colors.greenAccent[400]} ` }}
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
