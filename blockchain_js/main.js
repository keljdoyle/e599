const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = '') {
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();

        // The nonce, in this case, is used for Proof of Work.
        this.nonce = 0; 
    }

    calculateHash() {
        return SHA256(
            this.previousHash + 
            this.timestamp + 
            JSON.stringify(this.data) + 
            this.nonce
        ).toString();
    }

    mineBlock(difficulty) {
        // Proof of work, used to build-in complexity to slow down the process of mining blocks.
        // Proof of work is an unnecessary expense in Blockchain for Business.
        // It is used mostly for cryptocurrencies,
        if (difficulty > 0) {
            while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
                this.nonce++;
                this.hash = this.calculateHash();
            }
        } else {
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createFirstBlock()];

        // This setting can be used to control how long it takes a new block to be mined.
        this.difficulty = 2; 
    }

    createFirstBlock() {
        return new Block(0, "01/01/2018", "First block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // In reality, there would need to be checks in place before adding a block.
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        // Don't check the genesis block.
        for (let i=1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }

            return true;
        }
    }
}

let myChain = new Blockchain();

console.log('Mining block 1...');
myChain.addBlock(new Block(1, "2018-01-01", { amount: 40}));

console.log('Mining block 2...');
myChain.addBlock(new Block(2, "2018-02-01", { amount: 80}));
console.log('Is chain valid? ' + myChain.isChainValid());
