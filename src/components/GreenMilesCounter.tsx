import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

interface GreenMilesCounterProps {
  miles: number;
  carbonSaved: number;
}

export const GreenMilesCounter: React.FC<GreenMilesCounterProps> = ({
  miles,
  carbonSaved,
}) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-green-100 rounded-full">
            <Leaf className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Green Miles</h3>
            <p className="text-sm text-gray-500">Your eco-friendly journey</p>
          </div>
        </div>
        <motion.div
          className="text-3xl font-bold text-green-600"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          {miles.toLocaleString()}
        </motion.div>
      </div>
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Carbon Saved</span>
          <span className="text-sm font-medium text-green-600">
            {carbonSaved.toLocaleString()} kg CO₂
          </span>
        </div>
      </div>
    </motion.div>
  );
};