import './App.css';
import { useState, useMemo } from 'react'; // Import useState and useMemo

// Define the type for base player data
interface PlayerData {
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

// Mock data for the leaderboard (without rank)
const mockPlayersData: PlayerData[] = [
  { name: 'Player One', wins: 17, losses: 2, draws: 1, matchesPlayed: 20 },
  { name: 'Player Two', wins: 17, losses: 4, draws: 1, matchesPlayed: 22 },
  { name: 'Player Three', wins: 13, losses: 4, draws: 1, matchesPlayed: 18 },
  { name: 'Player Four', wins: 17, losses: 7, draws: 1, matchesPlayed: 25 },
  { name: 'Player Five', wins: 13, losses: 1, draws: 1, matchesPlayed: 15 },
  { name: 'Player Six', wins: 13, losses: 7, draws: 1, matchesPlayed: 21 },
  { name: 'Player Seven', wins: 13, losses: 5, draws: 1, matchesPlayed: 19 },
  { name: 'Player Eight', wins: 13, losses: 9, draws: 1, matchesPlayed: 23 },
  { name: 'Player Nine', wins: 12, losses: 4, draws: 1, matchesPlayed: 17 },
  { name: 'Player Ten', wins: 13, losses: 10, draws: 1, matchesPlayed: 24 },
];

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

function LeaderboardTable({ initialPlayers }: { initialPlayers: PlayerData[] }) {
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
        {rankedPlayers.map((player) => (
          <tr key={player.name}> {/* Use name as unique key */}
            <td>{player.rank}</td>
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
}

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Badminton Leaderboard</h1>
      </header>
      <main>
        <LeaderboardTable initialPlayers={mockPlayersData} />
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Badminton Club</p>
      </footer>
    </div>
  );
}

export default App;
