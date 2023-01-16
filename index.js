const express = require("express");
const PORT = 3000;

const app = express();

app.use("/", express.static("public"));
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/branches.html");
});
app.listen(PORT, () => {
	console.log("App is running on port:", PORT);
});
