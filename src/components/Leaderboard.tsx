import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal } from 'lucide-react';
import type { LeaderboardEntry } from '../types';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Top Eco Warriors</h2>
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {index === 0 && (
                  <Trophy className="h-6 w-6 text-yellow-500" />
                )}
                {index === 1 && (
                  <Medal className="h-6 w-6 text-gray-400" />
                )}
                {index === 2 && (
                  <Medal className="h-6 w-6 text-amber-600" />
                )}
                {index > 2 && (
                  <span className="text-gray-500 font-semibold">
                    #{index + 1}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {entry.name}
                </p>
                <p className="text-sm text-gray-500">
                  {entry.ecoMiles.toLocaleString()} eco miles
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Rank #{entry.rank}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};