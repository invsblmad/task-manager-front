import ReactDOM from "react-dom/client";
import { AppRouter } from "@app/Routes/AppRouter";
import { RouterProvider } from "react-router-dom";
import "@app/Style/Index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={AppRouter} />);
