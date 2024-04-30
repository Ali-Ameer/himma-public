import { TextField as MuiInput } from "@mui/material";
import { IInputProps } from "../../models/IdentityForm";

const TextField = (props: IInputProps) => {
  return (
    <>
      <MuiInput
        label={props.label}
        id={props?.id}
        name={props.name}
        value={props?.value}
        onChange={props.onChange}
        onBlur={props?.onBlur}
        disabled={props?.disabled}
        error={props.touched ? Boolean(props.error) : false}
        helperText={
          props.touched && Boolean(props.error) ? (
            <p className="errMsg">{props.error}</p>
          ) : null
        }
        // helperText={props.error ? props.helperText : null}
        size={"small"}
        type={props.type ? props.type : "text"}
        fullWidth
      />
    </>
  );
};

export default TextField;
