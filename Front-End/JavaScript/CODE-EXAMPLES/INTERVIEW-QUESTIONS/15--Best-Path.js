
// class Cell {
//   constructor(row, col) {
//     this.row = row;
//     this.col = col;
//   }

//   hashkey() {
//     return `${ this.row }_${ this.col }`;
//   }

//   equals(other) {
//     return this.row === other.row && this.col === other.col;
//   }
// }

function buildGraph(area) {
	let graph = {};
  
  for (let row = 0, row_len = area.length; row < row_len; row++) {
  	for (let col = 0, col_len = area[row].length; col < col_len; col++) {
      const hash = `${ row }_${ col }`;
      if (graph.hasOwnProperty(hash) === false) {
      	graph[hash] = [];
      }
      
      if (row - 1 > -1) {
      	if(area[row - 1][col] !== 0) {
          graph[hash].push({ row: row - 1, col: col, value: area[row - 1][col]});
        }
      }
      if (col - 1 > -1) {
      	if(area[row][col - 1] !== 0) {
          graph[hash].push({ row: row, col: col - 1, value: area[row][col - 1]});
        }
      }
      if (row + 1 < area.length) {
        if (area[row + 1][col] !== 0) {
          graph[hash].push({ row: row + 1, col: col, value: area[row + 1][col]});
        }
      }
      if (col + 1 < area[row].length) {
        if (area[row][col + 1] !== 0) {
          graph[hash].push({ row: row, col: col + 1, value: area[row][col + 1]});
        }
      }

    }
  }
  
	return graph;
}

function isCellInVisited(adjacentCell, alreadyVisited) {
  let found = false;
  for (let cell of alreadyVisited) {
    if (cell.row === adjacentCell.row && cell.col === adjacentCell.col) {
      found = true;
    }
  }
  return found;
}

function findNextAccessible(currentCell, alreadyVisited, areaGraph) {
  const hash = `${ currentCell.row }_${ currentCell.col }`;
  for (let adjacentCell of areaGraph[hash]) {
    if (isCellInVisited(adjacentCell, alreadyVisited) === false) {
      return adjacentCell;
    }
  }
  return null;
}

function minimumDistance(area) {
  const areaGraph = buildGraph(area);

  let currentCell = { row: 0, col: 0 };
  let alreadyVisited = [currentCell];
  let path = [currentCell];

  while(area[currentCell.row][currentCell.col] !== 9) {
    currentCell = findNextAccessible(currentCell, alreadyVisited, areaGraph);
    if (currentCell === null) {
      currentCell = alreadyVisited[alreadyVisited.length - 2];
      path.pop();
    } else {
      alreadyVisited.push(currentCell);
      path.push(currentCell);
    }
  }

  return path.length - 1;
}

/* 1 1 0
   0 1 9
   0 1 1
*/
console.log(minimumDistance([[1,1,0],[0,1,9],[0,1,1]]), 5);
console.log(minimumDistance([[1,1,1,1],[0,1,0,1],[0,1,0,1],[0,1,1,0],[0,1,9,1]]), 6);