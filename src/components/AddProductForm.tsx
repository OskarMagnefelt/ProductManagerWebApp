import React from "react";
import { useTheme } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { tokens } from "../theme";
import { addProduct } from "../api/Products";
import { Product } from "../api/Interfaces";

interface AddProductFormProps {
  onSubmit: (data: Product) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onSubmit }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  const onSubmitHandler = async (data: Product) => {
    onSubmit(await addProduct(data));
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
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <div>
              <textarea {...field} />
            </div>
          )}
        />
        <p>{errors.description?.message}</p>
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

      <div>
        <label>Image URL</label>
        <Controller
          name="image"
          control={control}
          rules={{
            required: "Image URL is required",

            // Kanske lägger in senare

            // pattern: {
            //   value: /^https?:\/\/.*\.(jpe?g|png|gif|bmp|svg)$/i, // Example pattern for image URLs
            //   message: "Invalid image URL",
            // },
          }}
          render={({ field }) => (
            <div>
              <input type="text" {...field} />
            </div>
          )}
        />
        <p>{errors.image?.message}</p>
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
