import React from 'react';
import { motion } from 'framer-motion';
import { Award, Medal, Trophy } from 'lucide-react';
import type { Achievement } from '../types';

interface AchievementsProps {
  achievements: Achievement[];
  onAchievementClick: (achievement: Achievement) => void;
}

export const Achievements: React.FC<AchievementsProps> = ({
  achievements,
  onAchievementClick,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {achievements.map((achievement) => (
        <motion.div
          key={achievement.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-4 rounded-lg cursor-pointer ${
            achievement.unlocked
              ? 'bg-green-50 border-2 border-green-500'
              : 'bg-gray-50 border-2 border-gray-200'
          }`}
          onClick={() => onAchievementClick(achievement)}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-full ${
                achievement.unlocked ? 'bg-green-100' : 'bg-gray-100'
              }`}
            >
              {achievement.icon === '🌱' && (
                <Award
                  className={`h-6 w-6 ${
                    achievement.unlocked ? 'text-green-500' : 'text-gray-400'
                  }`}
                />
              )}
              {achievement.icon === '🚲' && (
                <Medal
                  className={`h-6 w-6 ${
                    achievement.unlocked ? 'text-green-500' : 'text-gray-400'
                  }`}
                />
              )}
              {achievement.icon === '🌍' && (
                <Trophy
                  className={`h-6 w-6 ${
                    achievement.unlocked ? 'text-green-500' : 'text-gray-400'
                  }`}
                />
              )}
            </div>
            <div>
              <h3
                className={`font-semibold ${
                  achievement.unlocked ? 'text-green-700' : 'text-gray-500'
                }`}
              >
                {achievement.name}
              </h3>
              <p className="text-sm text-gray-500">{achievement.description}</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span
                    className={`text-xs font-semibold inline-block ${
                      achievement.unlocked ? 'text-green-600' : 'text-gray-500'
                    }`}
                  >
                    Progress
                  </span>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs font-semibold inline-block ${
                      achievement.unlocked ? 'text-green-600' : 'text-gray-500'
                    }`}
                  >
                    {achievement.unlocked ? '100%' : '0%'}
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: achievement.unlocked ? '100%' : '0%' }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500"
                ></div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};