// 生成指定大小的游戏网格
export class grid {


  generateGrid(rows, cols, numMines) {
    // 创建一个二维数组来表示游戏网格
    const grid = new Array(rows).fill(null).map(() => new Array(cols).fill(null));

    // 在网格中随机分配地雷
    let minesPlaced = 0;
    while (minesPlaced < numMines) {
      const row = getRandomInt(rows);
      const col = getRandomInt(cols);
      if (grid[row][col] !== "mine") {
        grid[row][col] = "mine";
        minesPlaced++;
      }
    }

    // 计算数字
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (grid[row][col] !== "mine") {
          let count = 0;
          for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
              if (r >= 0 && r < rows && c >= 0 && c < cols && grid[r][c] === "mine") {
                count++;
              }
            }
          }
          grid[row][col] = count;
        }
      }
    }

    return grid;
  }

  const ROWS = 10;
  const COLS = 10;
  const MINES = 10;

function createGrid(rows, cols) {
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  for (let i = 0; i < rows; i++) {
    const tr = document.createElement('tr');

    for (let j = 0; j < cols; j++) {
      const td = document.createElement('td');
      td.classList.add('cell');
      td.dataset.row = i;
      td.dataset.col = j;
      td.addEventListener('click', handleCellClick);
      td.addEventListener('contextmenu', handleCellRightClick);
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  table.appendChild(tbody);
  return table;
}

function handleCellClick(event) {
  const cell = event.target;
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);

  // TODO: Implement cell click logic
}

function handleCellRightClick(event) {
  event.preventDefault();
  const cell = event.target;
  cell.classList.toggle('flag');
}

const grid = createGrid(ROWS, COLS);
document.body.appendChild(grid);


// 生成随机整数
getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
}