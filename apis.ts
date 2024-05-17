import express from "express";
import path from "path";
import cors from "cors";
import { historyController } from "./historyRouter";
import { authController } from "./authRouter";
import { profileController } from "./profileRouter";

const app = express();
app.use(express.json());
const publicPath = path.resolve(__dirname, "dist");
app.use(express.static(publicPath));
const PORT = process.env.PORT || 3000;
app.use(cors()); // This will enable all CORS requests
// Or for specific options:
app.use(
  cors({
    origin: "*", // Allow only this origin or use '*' to allow all origins
  })
);
app.use(authController);
app.use(historyController);
app.use(profileController);
app.get("/", (_req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`
  🚀 Server ready at: http://localhost:${PORT}
  `);
});
