import * as crypto from "crypto"

interface blockShape {
    hash: string;
    prevHash: string;
    height: number;
    data: string;
}

class Block implements blockShape {
    public hash: string;
    constructor(
        public prevHash:string,
        public height: number,
        public data: string
    ) {
        this.hash = Block.calculateHash(prevHash, height, data)
    }
    static calculateHash(prevHash:string, height:number, data:string){
        const toHash = `${prevHash}${height}${data}`
        return crypto.createHash("sha256").update(toHash).digest("hex")
    }
}

class Bloclchain {
    private blocks: Block[];
    constructor() {
        this.blocks = [];
    }
    private getPrevHash(){
        if(this.blocks.length === 0) return ""
        return this.blocks[this.blocks.length - 1].hash;
    }
    public addBlock(data:string){
        const block = new Block(this.getPrevHash(), this.blocks.length + 1, data)
        this.blocks.push(block)
    }
    public getBlocks(){
        this.blocks.forEach((value, index) => {
            if((index !== 0) && value.prevHash !== this.blocks[index - 1].hash){
                console.log(value)
                throw `Critical security error.`;
                return null;
            }
        });
        return [this.blocks]
    }
}

const blockchain = new Bloclchain()

const array = ["ㅓㅃㄱ", "아", "𝒇(x)′"].forEach((a)=>{
    blockchain.addBlock(a)
})

console.log(blockchain.getBlocks())