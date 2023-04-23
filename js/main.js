import { generateGrid } from './grid.js';
import { revealCell } from './cell.js';

const rows = 10;
const cols = 10;
const numMines = 10;

const grid = generateGrid(rows, cols, numMines);

const container = document.querySelector('.grid-container');
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-row', row);
    cell.setAttribute('data-col', col);
    cell.textContent = grid[row][col];
    container.appendChild(cell);
  }
}

const cell = document.querySelector('.cell');
cell.addEventListener('contextmenu', function (event) {
  event.preventDefault(); // 阻止默认的上下文菜单行为

  // 切换单元格的 'flagged' 类
  cell.classList.toggle('flagged');

  // 添加或删除红旗图标元素
  if (cell.classList.contains('flagged')) {
    const flagElement = document.createElement('div');
    flagElement.classList.add('flag');
    cell.appendChild(flagElement);
  } else {
    const flagElement = cell.querySelector('.flag');
    if (flagElement) {
      cell.removeChild(flagElement);
    }
  }
});
