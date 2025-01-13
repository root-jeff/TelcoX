import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ICustomInputProps } from "../interfaces";

export const CustomInput = ({
  label,
  hidden = false,
  TextFieldProps,
  id,
  name,
  margin,
  type,
  flex = 1,
  value,
  maxLength,
  width = "100%",
  multiline = false,
  required = false,
  disabled = false,
  password = false,
  onBlur = () => {},
  error = false,
  readOnly,
  helperText = "",
  sxBox,
  currencySymbol,
  onChange = () => {},
}: ICustomInputProps) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <>
      <Box
        minHeight="50px"
        flex={flex}
        width={width}
        flexDirection={"column"}
        padding={1}
        display={hidden ? "none" : "flex"}
        sx={{
          //maxWidth: 400,
          ...sxBox,
          opacity: disabled ? 0.5 : 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          label={label}
          hidden={hidden}
          {...TextFieldProps}
          required={required}
          id={id || name}
          name={name}
          margin={margin}
          type={password ? (showPass ? "text" : "password") : type}
          size="small"
          value={value}
          variant="outlined"
          fullWidth
          onChange={onChange}
          onBlur={onBlur}
          error={!readOnly && error}
          disabled={disabled}
          helperText={!readOnly && helperText}
          slotProps={{
            input: {
              readOnly,
              startAdornment:
                type === "moneda" && currencySymbol ? (
                  <InputAdornment position="start">
                    {currencySymbol}
                  </InputAdornment>
                ) : undefined,
              style: {
                borderRadius: 8,
                height: multiline ? "" : 40,
                width: "100%",
              },
              endAdornment: password && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Presione para ver la contraseña"
                    onClick={() => setShowPass((prev) => !prev)}
                    edge="end"
                  />
                  {showPass ? <VisibilityOff /> : <Visibility />}
                </InputAdornment>
              ),

              inputProps: {
                maxLength: maxLength,
                step: type === "number" ? "0.01" : undefined,
              },
            },
          }}
          multiline={multiline}
          minRows={multiline ? 2 : 1}
        />
      </Box>
    </>
  );
};
