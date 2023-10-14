import { useTheme } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { tokens } from "../theme";

interface CategoryForm {
  name: string;
}

interface AddCategoryFormProps {
  onSubmit: (data: CategoryForm) => void;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ onSubmit }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryForm>();

  const onSubmitHandler = (data: CategoryForm) => {
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

      <button
        type="submit"
        style={{ backgroundColor: `${colors.greenAccent[400]} ` }}
      >
        Add Category
      </button>
    </form>
  );
};

export default AddCategoryForm;
