export default class Cell {
    constructor(x, y) {
      this.x = x; // 单元格的 x 坐标
      this.y = y; // 单元格的 y 坐标
      this.isMine = false; // 单元格是否是地雷
      this.isRevealed = false; // 单元格是否已经被翻开
      this.isFlagged = false; // 单元格是否被标记为地雷
      this.adjacentMines = 0; // 单元格周围的地雷数目
    }
  
    // 翻开单元格
    reveal() {
      this.isRevealed = true;
    }
  
    // 标记单元格为地雷
    flag() {
      this.isFlagged = true;
    }
  
    // 取消标记单元格为地雷
    unflag() {
      this.isFlagged = false;
    }
  
    // 判断单元格是否是空白格
    isEmpty() {
      return this.adjacentMines === 0;
    }
  }
  