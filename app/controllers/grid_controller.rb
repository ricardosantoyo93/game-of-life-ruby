class GridController < ApplicationController
    def index
        person = {name: 'Rob', city: 'San Francisco'}
        respond_with person
    end

    def show
        respond_to do |format|
            format.html
            format.json { render :json => "Success" }
        end
    end

    private
    def grid_params
        params.require(:get).permit(:grid)
    end
end
