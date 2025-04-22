import React from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Users } from 'lucide-react';
import type { Achievement, UserStats, LeaderboardEntry } from '../types';
import { Achievements } from './Achievements';
import { Leaderboard } from './Leaderboard';
import { GreenMilesCounter } from './GreenMilesCounter';
import { ProgressBar } from './ProgressBar';

interface RewardsPanelProps {
  userStats: UserStats;
  leaderboard: LeaderboardEntry[];
}

export const RewardsPanel: React.FC<RewardsPanelProps> = ({
  userStats,
  leaderboard,
}) => {
  const [activeTab, setActiveTab] = React.useState<'achievements' | 'leaderboard' | 'stats'>('achievements');

  const handleAchievementClick = (achievement: Achievement) => {
    console.log('Achievement clicked:', achievement);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <GreenMilesCounter
          miles={userStats.ecoMiles}
          carbonSaved={userStats.carbonSaved}
        />
      </div>

      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'achievements'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Award className="h-5 w-5" />
            <span>Achievements</span>
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'leaderboard'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <TrendingUp className="h-5 w-5" />
            <span>Leaderboard</span>
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'stats'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Users className="h-5 w-5" />
            <span>Stats</span>
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'achievements' && (
          <Achievements
            achievements={userStats.achievements}
            onAchievementClick={handleAchievementClick}
          />
        )}

        {activeTab === 'leaderboard' && (
          <Leaderboard entries={leaderboard} />
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Progress</h3>
                <div className="space-y-4">
                  <ProgressBar
                    current={userStats.ecoMiles}
                    total={1000}
                    label="Next Milestone"
                    color="green"
                  />
                  <ProgressBar
                    current={userStats.achievements.filter(a => a.unlocked).length}
                    total={userStats.achievements.length}
                    label="Achievements"
                    color="blue"
                  />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Impact</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Total Distance: {userStats.totalMiles.toLocaleString()} miles
                  </p>
                  <p className="text-sm text-gray-600">
                    Eco Miles: {userStats.ecoMiles.toLocaleString()} miles
                  </p>
                  <p className="text-sm text-gray-600">
                    Carbon Saved: {userStats.carbonSaved.toLocaleString()} kg CO₂
                  </p>
                  <p className="text-sm text-gray-600">
                    Global Rank: #{userStats.rank.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
