// src/components/LeaderboardTable.tsx
import React, { useState, useMemo } from 'react'; // Import useState and useMemo
import { FaMedal } from 'react-icons/fa'; // Import the medal icon
import './LeaderboardTable.css'; // Import the component-specific styles

// Define the type for base player data
export interface PlayerData { // Exporting for potential use elsewhere, though App.tsx keeps its own copy for now
  name: string;
  wins: number;
  losses: number;
  draws: number;
  matchesPlayed: number;
}

// Extended type including calculated fields
interface Player extends PlayerData {
  rank: number;
  winPercentage: number;
}

// Define type for sort configuration
type SortKey = keyof Player | 'winPercentage'; // Include winPercentage
type SortDirection = 'asc' | 'desc';

interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

// Helper function to calculate win percentage
const calculateWinPercentage = (wins: number, matchesPlayed: number): number => {
  return matchesPlayed > 0 ? Math.round((wins / matchesPlayed) * 100) : 0;
};

// Component to display rank with medal icons for top 3
function RankDisplay({ rank }: { rank: number }) {
  // Render FaMedal icon with specific class for color based on rank
  if (rank === 1) {
    return <span className="rank-cell"><FaMedal className="medal-icon medal-gold" /> {rank}</span>;
  }
  if (rank === 2) {
    return <span className="rank-cell"><FaMedal className="medal-icon medal-silver" /> {rank}</span>;
  }
  if (rank === 3) {
    return <span className="rank-cell"><FaMedal className="medal-icon medal-bronze" /> {rank}</span>;
  }
  // Return just the rank number for others
  return <span className="rank-cell">{rank}</span>;
}

// Define props interface for LeaderboardTable
interface LeaderboardTableProps {
  initialPlayers: PlayerData[];
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ initialPlayers }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'winPercentage', direction: 'desc' }); // Default sort

  const rankedPlayers = useMemo(() => {
    // Calculate win percentage and add it to player data
    const playersWithCalculatedData = initialPlayers.map(player => ({
      ...player,
      winPercentage: calculateWinPercentage(player.wins, player.matchesPlayed),
    }));

    // Sort players based on current sort configuration
    const sorted = [...playersWithCalculatedData].sort((a, b) => {
      // Handle potential undefined values if sorting by a key not present on both
      const aValue = a[sortConfig.key as keyof typeof a] ?? 0;
      const bValue = b[sortConfig.key as keyof typeof b] ?? 0;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        // String comparison for name
        return sortConfig.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        // Numeric comparison
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0; // Should not happen with current data types
    });

    // Re-assign ranks based on sorted order
    return sorted.map((player, index) => ({
      ...player,
      rank: index + 1,
    }));
  }, [initialPlayers, sortConfig]);


  // Function to handle header clicks for sorting
  const requestSort = (key: SortKey) => {
    let direction: SortDirection = 'desc'; // Default desc for numeric columns
    if (key === 'name' || key === 'losses' || key === 'draws') {
        direction = 'asc'; // Default asc for name, losses, draws
    }

    // If clicking the same key, toggle direction; otherwise, set new key and default direction
    if (sortConfig.key === key) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }
    setSortConfig({ key, direction });
  };

  // Helper to get sort indicator class
  const getSortIndicatorClass = (key: SortKey) => {
    if (sortConfig.key !== key) return '';
    return sortConfig.direction === 'asc' ? ' sort-asc' : ' sort-desc';
  };


  return (
    <table>
      <thead>
        <tr>
          {/* Table header row */}
          <th className={`sortable${getSortIndicatorClass('rank')}`} onClick={() => requestSort('rank')}>Rank</th>
          <th className={`sortable${getSortIndicatorClass('name')}`} onClick={() => requestSort('name')}>Name</th>
          <th className={`sortable${getSortIndicatorClass('wins')}`} onClick={() => requestSort('wins')}>Wins</th>
          <th className={`sortable${getSortIndicatorClass('losses')}`} onClick={() => requestSort('losses')}>Losses</th>
          <th className={`sortable${getSortIndicatorClass('draws')}`} onClick={() => requestSort('draws')}>Draws</th>
          <th className={`sortable${getSortIndicatorClass('matchesPlayed')}`} onClick={() => requestSort('matchesPlayed')}>Played</th>
          <th className={`sortable${getSortIndicatorClass('winPercentage')}`} onClick={() => requestSort('winPercentage')}>Win %</th>
        </tr>
      </thead>
      <tbody>
        {/* Map through ranked players to create table rows */}
        {rankedPlayers.map((player) => (
          <tr key={player.name}> {/* Use name as unique key */}
            <td><RankDisplay rank={player.rank} /></td> {/* Use RankDisplay component */}
            <td>{player.name}</td>
            <td>{player.wins}</td>
            <td>{player.losses}</td>
            <td>{player.draws}</td>
            <td>{player.matchesPlayed}</td>
            <td>{player.winPercentage}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaderboardTable;
