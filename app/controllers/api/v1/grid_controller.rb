require 'json'

module Api
    module V1
        class GridController < ApplicationController
            def create
                if !params[:grid] then 
                    return render json: { error: "Please provide a grid"}
                end

                grid = params[:grid]
                newGrid = caculateNewGrid(grid)

                render json: newGrid
            end

            def index 
                if !params[:grid] then 
                    return render json: { error: "Please provide a grid"}
                end

                grid = params[:grid]
                newGrid = caculateNewGrid(grid)

                render json: newGrid
            end

            def caculateNewGrid (grid)
                newGrid = grid.map(&:dup)

                for row in 0..grid.length() - 1
                    for col in 0..grid[row].length() - 1
                        alive = getAliveNeighbourCells(grid, row, col)

                        if grid[row][col] == true then
                            if alive == 2 or alive == 3 then
                                newGrid[row][col] = true
                            else
                                newGrid[row][col] = false
                            end
                        else
                            if alive === 3 then 
                                newGrid[row][col] = true
                            end
                        end
                    end
                end

                newGrid
            end

            def getAliveNeighbourCells (grid, row, col)
                alive = 0

                for tmpRow in -1..1
                    for tmpCol in -1..1
                        unless tmpRow == 0 and tmpCol == 0
                            if defined?(grid[row + tmpRow]) and defined?(grid[row + tmpRow][col + tmpCol]) then
                                if grid[row + tmpRow][col + tmpCol] then
                                    alive+= 1
                                end
                            end
                        end
                    end
                end

                alive
            end
        end
    end
end
