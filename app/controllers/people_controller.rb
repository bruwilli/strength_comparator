class PeopleController < ApplicationController
  def index
    render json: Person.all
  end

  def show
    render json: Person.find(params[:id])
  end

  def create
  	person = Person.new(params.require(:person).permit(:first_name, :last_name, strength_indices: []))
  	person.save!
  	render json: person
  end

  def update
    person = Person.find(params[:id])
    person.update!(params.require(:person).permit(:first_name, :last_name, strength_indices:[]))
    render json: person
  end

  def destroy
  	person = Person.find(params[:id])
  	head :not_found && return unless person
  	person.destroy
  	head :ok
  end

end