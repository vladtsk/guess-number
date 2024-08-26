import { useState } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

export default function Playzone({
  regularPlayers,
  leader,
  winners,
  setWinners,
}) {
  const [leaderSelection, setLeaderSelection] = useState({
    id: leader.id,
    number: "",
    confirmed: false,
  });

  const [playerSelections, setPlayerSelections] = useState(
    regularPlayers.map((regPlayer) => ({
      id: regPlayer.id,
      number: "",
      confirmed: true,
    }))
  );

  function handleLeaderSelection(e) {
    e.preventDefault();

    console.log("regularIndexes[0]", regularIndexes[0]);

    if (leaderSelection.number !== "") {
      setLeaderSelection((leaderSelection) => ({
        ...leaderSelection,
        confirmed: true,
      }));
      setPlayerSelections((arr) =>
        arr.map((playerSelec) =>
          playerSelec.id === regularIndexes[0]
            ? { ...playerSelec, confirmed: false }
            : playerSelec
        )
      );
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      leaderSelection.number !== "" &&
      playerSelections.every((el) => el.number !== "")
    ) {
      playerSelections.forEach((select) => {
        if (select.number === leaderSelection.number)
          setWinners((winners) => [...winners, select.id]);
      });

      /*
        if (player1Selection.number === leaderSelection.number)
          setWinners((winners) => [...winners, regularPlayers[0].name]);
  
        if (player2Selection.number === leaderSelection.number)
          setWinners((winners) => [...winners, regularPlayers[1].name]);
  */
      if (
        leaderSelection.number !== "" &&
        playerSelections.every((el) => el.number !== leaderSelection.number)
      )
        setWinners((winners) => [...winners, leader.id]);

      setLeaderSelection({ ...leaderSelection, confirmed: false });
      setPlayerSelections((arr) =>
        arr.map((playerSelec) => ({ ...playerSelec, confirmed: false }))
      );
    }
  }

  const regularIndexes = regularPlayers.map((regPlayer) => regPlayer.id);
  console.log("regularIndexes", regularIndexes);

  return (
    <div>
      <form className="userChoiceForm">
        <h2>Players, make your choices</h2>
        <label>{leader.name}, pick a number between 1 and 10</label>
        {leaderSelection.confirmed ? (
          <p className="icon">
            <FontAwesomeIcon icon={faLock} />
          </p>
        ) : (
          <input
            type="number"
            min={1}
            max={10}
            value={leaderSelection.number}
            onChange={(e) => {
              winners.length === 0 &&
                setLeaderSelection((selection) => ({
                  ...selection,
                  number: filterNumber(selection, e),
                }));
            }}
          />
        )}
        {winners.length === 0 ? (
          leaderSelection.number !== "" && leaderSelection.confirmed ? (
            <p className="done">DONE</p>
          ) : (
            <Button onClick={handleLeaderSelection}>OK</Button>
          )
        ) : (
          <p className="empty"></p>
        )}

        {regularPlayers.map((player) => (
          <PlayerInput
            player={player}
            key={player.id}
            winners={winners}
            playerSelections={playerSelections}
            setPlayerSelections={setPlayerSelections}
          />
        ))}

        {winners.length === 0 && <Button onClick={handleSubmit}>SUBMIT</Button>}
      </form>
    </div>
  );
}

function PlayerInput({
  player,
  winners,
  playerSelections,
  setPlayerSelections,
}) {
  function handlePlayerSelection(e, playerSelection) {
    e.preventDefault();
    if (playerSelection.number !== "") {
      setPlayerSelections((arr) =>
        arr.map((playerSelec) =>
          playerSelec.id === playerSelection.id
            ? { ...playerSelec, confirmed: true }
            : playerSelec
        )
      );

      const nextPlayer = playerSelections.find(
        (playerSelection) => playerSelection.number === ""
      );

      if (nextPlayer) {
        setPlayerSelections((arr) =>
          arr.map((playerSelec) =>
            playerSelec.id === nextPlayer.id
              ? { ...playerSelec, confirmed: false }
              : playerSelec
          )
        );
      }
    }
  }

  const playerSelectionIndex = playerSelections.findIndex(
    (sel) => player.id === sel.id
  );

  return (
    <>
      <label>{player.name}'s guess</label>
      {playerSelections[playerSelectionIndex]?.confirmed ? (
        <p className="icon">
          <FontAwesomeIcon icon={faLock} />
        </p>
      ) : (
        <input
          type="number"
          min="1"
          max="10"
          value={playerSelections[playerSelectionIndex]?.number}
          onChange={(e) =>
            winners.length === 0 &&
            setPlayerSelections((arr) =>
              arr.map((playerSelec) =>
                playerSelec.id === player.id
                  ? {
                      ...playerSelec,
                      number: filterNumber(
                        playerSelections[playerSelectionIndex],
                        e
                      ),
                    }
                  : playerSelec
              )
            )
          }
        />
      )}
      {winners.length === 0 ? (
        playerSelections[playerSelectionIndex].number !== "" &&
        playerSelections[playerSelectionIndex].confirmed ? (
          <p className="done">DONE</p>
        ) : (
          <Button
            onClick={(e) =>
              handlePlayerSelection(e, playerSelections[playerSelectionIndex])
            }
          >
            OK
          </Button>
        )
      ) : (
        <p>{winners.includes(player.id) ? "✅" : "❌"}</p>
      )}
    </>
  );
}

function filterNumber(selection, e) {
  if (Number(e.target.value) > 0 && Number(e.target.value) < 11)
    return Number(e.target.value);
  else if (e.target.value === "") return e.target.value;
  else return selection.number;
}
