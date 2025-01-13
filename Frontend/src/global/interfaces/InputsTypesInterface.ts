import { BoxProps, TextFieldProps } from "@mui/material";

export type TFieldInputInterface =
  | TextFieldProps["type"]
  | "SoloNumeros"
  | "decimales"
  | "moneda";

export interface ICustomInputProps {
  label?: string;
  icon?: string;
  iconAlign?: "start" | "end";
  TextFieldProps?: TextFieldProps;
  id?: string;
  name?: string;
  margin?: TextFieldProps["margin"];
  value?: any;
  width?: string;
  hidden?: boolean;
  password?: boolean;
  disabled?: boolean;
  flex?: number;
  required?: boolean;
  maxLength?: number;
  readOnly?: boolean;
  onChange?: TextFieldProps["onChange"];
  onBlur?: TextFieldProps["onBlur"];
  error?: TextFieldProps["error"];
  helperText?: TextFieldProps["helperText"];
  multiline?: TextFieldProps["multiline"];
  sxBox?: BoxProps["sx"];
  currencySymbol?: string;
  customRegexp?: RegExp;
  type?: TFieldInputInterface;
}
