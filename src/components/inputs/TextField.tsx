import { TextField as MuiInput } from "@mui/material";
import { useField } from "formik";

const TextField = ({ ...props }) => {
  const [field, meta] = useField(props.name);

  return (
    <>
      <MuiInput
        {...field}
        {...props}
        label={props.label}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error ? meta.error : ""}
        size={props.size || "small"}
        sx={{
          "& label": {
            left: "unset",
            right: "1.75rem",
            transformOrigin: "right",
            fontSize: "0.8rem",
          },
          "& legend": {
            textAlign: "right",
            fontSize: "0.6rem",
          },
          "& .MuiFormHelperText-root.Mui-error": {
            textAlign: "right",
          },
        }}
      />
    </>
  );
};

export default TextField;
