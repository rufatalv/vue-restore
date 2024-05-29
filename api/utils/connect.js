import { connect } from "mongoose";

function connectAndRun(app, port) {
  connect(process.env.MONGO_URI).then(() => {
    console.log("db ok");
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} 

export default connectAndRun;
