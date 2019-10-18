export class Cell {
    constructor() {
        this.isMine = false;
        this.neighbours = 0;
        this.checked = false;
        this.flagged = false;
    }
    check() {
        this.checked = true;
    }
    toggleFlag() {
        this.flagged = !this.flagged;
    }
}