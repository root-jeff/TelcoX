import React, { useState, ChangeEvent, useEffect } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Autocomplete, {
  AutocompleteProps,
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, BoxProps, FormControl, Tooltip } from "@mui/material";

interface CustomAutocompleteProps<T>
  extends Omit<
    AutocompleteProps<T, false, false, false>,
    "renderInput" | "onChange" | "defaultValue"
  > {
  label?: string;
  onChange?: (value: T | null) => void;
  options: T[]; // Hacer 'options' obligatorio aquí
  isLoading?: boolean;
  flex?: number;
  keyOfDefaultValue?: keyof T;
  id?: string;
  name?: string;
  defaultValue?: string | number | null;
  required?: boolean;
  width?: string;
  hidden?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: TextFieldProps["helperText"];
  maxWidth?: BoxProps["maxWidth"];
  sxBox?: BoxProps["sx"];
  renderOption?: AutocompleteProps<T, false, false, false>["renderOption"];
}

export const CustomAutocomplete = <T,>({
  label = "",
  onChange,
  options,
  isLoading,
  getOptionLabel,
  flex = 1,
  error,
  id = "",
  name = "",
  helperText = "",
  width = "100%",
  defaultValue,
  hidden,
  disabled,
  maxWidth,
  required,
  sxBox,
  keyOfDefaultValue,
  ...props
}: CustomAutocompleteProps<T>) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState<T | null>(null);

  const handleInputChange = (_event: ChangeEvent<{}>, value: string) => {
    setInputValue(value);
  };

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    value: T | null,
    _reason: AutocompleteChangeReason,
    _details?: AutocompleteChangeDetails<T> | undefined
  ) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  useEffect(() => {
    if (defaultValue !== null && options && keyOfDefaultValue) {
      const matchedOpt = options.find((option) => {
        const optionValue = option[keyOfDefaultValue as keyof T];
        return (
          optionValue && optionValue.toString() === defaultValue?.toString()
        );
      });
      if (matchedOpt) {
        setSelectedValue(matchedOpt);
      }
    } else if (defaultValue === null) {
      setSelectedValue(null);
    }
  }, [defaultValue, options, keyOfDefaultValue]);

  return (
    <Box
      flex={flex}
      width={width}
      height={"fit-content"}
      flexDirection={"column"}
      padding={1}
      display={hidden ? "none" : "flex"}
      maxWidth={maxWidth}
      sx={{
        opacity: disabled ? 0.7 : 1,
        ...sxBox,
      }}
    >
      <FormControl error={error} sx={{ minWidth: 120 }} size="small" fullWidth>
        <Autocomplete
          {...props}
          fullWidth
          id={id}
          disabled={disabled}
          size="small"
          options={options}
          loading={isLoading}
          value={selectedValue}
          getOptionLabel={getOptionLabel}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onChange={handleChange}
          renderOption={(props, option) => {
            const { key, ...otherProps } = props;
            const optionLabel = getOptionLabel(option);

            return (
              <Tooltip
                key={`${key}-${Math.random().toString()}`}
                title={optionLabel.length > 22 ? optionLabel : ""}
              >
                <li {...otherProps}>{optionLabel}</li>
              </Tooltip>
            );
          }}
          defaultValue={selectedValue}
          isOptionEqualToValue={(o, v) => o === v}
          renderInput={(params) => (
            <Tooltip title={selectedValue ? getOptionLabel(selectedValue) : ""}>
              <span>
                <TextField
                  required={required}
                  label={label}
                  {...params}
                  error={error}
                  name={name}
                  helperText={helperText}
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          {isLoading && (
                            <CircularProgress color="inherit" size={20} />
                          )}
                          {params.InputProps.endAdornment}
                        </InputAdornment>
                      ),
                      style: { borderRadius: 8, height: 40 },
                    },
                  }}
                />
              </span>
            </Tooltip>
          )}
        />
      </FormControl>
    </Box>
  );
};
