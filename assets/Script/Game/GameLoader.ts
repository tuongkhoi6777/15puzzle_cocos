
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    Square: cc.Prefab = null;
    @property(cc.Node)
    PauseMenu: cc.Node = null;
    @property(cc.Node)
    MainMenu: cc.Node = null;

    ValueList: number[] = [];
    Rows: number = 4;
    Columns: number = 4;
    Timer: number = 0;
    isPaused: boolean = false;

    onLoad () {
        this.PauseMenu.active = false;
        this.PauseMenu.getChildByName("Continue Button").
        on("click", () => this.ContinueGame(this.CheckGameEnd()));

        this.node.parent.getChildByName("Pause Button").on("click", () => this.PauseGame());
        this.node.parent.getChildByName("Reset Button").on("click", () => this.ResetGame());
        this.node.parent.getChildByName("Back To Menu Button").on("click", () => this.BackToMenu());
    }

    onEnable () {
        this.ResetGame();
    }

    start () {
        this.ResetGame();
    }

    SetValueList(rows:number, columns: number) {
        this.ValueList = [];

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                const value = i * columns + j;
                if(value !== 0) {
                    this.ValueList.push(value);
                }
            }
        }
    } 

    Init (rows:number, columns: number) {
        const layout = this.node.getComponent(cc.Layout);
        layout.cellSize = cc.size((this.node.width - layout.paddingLeft)/columns - layout.spacingX,
        (this.node.height - layout.paddingTop)/rows - layout.spacingY);

        this.CreateChildren();
    }

    CreateChildren () {
        this.node.removeAllChildren();

        this.ValueList.forEach((value, index) => {
            if (value !== 0) {
                let newSquare = cc.instantiate(this.Square);
                newSquare.width = this.node.getComponent(cc.Layout).cellSize.width;
                newSquare.height = this.node.getComponent(cc.Layout).cellSize.height;
                newSquare.getComponent('Square').Init(value, index);
                newSquare.on('touchstart', () => this.Onclick(index));
                this.node.addChild(newSquare);
            } else {
                let node = new cc.Node('Blank');
                this.node.addChild(node);
            }
        });
    }

    Shuffle (array: number[]) {
        let currentIndex = 0;

        while (currentIndex < array.length) {
            const randomIndex = Math.floor(Math.random() * (array.length - currentIndex) + currentIndex);
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            currentIndex++;
        }

        let inversion = 0;

        for (let i = 0; i < array.length - 1; i++) {
            let count = 0;
            for (let j = i + 1; j < array.length; j++) {
                if(array[i] > array[j]) {
                    count++;
                }
            }
            console.log(count);
            inversion += count;
        }
        console.log(inversion);
        if (inversion % 2 !== 0) {
            [array[0],array[1]] = [array[1],array[0]];
        }
    }

    Onclick (index: number) {
        let blankIndex = this.ValueList.findIndex((value) => {
            return value === 0;
        });

        if ((Math.floor(index / this.Columns) === Math.floor(blankIndex / this.Columns) 
            && Math.abs(index - blankIndex) === 1) 
            || Math.abs(index - blankIndex) === this.Columns) {
                [this.ValueList[index], this.ValueList[blankIndex]] =
                [this.ValueList[blankIndex], this.ValueList[index]];
    
                this.CreateChildren();
        }
    }

    CheckGameEnd () {
        let isAllCorrect = true;

        this.ValueList.forEach((value, index) => {
            if(value - index !== 1 && value !== 0) {
                isAllCorrect = false;
            }
        });

        return isAllCorrect;
    }

    BackToMenu () {
        this.PauseMenu.active = false;
        this.node.parent.active = false;
        this.MainMenu.active = true;
    }

    PauseGame () {
        this.PauseMenu.active = true;
        this.isPaused = true;
    }

    ResetGame () {
        this.SetValueList(this.Rows, this.Columns);
        this.Shuffle(this.ValueList);
        this.ValueList.push(0);
        this.Init(this.Rows, this.Columns);
        this.Timer = 0;
    }

    ContinueGame (isGameEnd: boolean) {
        this.PauseMenu.active = false;
        this.isPaused = false;

        if(isGameEnd) {
            this.ResetGame();
        }
    }

    GetTime () {
        const seconds = Math.floor(this.Timer) % 60;
        const minutes = Math.floor(this.Timer / 60);
        let time = "";

        if(minutes < 10) {
            time += "0" + minutes + " : ";
        } else {
            time += minutes + " : ";
        }

        if(seconds < 10) {
            time += "0" + seconds;
        } else {
            time += seconds;
        }

        return { time, seconds, minutes }
    }

    update (dt) {
        if(!this.isPaused) {
            this.Timer += dt;
        }

        this.node.parent.getChildByName("TimerLabel").getComponent(cc.Label).string = this.GetTime().time;

        if (this.CheckGameEnd()) {
            this.PauseMenu.active = true;
            this.isPaused = true

            this.PauseMenu.getChildByName("PauseMenuLabel").getComponent(cc.Label).string
            = "Good jobs, you complete the puzzle in " + this.GetTime().minutes + " minutes and " 
            + this.GetTime().seconds + " seconds!!! \n Do you want to play again???";
        }
    }
}
