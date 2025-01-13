import { Box, BoxProps, Icon, Typography } from "@mui/material";

export interface CustomTextButtonProps {
  label?: string;
  icon?: string | React.ReactNode;
  iconAlign?: "left" | "right";
  color?: string;
  disabled?: boolean;
  underline?: boolean;
  width?: BoxProps["width"];
  onClick?: () => void;
}

export const CustomTextButton = ({
  label = "Link Text",
  icon,
  iconAlign = "left",
  color = "primary",
  disabled = false,
  underline = true,
  width,
  onClick,
}: CustomTextButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <Box
      width={width || "100%"}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        color: disabled ? "grey.500" : color,
        textDecoration: underline ? "underline" : "none",
        pointerEvents: disabled ? "none" : "auto",
      }}
      onClick={handleClick}
    >
      {icon && iconAlign === "left" && (
        <Icon
          sx={{
            display: "flex",
            marginRight: 0.7,
            fontSize: 18,
            fontWeight: "600",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </Icon>
      )}
      <Typography
        variant="subtitle2"
        fontWeight={500}
        sx={{
          textTransform: "none",
          color: "inherit",
          textAlign: "center",
        }}
      >
        {label}
      </Typography>
      {icon && iconAlign === "right" && (
        <Icon sx={{ marginLeft: 0.7, fontSize: 18, fontWeight: "600" }}>
          {icon}
        </Icon>
      )}
    </Box>
  );
};
