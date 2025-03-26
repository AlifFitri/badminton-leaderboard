import './App.css';
import LeaderboardTable, { PlayerData } from './components/LeaderboardTable'; // Import the new component and PlayerData type

// Mock data for the leaderboard (using the imported PlayerData type)
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
