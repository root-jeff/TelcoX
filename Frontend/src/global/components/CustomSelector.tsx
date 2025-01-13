import {
  Box,
  MenuItem,
  OutlinedInput,
  Select,
  Theme,
  Chip,
  useTheme,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  InputAdornment,
  CircularProgress,
  BoxProps,
  FormHelperText,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

interface Props<T> {
  name?: string;
  catalog: T[];
  keyProperty: keyof T;
  keyIDProperty: keyof T;
  label?: string;
  icon?: string;
  width?: string;
  hidden?: boolean;
  password?: boolean;
  disabled?: boolean;
  flex?: number;
  readOnly?: boolean;
  required?: boolean;
  loading?: boolean;
  maxWidth?: BoxProps["maxWidth"];
  sxBox?: BoxProps["sx"];
  error?: boolean;
  helperText?: React.ReactNode;
}

interface IMultiple<T> extends Props<T> {
  type: "multiple";
  defaultIdSelect?: number[] | string[];
  getResult: (res: T[]) => void;
}
interface ISingle<T> extends Props<T> {
  type: "single";
  defaultIdSelect?: number | string;
  getResult: (res: T) => void;
}

type IProps<T> = IMultiple<T> | ISingle<T>;

export const CustomSelector = <T,>({
  name,
  catalog,
  label = "",
  type = "single",
  getResult,
  hidden,
  flex = 1,
  keyProperty,
  width = "100%",
  required,
  disabled,
  sxBox,
  loading,
  maxWidth,
  defaultIdSelect,
  keyIDProperty,
  error,
  readOnly = false,
  helperText,
}: IProps<T>) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const theme = useTheme();

  const items = useMemo(
    () =>
      catalog && catalog.length > 0
        ? catalog.map((item) => ({
            key: item[keyIDProperty].toString(),
            value: item[keyProperty].toString(),
          }))
        : [],
    [catalog, keyIDProperty, keyProperty]
  );

  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (items.length > 0) {
      if (
        type === "multiple" &&
        defaultIdSelect &&
        Array.isArray(defaultIdSelect)
      ) {
        const defaultSelected = items
          .filter(
            (i) =>
              defaultIdSelect.map(String).includes(i.key) ||
              defaultIdSelect.map(String).includes(i.value)
          )
          .map((i) => i.value);

        defaultSelected.length > 0 && setSelected(defaultSelected);
      } else if (
        type === "single" &&
        defaultIdSelect &&
        !Array.isArray(defaultIdSelect)
      ) {
        const defaultSelected = items.find(
          (i) =>
            i.key === defaultIdSelect.toString() ||
            i.value === defaultIdSelect.toString()
        );

        defaultSelected && setSelected([defaultSelected.value]);
      }
    }
  }, [defaultIdSelect, type, items]);

  // Actualiza el resultado cuando el valor seleccionado cambia
  useEffect(() => {
    if (selected.length) {
      handleResult(selected);
    }
  }, [selected, type]);

  // Maneja el resultado según el tipo de selección
  const handleResult = (selectedValues: string[]) => {
    const result = catalog.filter((item) =>
      selectedValues.includes(item[keyProperty].toString())
    );
    getResult(type === "single" ? (result[0] as T[] & T) : (result as T[] & T));
  };

  // Cuando el usuario selecciona una opción
  const handleChange = ({ target: { value } }: SelectChangeEvent<string[]>) =>
    setSelected(typeof value === "string" ? [value] : value);

  // Estilos de los elementos seleccionados
  const getStyles = (
    name: string,
    personName: readonly string[],
    theme: Theme
  ) => {
    return {
      fontWeight: personName.includes(name)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
    };
  };

  // Mapeo de items del catálogo

  return (
    <Box
      minHeight="50px"
      flex={flex}
      width={width}
      flexDirection={"column"}
      padding={1}
      display={hidden ? "none" : "flex"}
      maxWidth={maxWidth}
      sx={{
        opacity: disabled ? 0.5 : 1,
        justifyContent: "center",
        alignItems: "center",
        ...sxBox,
      }}
    >
      <FormControl
        required={required}
        sx={{ minWidth: 120 }}
        size="small"
        fullWidth
        error={error}
      >
        <InputLabel
          id={name || `${label}-select`}
          sx={{
            color: "grey.700",
            fontWeight: "400",
            fontVariant: "historical-forms",
          }}
        >
          {label}
        </InputLabel>
        <Select
        size="small"
          name={name}
          readOnly={readOnly}
          labelId={`${label}-label`}
          id={name || `${label}-select`}
          value={selected.length > 0 ? selected : ""}
          variant="outlined"
          label={label}
          multiple={type === "multiple"}
          required={required}
          onChange={handleChange}
          input={
            <OutlinedInput
              sx={{ color: "black" }}
              label={label}
              endAdornment={
                loading && (
                  <InputAdornment position="end">
                    <CircularProgress size={20} />
                  </InputAdornment>
                )
              }
            />
          }
          slotProps={{
            input: {
              height: 40,
            },
          }}
          renderValue={(selected) =>
            type === "multiple" ? (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            ) : (
              selected
            )
          }
          MenuProps={MenuProps}
        >
          {/* <MenuItem value="">
            <em>Deseleccionar</em>
          </MenuItem> */}
          {items.map(({ key, value }) => (
            <MenuItem
              key={key}
              value={value}
              style={getStyles(value, selected, theme)}
            >
              {value}
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
};
