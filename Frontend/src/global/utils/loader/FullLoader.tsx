import * as React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import Lottie from "lottie-react";
import loaderAnimation from "./animations/UploadFileLottie.json";
import { Loader } from "./Loader";
import { LoaderType } from "./LoaderInterface";

export const FullLoader = () => {
  const [active, setActive] = React.useState(false);
  const [type, setType] = React.useState<LoaderType>("default");

  React.useEffect(() => {
    const handleLoaderChange = (loaderType: LoaderType) => {
      setActive(Loader.isActive());
      setType(loaderType);
    };

    Loader.subscribe(handleLoaderChange);

    return () => {
      Loader.unsubscribe(handleLoaderChange);
    };
  }, []);

  const renderLoader = () => {
    switch (type) {
      case "default":
        return <CircularProgress color="inherit" />;
      case "UpFile":
        return (
          <Lottie
            animationData={loaderAnimation}
            loop={true}
            style={{ height: "200px", width: "200px" }}
          />
        );
      // case "Refresh":
      //   return (
      //     <Lottie
      //       animationData={refreshAnimation}
      //       loop={true}
      //       style={{ height: "200px", width: "200px" }}
      //     />
      //   );
      default:
        return <CircularProgress color="inherit" />;
    }
  };

  return (
    <Backdrop
      open={active}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {renderLoader()}
    </Backdrop>
  );
};
