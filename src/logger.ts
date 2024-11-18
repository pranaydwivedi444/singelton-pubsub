import GameManager from "./store";
import gameManager from "./store"

function logger(){
    setInterval(() => {
      console.log(GameManager.getInstance().log());
    }, 3000);
}

export default logger;