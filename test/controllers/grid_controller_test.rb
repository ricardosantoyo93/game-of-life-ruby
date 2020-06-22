require 'test_helper'

class GridControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_grid_index
    assert_response :success
  end

end
