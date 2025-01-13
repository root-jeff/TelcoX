import { Box } from "@mui/material";

interface BasePageProps {
  children?: React.ReactNode;
}

export const BasePage = ({ children }: BasePageProps) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        //bgcolor: "red",
      }}
    >
      {children}
    </Box>
  );
};
