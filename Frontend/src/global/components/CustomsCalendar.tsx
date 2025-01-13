import React from "react";
import { Box, BoxProps } from "@mui/material";
import {
  LocalizationProvider,
  DateTimePicker,
  DatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Necesario para manejar UTC
import timezone from "dayjs/plugin/timezone"; // Necesario para manejar zonas horarias

dayjs.extend(utc); // Habilitar el plugin UTC
dayjs.extend(timezone); // Habilitar el plugin de zona horaria
interface IProps {
  width?: BoxProps["width"];
  flex?: string | number;
  type: "Date" | "DateTime";
  name?: string;
  value?: string | dayjs.Dayjs;
  label: React.ReactNode;
  disabled?: boolean;
  required?: boolean;

  getDate?: (isoDate: string) => void;
}

export const CustomCalendar = ({
  getDate,
  flex,
  type = "Date",
  label,
  name,
  disabled,
  required,
  value,
  width,
}: IProps) => {
  const [selectedDate, setSelectedDate] = React.useState<dayjs.Dayjs | null>(
    typeof value === "string" && value !== ""
      ? dayjs.tz(value, dayjs.tz.guess())
      : value instanceof dayjs
      ? value.tz(dayjs.tz.guess())
      : null
  );

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    setSelectedDate(newValue);
    const isoDate = newValue?.toISOString();
    getDate?.(isoDate);
  };

  return (
    <Box
      flex={flex}
      minHeight="50px"
      display={"flex"}
      width={width || "100%"}
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        ////maxWidth: 100,
        mx: "auto",
        p: 1,
        // "@media (max-width: 600px)": {
        //   maxWidth: "90%",
        // },
        "@media (max-width: 600px)": {
          //maxWidth: "100%",
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {type === "Date" ? (
          <DatePicker
            disabled={disabled}
            label={label}
            format="DD/MM/YYYY"
            value={selectedDate}
            onChange={(newDate) => handleDateChange(newDate)}
            name={name}
            slotProps={{
              textField: {
                size: "small",
                required: required,
                disabled: disabled,
                fullWidth: true,
              },
            }}
          />
        ) : (
          <DateTimePicker
            label={label}
            disabled={disabled}
            minutesStep={30}
            ampm={true}
            name={name}
            value={selectedDate}
            format="DD/MM/YYYY HH:mm"
            onChange={handleDateChange}
            disablePast
            slotProps={{
              textField: {
                size: "small",
                required: required,
                disabled: disabled,
                fullWidth: true,
              },
            }}
          />
        )}
      </LocalizationProvider>
    </Box>
  );
};
