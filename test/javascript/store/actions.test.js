import GridActions from '../../../app/javascript/components/grid/actions';
import gridTypes from '../../../app/javascript/components/grid/action-types';
import CoreActions from '../../../app/javascript/components/actions';
import coreTypes from '../../../app/javascript/components/action-types';

describe('Actions', () => {
    describe('Core Actions', () => {
        test('should toggle run', () => {
            const expectedAction = {
                type: coreTypes.CORE_TOGGLE_RUN
            }
            expect(CoreActions.toggleRun()).toEqual(expectedAction);
        });
    })

    describe('Grid Actions', () => {
        test('should set a new grid', () => {
            const grid = [[true]];
            const expectedAction = {
                type: gridTypes.GRID_SET_ALIVE_ARRAY,
                payload: grid
            }
            expect(GridActions.setNewGrid(grid)).toEqual(expectedAction);
        });

        test('should toggle a cell', () => {
            const cell = {
                row: 0,
                col: 0
            };
            const expectedAction = {
                type: gridTypes.GRID_TOGGLE_ALIVE_CELL,
                payload: cell
            }

            expect(GridActions.toggleCell(cell.row, cell.col)).toEqual(expectedAction);
        });
    })
});
