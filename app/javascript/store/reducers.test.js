import GridReducer from '../components/grid/reducer';
import gridTypes from '../components/grid/action-types';
import CoreReducer from '../components/reducer';
import coreTypes from '../components/action-types';

describe('Reducers', () => {
    describe('Core Reducers', () => {
        test('should return initial state', () => {
            expect(CoreReducer(undefined, {})).toEqual({})
        });

        test('should toggle run', () => {
            expect(CoreReducer({ run: false }, { type: coreTypes.CORE_TOGGLE_RUN })).toEqual({ run: true })
        });
    });

    describe('Grid Reducers', () => {
        test('should return initial state', () => {
            expect(GridReducer(undefined, {})).toEqual({})
        });

        test('should toggle alive cell', () => {
            const grid = [[true]];
            const cell = {
                row: 0,
                col: 0
            }
            expect(GridReducer(grid, { payload: cell, type: gridTypes.GRID_TOGGLE_ALIVE_CELL })).toEqual([[false]]);
        });

        test('should set a new grid', () => {
            const grid = [[true]];
            expect(GridReducer(undefined, { payload: grid, type: gridTypes.GRID_SET_ALIVE_ARRAY })).toEqual(grid);
        });
    });
});
