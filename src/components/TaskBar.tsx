import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Star, TrendingUp } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface TaskBarProps {
  user: {
    name: string;
    avatar?: string;
    level: number;
    experience: number;
    nextLevelExp: number;
    achievements: number;
    rank: number;
  };
  onTabChange: (tab: string) => void;
}

export const TaskBar: React.FC<TaskBarProps> = ({ user, onTabChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-lg rounded-lg p-4 mb-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white font-bold">
            {user.avatar || user.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{user.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>Level {user.level}</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTabChange('achievements')}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
          >
            <Award className="h-5 w-5" />
            <span>{user.achievements} Achievements</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTabChange('leaderboard')}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
          >
            <Trophy className="h-5 w-5" />
            <span>Rank #{user.rank}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTabChange('rewards')}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
          >
            <TrendingUp className="h-5 w-5" />
            <span>Rewards</span>
          </motion.button>
        </div>
      </div>

      <div className="mt-4">
        <ProgressBar
          current={user.experience}
          total={user.nextLevelExp}
          label={`Level Progress (${user.experience}/${user.nextLevelExp} XP)`}
          color="green"
        />
      </div>
    </motion.div>
  );
};