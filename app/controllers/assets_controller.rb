class AssetsController < ApplicationController
  def index
  	@people = Person.all
  end
end
