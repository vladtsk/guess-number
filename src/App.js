import PlayersList from "./PlayersList";
import Button from "./Button";
import Playzone from "./Playzone";
import { useState } from "react";
import AddPlayer from "./AddPlayer";

function App() {
  /*const players = [
    {
      id: 1,
      name: "John",
      avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Abby",
      score: 20,
    },
    {
      id: 2,
      name: "Emma",
      avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Cookie",
      score: 15,
    },
    {
      id: 3,
      name: "Elly",
      avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Bella",
      score: 5,
    },
  ];*/

  const [leader, setLeader] = useState(null);
  const [winners, setWinners] = useState([]);
  const [players, setPlayers] = useState([]);
  const [addFormOpen, setAddFormOpen] = useState(false);

  function onSetLeader(player) {
    setLeader(player);
  }

  function handleAddPlayer(player) {
    setPlayers((players) => [...players, player]);
  }

  function handleAddFormOpen() {
    setAddFormOpen((cur) => !cur);
  }

  const regularPlayers = players.filter((player) => player.id !== leader?.id);

  return (
    <div className="app">
      <div className="sidebar">
        <h2>🎲Players</h2>
        <PlayersList
          players={players}
          onSetLeader={onSetLeader}
          leader={leader}
          winners={winners}
        />
        <Button onClick={handleAddFormOpen}>Add player</Button>

        {!leader && addFormOpen && (
          <AddPlayer onAddPlayer={handleAddPlayer} players={players} />
        )}
      </div>

      {leader && (
        <div className="playzone">
          <Playzone
            regularPlayers={regularPlayers}
            leader={leader}
            winners={winners}
            setWinners={setWinners}
          />
        </div>
      )}
    </div>
  );
}

export default App;
