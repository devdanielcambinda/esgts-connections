const app = require("./server");
const port = 5000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
