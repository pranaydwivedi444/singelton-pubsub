import logger from "./logger";
import { PubSubManager } from "./pubSubManager";
import GameManager from "./store";
import gameManager from "./store";

console.log("Starting");
function generateRandomName(n = 4) {
  let name = "";
  for (let i = 0; i < n; i++) {
    name = name + `${String.fromCharCode(Math.random() * (122 - 97 + 1) + 97)}`;
  }
  console.log(name);
  return name;
}
setInterval(() => {
  let newName = generateRandomName();
  let newName2 = generateRandomName();
  GameManager.getInstance().addGame(
    Math.random().toString(),
    newName,
    newName2
  );

      PubSubManager.getInstance().userSubscribe(
        Math.random().toString(),
        "APPL"
      );

}, 4000);
logger();
