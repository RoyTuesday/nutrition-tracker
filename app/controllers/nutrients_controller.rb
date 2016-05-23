class NutrientsController < ApplicationController
  def totals
  end

  private

  def date_range
    if params[:start_date].length > 0
      start_date = params[:start_date].to_date
      if params[:end_date].length > 0
        end_date = params[:end_date].to_date
        return start_date..end_date
      else
        return start_date..start_date
      end
    else
      return Date.new(0)..Date.today
    end
  end
end
