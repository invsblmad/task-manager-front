import ReactDOM from "react-dom/client";
import { AppRouter } from "@app/Routes/AppRouter";
import "@app/Style/Index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppRouter />);
