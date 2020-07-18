import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}
import "bootstrap";
// import '../node_modules/one-page-scroll/one-page-scroll.js';
import onePageScroll from '../node_modules/one-page-scroll/one-page-scroll.esm';
import app from './scripts/onePageScroll.js';
// console.log(app);
// import 'bootstrap/dist/css/bootstrap.min.css';