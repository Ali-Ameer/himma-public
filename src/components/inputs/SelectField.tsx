/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";
import { IInputProps } from "../../models/IdentityForm";

export default function SelectField(props: IInputProps) {
  return (
    <FormControl fullWidth size="small" className="selectInput">
      <InputLabel id={props?.name || props?.id}>{props.label}</InputLabel>
      <Select
        key={props.name || props?.id}
        label={props.label}
        labelId={props.name || props?.id}
        id={props?.id}
        name={props.name}
        value={props?.value}
        onChange={props.onChange as any}
        onBlur={props?.onBlur}
        disabled={props?.disabled}
        error={props.touched ? Boolean(props.error) : false}
      >
        {props?.children}
      </Select>
      {props.touched && Boolean(props.error) && (
        <FormHelperText>
          <p className="errMsg">{props.error}</p>
        </FormHelperText>
      )}
    </FormControl>
  );
}
