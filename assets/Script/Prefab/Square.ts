
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    Value: number = 0;
    Index: number = 0;

    Init (value: number, index: number) {      
        this.Index = index;
        this.Value = value;
        
        this.node.getChildByName("NumberLabel").getComponent(cc.Label).string = value.toString();
        this.node.getChildByName("BorderTop").setContentSize(cc.size(this.node.getContentSize().width, 2));
        this.node.getChildByName("BorderBottom").setContentSize(cc.size(this.node.getContentSize().width, 2));
        this.node.getChildByName("BorderLeft").setContentSize(cc.size(2, this.node.getContentSize().height));
        this.node.getChildByName("BorderRight").setContentSize(cc.size(2, this.node.getContentSize().height));
    }

    //onLoad () {}

    //start () {}

    update (dt) {
        if (this.Value - this.Index === 1) {
            this.node.color = cc.color(0,255,155,255);
            this.node.getChildByName("NumberLabel").color = cc.color(0,155,0,255);
        } else {
            this.node.color = cc.color(0,255,255,255);
            this.node.getChildByName("NumberLabel").color = cc.color(0,0,255,255);
        }
    }
}
