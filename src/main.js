import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}
import "bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';