import { FormHelperText, TextField as MuiInput } from "@mui/material";

const TextField = ({ ...props }) => {
  return (
    <>
      <MuiInput
        {...props}
        label={props.label}
        error={Boolean(props.error)}
        onTouchEnd={props?.touched}
        helperText={props.error ? props.helperText : null}
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
      {props.touched && props.error && (
        <FormHelperText className="px-0 pt-1">
          <p className="errMsg">{props.error}</p>
        </FormHelperText>
      )}
    </>
  );
};

export default TextField;
