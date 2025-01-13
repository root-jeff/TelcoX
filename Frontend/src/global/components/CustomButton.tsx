import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";
import { Button, ButtonProps, Icon } from "@mui/material";

export interface CustomButtonProps {
  LoadinButtonProps?: LoadingButtonProps;
  ButtonProps?: ButtonProps;
  isLoadingButtom?: boolean;
  loadingValue?: boolean;
  label?: string;
  size?: ButtonProps["size"];
  color?: ButtonProps["color"];
  sx?: ButtonProps["sx"];
  icon?: React.ReactNode;
  iconAlign?: "left" | "right";
  variant?: ButtonProps["variant"];
  disabled?: boolean;
  type?: ButtonProps["type"];
  onClick?: (() => void) | (() => Promise<void>);
}

export const CustomButton = ({
  ButtonProps,
  LoadinButtonProps,
  size = "small",
  label = "Buttons",
  isLoadingButtom,
  loadingValue,
  color = "primary",
  sx,
  icon,
  iconAlign = "left",
  variant = "contained",
  disabled = false,
  type,
  onClick,
}: CustomButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.();
  };

  const renderIcon = () => {
    if (typeof icon === "string") {
      return <Icon sx={{ fontSize: 18, fontWeight: "600" }}>{icon}</Icon>;
    }
    return icon; // Renderiza directamente si es un ReactNode
  };

  const iconProps = icon
    ? iconAlign === "right"
      ? {
          endIcon: renderIcon(),
        }
      : {
          startIcon: renderIcon(),
        }
    : {};

  const loadingPosition = iconAlign === "right" && icon ? "end" : "center";

  const buttonStyles = {
    borderRadius: 2,
    display: "inline-flex", // Asegura que ícono y texto estén en línea
    alignItems: "center",
    justifyContent: "center", // Centra el contenido horizontalmente

    gap: icon ? 1 : 0, // Espacio entre texto e ícono
    padding: "6px 12px",
    ...sx,
  };

  return (
    <>
      {isLoadingButtom ? (
        <LoadingButton
          {...LoadinButtonProps}
          sx={buttonStyles}
          size={size}
          onClick={handleClick}
          {...iconProps}
          loading={loadingValue}
          loadingPosition={loadingPosition}
          variant={variant}
          color={color}
          type={type}
          disabled={disabled}
        >
          {label}
        </LoadingButton>
      ) : (
        <Button
          {...ButtonProps}
          sx={buttonStyles}
          variant={variant}
          size={size}
          onClick={handleClick}
          color={color}
          type={type}
          disabled={disabled}
          {...iconProps}
        >
          {label}
        </Button>
      )}
    </>
  );
};
