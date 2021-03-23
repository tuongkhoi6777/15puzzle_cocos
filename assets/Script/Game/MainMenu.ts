
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onLoad () {
        this.node.parent.getChildByName("InGame").active = false;
        this.node.parent.getChildByName("PauseMenu").active = false;

        this.node.getChildByName("Play Game Button").on("click", this.startGame, this);
    }

    startGame () {
        this.node.active = false;
        this.node.parent.getChildByName("InGame").active = true;
    }

    // update (dt) {}
}
