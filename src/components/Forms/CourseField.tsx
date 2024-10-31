import { useCourseQuery } from "@/redux/api/courseApi";
import { useCourseCategoryQuery } from "@/redux/api/courseCategory.api";
import { Autocomplete, TextField } from "@mui/material";

export type CourseCategoryFieldProps = {
  label: string;
  name: string;
  onChange: (value: string | null) => void;
  defaultValue:any // Specify the type of onChange to accept a string or null
};
type CourseCategory = {
    id: string;
    courseName: string;
  };
const CourseField = ({ label, name, onChange,defaultValue }: CourseCategoryFieldProps) => {
  const query = {};
  const { data: courseCategories } = useCourseQuery({ ...query });
  

  return (
    <Autocomplete
      options={courseCategories?.data || []}
      defaultValue={defaultValue}
      getOptionLabel={(option:CourseCategory) => option.courseName || ""}
      onChange={(event, value) => {
        onChange(value ? value.id : null); // Pass the selected category ID to the parent
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
        //   defaultValue={defaultValue}
          variant="outlined"
        />
      )}
    />
  );
};

export default CourseField;
