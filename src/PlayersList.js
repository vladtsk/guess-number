import Button from "./Button";

export default function PlayersList({ players, onSetLeader, leader, winners }) {
  return (
    <ul>
      {players.map((player) => (
        <Player
          player={player}
          key={player.id}
          onSetLeader={onSetLeader}
          leader={leader}
          winners={winners}
        />
      ))}
    </ul>
  );
}

function Player({ player, onSetLeader, leader, winners }) {
  let result = "";
  if (winners.includes(player.name)) result = "You win 🏆";
  else result = "You lose 💔";

  return (
    <li>
      <img src={player.avatar} alt={player.name} />
      <h3>{player.name}</h3>
      <p>Score: {player.score}</p>
      {winners.length === 0 ? (
        <Button onClick={() => onSetLeader(player)}>
          {leader && leader.id === player.id ? "Leader" : "Choose as leader"}
        </Button>
      ) : (
        <p className={`result ${result === "You win 🏆" ? "win" : "lose"}`}>
          {result}
        </p>
      )}
    </li>
  );
}
