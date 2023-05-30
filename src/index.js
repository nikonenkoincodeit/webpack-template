import icon from "./img/img.jpg";

import "./css/fonts.scss";
import "./css/style.css";
import "./css/styles.scss";

const img = new Image();
img.src = icon;

// document.body.append(img);

console.log(icon);

class User {
  constructor(name) {
    this.name = name;
  }
}

const user = new User("Poly");
