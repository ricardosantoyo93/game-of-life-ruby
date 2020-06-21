import axios from 'axios';

// Interval instance
let interval = null;

/**
 * Takes an original grid, calculates each iteration of each cell, and then sends a message to the main thread to update the grid
 * @param {Array<Array<Boolean>>} grid Original grid
 */
export const calculateNewGrid = async (grid, token = '') => {
    let baseGrid = [...grid];
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;

    interval = setInterval(async () => {
        /* const res = await axios.post('/api/v1/grid', { grid: baseGrid });

        baseGrid = res.data; */

        baseGrid = getNewGrid(baseGrid);

        postMessage({ method: 'update-grid', grid: baseGrid });
    }, 100);
}

/**
 * Takes a grid and calculates each iteration of each cell
 * @param {Array<Array<Boolean>>} grid Original grid
 * @return {Array<Array<Boolean>>}
 */
const getNewGrid = (grid) => {
    const newGrid = arrayClone(grid);

    for(let row = 0; row < grid.length; row++) {
        for(let col = 0; col < grid[row].length; col ++) {

            let alive = getAliveNeighbourCells(grid, row, col);

            // Alive conditions
            if(grid[row][col] === true) {
                if(alive === 2 || alive === 3) {
                    newGrid[row][col] = true;
                } else {
                    newGrid[row][col] = false;
                }
            } else {
                // Dead conditions
                if(alive === 3) {
                    newGrid[row][col] = true;
                }
            }
        }
    }

    return newGrid;
}

/**
 * Given a position in a grid, checks the amount of living cells in its neighborhood
 * @param {Array<Array<Boolean>>} grid The original grid
 * @param {Integer} row Current row
 * @param {Integer} col Current column
 * @return {Integer} Amount of living cells
 */
const getAliveNeighbourCells = (grid, row, col) => {
    let alive = 0;

    for(let tmpRow = -1; tmpRow < 2; tmpRow++){
        for(let tmpCol = -1; tmpCol < 2; tmpCol++){
            // We skip the cell we are currently checking
            if(tmpRow !== 0 || tmpCol !== 0) {
                let opRow = row + tmpRow;
                let opCol = col + tmpCol;

                if (opRow === -1 ) {
                    opRow = grid.length - 1;
                } else if (opRow === grid.length) {
                    opRow = 0;
                }

                if (opCol === -1) {
                    opCol = grid[row].length - 1;
                } else if (opCol === grid[opRow].length) {
                    opCol = 0;
                }

                if (grid[opRow][opCol]) {
                    alive++;
                }
            }
        }
    }

    return alive;
}

/**
 * Creates a clone of an array of arrays
 * @param {Array<Array<Any>>} arr 
 * @return {Array<Array<Any>>}
 */
function arrayClone(arr) {
    if(Array.isArray(arr)){
        const copy = arr.slice(0);
        for(let i = 0; i < copy.length; i++ ) {
            copy[ i ] = arrayClone( copy[ i ] );
        }
        return copy;
    } else {
        return arr;
    }
}

/**
 * Clears the interval and stops the worker
 */
export const stopWorker = () => {
    clearInterval(interval);
    postMessage({ method: 'worker-stopped' });
}
