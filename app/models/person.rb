class Person < ActiveRecord::Base
	serialize :strength_indices
	validates :first_name, presence: true
	validates :last_name, presence: true
	validates :strength_indices, presence: true

	StrengthList = [ "Achiever", "Activator", "Adaptability", "Analytical", "Arranger", 
		               "Belief", "Command", "Communication", "Competition", "Connectedness",
		               "Consistency", "Context", "Deliberative", "Developer", "Discipline",
		               "Empathy", "Focus", "Futuristic", "Harmony", "Ideation", "Includer",
		               "Individualization", "Input", "Intellection", "Learner", "Maximizer",
		               "Positivity", "Relator", "Responsibility", "Restorative", 
		               "Self-Assurance", "Significance", "Strategic", "Woo"]
end
