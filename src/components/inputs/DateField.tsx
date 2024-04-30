/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, FormHelperText } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { DateFormat, IInputProps } from "../../models/IdentityForm";

dayjs.locale("ar-iq");

const DateFiled = (props: IInputProps) => {
  return (
    <Box>
      <DemoContainer components={["DatePicker"]}>
        <DemoItem>
          <DatePicker
            className="datePicker"
            label={props.label}
            name={props.name}
            value={dayjs(props.value)}
            onChange={props.onChange as any}
            format={DateFormat.default}
            minDate={dayjs("1900-01-01")}
            maxDate={dayjs(props?.maxDate || new Date())}
            sx={{ minWidth: "100% !important" }}
          />
        </DemoItem>
      </DemoContainer>

      {props.touched && Boolean(props.error) && (
        <FormHelperText component="div" sx={{ margin: "4px 14px 0" }}>
          <p className="errMsg">{props.error}</p>
        </FormHelperText>
      )}
    </Box>
  );
};

export default DateFiled;
