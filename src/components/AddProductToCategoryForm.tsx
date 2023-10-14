import { useTheme } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { tokens } from "../theme";

interface ProductToCategoryForm {
  skuOfProduct: string;
  nameOfCategory: string;
}

interface AddProductToCategoryProps {
  onSubmit: (data: ProductToCategoryForm) => void;
}

const AddProductToCategoryForm: React.FC<AddProductToCategoryProps> = ({
  onSubmit,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductToCategoryForm>();

  const onSubmitHandler = (data: ProductToCategoryForm) => {
    onSubmit(data);
    // console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div>
        <label>Product SKU</label>
        <Controller
          name="skuOfProduct"
          control={control}
          rules={{ required: "SKU is required" }}
          render={({ field }) => (
            <div>
              <input {...field} />
            </div>
          )}
        />
        <p>{errors.skuOfProduct?.message}</p>
      </div>

      <div>
        <label>Name of category</label>
        <Controller
          name="nameOfCategory"
          control={control}
          rules={{ required: "SKU is required" }}
          render={({ field }) => (
            <div>
              <input {...field} />
            </div>
          )}
        />
        <p>{errors.nameOfCategory?.message}</p>
      </div>

      <button
        type="submit"
        style={{ backgroundColor: `${colors.greenAccent[400]} ` }}
      >
        Add Product To Category
      </button>
    </form>
  );
};

export default AddProductToCategoryForm;
