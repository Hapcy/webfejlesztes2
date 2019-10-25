import { Cell } from "./cell.js";

export class Field {
    constructor(dimension, mineCount) {
        this.dimension = dimension;
        this.mineCount = mineCount;
        this.gameOver = false;
        if (dimension * dimension >= mineCount) {
            this.makeTable();
            this.placeMines();
        }
    }

    check(x, y) {
        if (this.gameOver) {
            return;
        }
        this.table[x][y].check();
        if (this.table[x][y].isMine) {
            this.gameOver = true;
        } else if (this.table[x][y].neighbours === 0) {
            // TODO: felfedni a szomszédos mezőket, amíg aknákig nem jutunk
        }
    }

    placeFlag(x, y) {
        this.table[x][y].toggleFlag();
        // TODO: minden aknák flageltünk-e?
    }

    makeTable() {
        this.table = [];
        for (let i = 0; i < this.dimension; ++i) {
            const row = [];
            for (let j = 0; j < this.dimension; ++j) {
                row.push(new Cell());
            }
            this.table.push(row);
        }
    }

    placeMines() {
        for (let i = 0; i < this.mineCount; ++i) {
            let placed = false;
            do {
                const x = Math.floor(
                    Math.random() * this.dimension);
                const y = Math.floor(
                    Math.random() * this.dimension);
                const actualCell = this.table[x][y];
                if (!actualCell.isMine) {
                    actualCell.isMine = true;
                    this.increaseNeighbours(x, y);
                    placed = true;
                }
            } while (!placed);
        }
    }

    increaseNeighbours(x, y) {
        for (let i = x - 1; i <= x + 1; ++i) {
            for (let j = y - 1; j <= y + 1; ++j) {
                if (i >= 0 && i < this.dimension
                    && j >= 0 && j < this.dimension) {
                    this.table[i][j].neighbours += 1;
                } 
            }
        }
    }

    save() {
        const state = JSON.stringify(this);
        localStorage.setItem('aknakereso', state);
    }

    load() {
        const stateString = localStorage.getItem('aknakereso');
        if (stateString) {
            const state = JSON.parse(stateString);
            this.dimension = state.dimension;
            this.mineCount = state.mineCount;
            this.gameOver = state.gameOver;
            this.table = [];
            for (let i = 0; i < this.dimension; ++i) {
                this.table.push([]);
                for (let j = 0; j < this.dimension; ++j) {
                    const cell = new Cell();
                    cell.isMine = state.table[i][j].isMine;
                    cell.neighbours = state.table[i][j].neighbours;
                    cell.checked = state.table[i][j].checked;
                    cell.flagged = state.table[i][j].flagged;
                    this.table[i][j] = cell;
                }
            }
        }
    }

}
