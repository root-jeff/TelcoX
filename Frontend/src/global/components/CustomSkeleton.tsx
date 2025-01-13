import { Box, Skeleton, SkeletonProps } from "@mui/material";

interface CustomSkeletonProps {
  cantidad?: number;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  variant?: "text" | "rectangular" | "circular";
  sx?: SkeletonProps["sx"];
}

export const CustomSkeleton = ({
  width = "100%",
  height = 30,
  variant = "rectangular",
  borderRadius = 2,
  cantidad,
  sx,
}: CustomSkeletonProps) => {

  const ComponentSkeleton = () => (
    <Skeleton
      width={width}
      animation="wave"
      height={height}
      variant={variant}
      sx={{
        borderRadius,
        ...sx,
      }}
    />
  );

  return (
    <>
      {!cantidad ? (
        <ComponentSkeleton />
      ) : (
        <Box display="flex" flexDirection="column" gap={2}>
          {Array.from({ length: cantidad }).map((_, index) => (
            <ComponentSkeleton key={index} />
          ))}
        </Box>
      )}
    </>
  );
};
