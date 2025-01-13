import {
  CircularProgress,
  Icon,
  IconButton,
  IconButtonProps,
} from "@mui/material";
import { CustomTooltip } from "./CustomTooltip";

interface CustomIconButtonProps {
  color?: string;
  tooltip?: string;
  loading?: boolean;
  disabled?: boolean;
  iconColor?: string;
  hoverColor?: string;
  icon: React.ReactNode;
  sx?: IconButtonProps["sx"];
  width?: string | number;
  size?: "small" | "medium" | "large";
  onClick?: (e: React.MouseEvent) => void;
}

export const CustomIconButton = ({
  sx,
  icon,
  onClick,
  loading,
  width = 35,
  tooltip = "",
  size = "small",
  disabled = false,
  iconColor = "white",
  color = "primary.main",
  hoverColor = "grey.600",
}: CustomIconButtonProps) => {
  return (
    <CustomTooltip text={tooltip}>
      <span style={{ display: "inline-flex" }}>
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
          size={size}
          disabled={disabled || loading}
          sx={{
            width,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: disabled || loading ? "gray:700" : color,
            transition: "0.3s",
            padding: 1,
            "&:hover": {
              backgroundColor: hoverColor,
              transform: loading ? "none" : "scale(0.85)",
            },
            borderRadius: 2,
            ...sx,
          }}
        >
          {loading ? (
            <CircularProgress size={20} sx={{ color: "grey.600" }} />
          ) : (
            <Icon
              fontSize="small"
              sx={{
                color: disabled || loading ? "grey.500" : iconColor,
              }}
            >
              {icon}
            </Icon>
          )}
        </IconButton>
      </span>
    </CustomTooltip>
  );
};
