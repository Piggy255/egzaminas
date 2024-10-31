import express from "express";
import cors from "cors";
import events from "./routes/events.js";
import approvedEvents from "./routes/ApprovedEvents.js"
import categories from "./routes/categories.js"
import users from "./routes/users.js"

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/events", events);
app.use("/approvedEvents", approvedEvents)
app.use("/categories", categories)
app.use("/users", users)

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});