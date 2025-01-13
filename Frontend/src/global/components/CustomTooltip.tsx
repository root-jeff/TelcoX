import { styled, Tooltip, TooltipProps } from "@mui/material";

interface CustomTooltipProps {
  children: TooltipProps["children"];
  text: string;
  placement?: TooltipProps["placement"];
}

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))`
  & .MuiTooltip-tooltip {
    background-color: rgba(0, 0, 0, 0.87);
    font-size: 12px;
  }
`;

export const CustomTooltip = ({
  text,
  children,
  placement = "top",
}: CustomTooltipProps) => {
  if (!text) return children;

  return (
    <StyledTooltip
      title={text}
      placement={placement}
      arrow
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -10],
              },
            },
          ],
        },
      }}
    >
      {children}
    </StyledTooltip>
  );
};
