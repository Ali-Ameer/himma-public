import { Box, FormHelperText } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";
import { DateFormat } from "../../models/IdentityForm";

// dayjs.extend(customParseFormat);

const DateFiled = ({ ...props }) => {
  return (
    <Box>
      <DemoContainer components={["DatePicker"]}>
        <DemoItem>
          <DatePicker
            className="datePicker"
            {...props}
            label={props.label}
            onChange={(value) =>
              props.onChange(dayjs(value, DateFormat.default)?.toISOString())
            }
            value={dayjs(props.value)}
            format={DateFormat.default}
            minDate={dayjs("1900-01-01")}
            maxDate={dayjs(props?.maxDate || new Date())}
            sx={{
              minWidth: "100% !important",
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
        </DemoItem>
      </DemoContainer>

      {props.error && (
        <FormHelperText component="div" sx={{ margin: "4px 14px 0" }}>
          <p className="errMsg">{props.helperText}</p>
        </FormHelperText>
      )}
    </Box>
  );
};

export default DateFiled;
