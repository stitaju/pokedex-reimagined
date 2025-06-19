import React, { useState, useMemo } from 'react';
import { Search, Filter, Zap, Target, Shield } from 'lucide-react';
import { getTypeColor } from '../utils/colors';
import type { Pokemon } from '../types/pokemon';

interface MovesListProps {
  moves: Pokemon['moves'];
}

const MovesList: React.FC<MovesListProps> = ({ moves }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string>('all');

  const learnMethods = useMemo(() => {
    const methods = new Set<string>();
    moves.forEach(({ version_group_details }) => {
      version_group_details.forEach(detail => {
        methods.add(detail.move_learn_method.name);
      });
    });
    return Array.from(methods);
  }, [moves]);

  const filteredMoves = useMemo(() => {
    return moves.filter(({ move, version_group_details }) => {
      const matchesSearch = move.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMethod = selectedMethod === 'all' || 
        version_group_details.some(detail => detail.move_learn_method.name === selectedMethod);
      
      return matchesSearch && matchesMethod;
    });
  }, [moves, searchTerm, selectedMethod]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Moves</h2>
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search moves..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        
        <select
          value={selectedMethod}
          onChange={(e) => setSelectedMethod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
        >
          <option value="all">All Methods</option>
          {learnMethods.map(method => (
            <option key={method} value={method}>
              {method.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      {/* Moves Grid */}
      <div className="grid gap-4 max-h-96 overflow-y-auto">
        {filteredMoves.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No moves found matching your criteria.
          </div>
        ) : (
          filteredMoves.map(({ move, version_group_details }) => {
            const latestDetail = version_group_details[version_group_details.length - 1];
            const levelLearned = latestDetail.level_learned_at;
            const learnMethod = latestDetail.move_learn_method.name;
            
            return (
              <div
                key={move.name}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 capitalize">
                      {move.name.replace('-', ' ')}
                    </h4>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                      <span className="capitalize">
                        {learnMethod.replace('-', ' ')}
                      </span>
                      {levelLearned > 0 && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          Level {levelLearned}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      <div className="mt-4 text-sm text-gray-500 text-center">
        Showing {filteredMoves.length} of {moves.length} moves
      </div>
    </div>
  );
};

export default MovesList;