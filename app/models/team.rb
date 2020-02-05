class Team < ApplicationRecord
    def self.search(search)
      return Team.all unless search
      Team.where(['content LIKE ?', "%#{search}%"])
    end
end
