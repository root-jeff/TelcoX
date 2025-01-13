import { AlertProps } from "@mui/material";

export type Severity = "error" | "warning" | "info" | "success";
export type SnackbarPosition = "top" | "bottom";
export type SnackbarHorizontal = "left" | "center" | "right";

export interface SnackbarProps {
  id?: string;
  open: boolean;
  message?: string;
  autoHideDuration?: number;
  typeAlert?: AlertProps["variant"];
  onClose?: () => void;
  severity?: Severity;
  title?: string;
  vertical?: SnackbarPosition;
  horizontal?: SnackbarHorizontal;
  progress?: number;
  showProgress?: boolean;
  customStyle?: React.CSSProperties;
  customContent?: React.ReactElement<unknown, any> | React.ReactNode;
  action?: React.ReactNode;
  enableQueue?: boolean;
  maxSnacks?: number;
  isAutoHide?: boolean;
  style?: React.CSSProperties;
}
