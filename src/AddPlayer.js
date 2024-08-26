import { useState } from "react";

export default function AddPlayer({ onAddPlayer, players }) {
  const [playerName, setPlayerName] = useState("");
  const [avatar, setAvatar] = useState("male1");

  let avatarUrl;
  switch (avatar) {
    case "male1":
      avatarUrl = "https://api.dicebear.com/9.x/adventurer/svg?seed=Abby";
      break;

    case "male2":
      avatarUrl = "https://api.dicebear.com/9.x/adventurer/svg?seed=Harley";
      break;

    case "female1":
      avatarUrl = "https://api.dicebear.com/9.x/adventurer/svg?seed=Cookie";
      break;

    default:
      avatarUrl = "https://api.dicebear.com/9.x/adventurer/svg?seed=Bella";
  }

  const player = {
    id: players.length + 1,
    name: playerName,
    avatar: avatarUrl,
    score: 0,
  };

  return (
    <form
      className="form-add-player"
      onSubmit={(e) => {
        e.preventDefault();
        playerName !== "" && onAddPlayer(player);
        setPlayerName("");
        setAvatar("male1");
      }}
    >
      <h3>Add player</h3>

      <label>Name</label>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />

      <label>Avatar</label>
      <select value={avatar} onChange={(e) => setAvatar(e.target.value)}>
        <option value="male1">Male 1</option>
        <option value="male2">Male 2</option>
        <option value="female1">Female 1</option>
        <option value="female2">Female 2</option>
      </select>

      <button className="button">Add</button>
    </form>
  );
}
