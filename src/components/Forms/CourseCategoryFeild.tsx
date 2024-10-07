import { useCourseCategoryQuery } from "@/redux/api/courseCategory.api";
import { Autocomplete, TextField } from "@mui/material";

export type CourseCategoryFieldProps = {
  label: string;
  name: string;
  onChange: (value: string | null) => void;  // Specify the type of onChange to accept a string or null
};
type CourseCategory = {
    id: string;
    categoryName: string;
  };
const CourseCategoryField = ({ label, name, onChange }: CourseCategoryFieldProps) => {
  const query = {};
  const { data: courseCategories } = useCourseCategoryQuery({ ...query });

  return (
    <Autocomplete
      options={courseCategories || []}
      getOptionLabel={(option:CourseCategory) => option.categoryName || ""}
      onChange={(event, value) => {
        onChange(value ? value.id : null); // Pass the selected category ID to the parent
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};

export default CourseCategoryField;
