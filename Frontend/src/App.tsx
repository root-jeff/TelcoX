import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./routers/AppRouter";
import { CssBaseline } from "@mui/material";
import { FullLoader } from "./global/utils";
import CustomMultipleSnackBar from "./global/utils/snack/CustomMultipleSnackBar";

export default function App() {
  return (
    <>
      <CssBaseline />
      <FullLoader />
      <CustomMultipleSnackBar />
      <RouterProvider
        // future={{
        //   v7_startTransition: false,
        // }}
        router={AppRouter()}
      />
    </>
  );
}
