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
    number: "",
    confirmed: false,
  });

  console.log("regularPlayers", regularPlayers);

  const [playerSelections, setPlayerSelections] = useState(
    regularPlayers.map((regPlayer) => ({
      id: regPlayer.id,
      number: "",
      confirmed: true,
    }))
  );

  /*const [player1Selection, setPlayer1Selection] = useState({
    number: "",
    confirmed: true,
  });
  const [player2Selection, setPlayer2Selection] = useState({
    number: "",
    confirmed: true,
  });

 */

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
                setLeaderSelection(filterNumber(leaderSelection, e));
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

        {/*

        <label>{regularPlayers[1].name}'s guess</label>
        {player2Selection.confirmed ? (
          <p className="icon">
            <FontAwesomeIcon icon={faLock} />
          </p>
        ) : (
          <input
            type="number"
            min="1"
            max="10"
            value={player2Selection.number}
            onChange={(e) =>
              winners.length === 0 &&
              setPlayer2Selection(filterNumber(player2Selection, e))
            }
          />
        )}
        {winners.length === 0 ? (
          player2Selection.number !== "" && player2Selection.confirmed ? (
            <p className="done">DONE</p>
          ) : (
            <Button onClick={handlePlayer2Selection}>OK</Button>
          )
        ) : (
          <p>{winners.includes(regularPlayers[1].name) ? "✅" : "❌"}</p>
        )}
        */}
        {regularPlayers.map((player) => (
          <PlayerInput player={player} key={player.id} />
        ))}
        {/* onClick={handleSubmit} */}
        {winners.length === 0 && <Button>SUBMIT</Button>}
      </form>
    </div>
  );

  function PlayerInput({ player }) {
    const playerSelectionIndex = playerSelections.findIndex(
      (sel) => player.id === sel.id
    );
    console.log("playerSelectionIndex", playerSelectionIndex);
    console.log("playerSelections", playerSelections);

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
          <p>{winners.includes(player.name) ? "✅" : "❌"}</p>
        )}
      </>
    );
  }

  function handleLeaderSelection(e) {
    e.preventDefault();

    console.log("regularIndexes[0]", regularIndexes[0]);

    if (leaderSelection.number !== "") {
      setLeaderSelection({ ...leaderSelection, confirmed: true });
      setPlayerSelections((arr) =>
        arr.map((playerSelec) =>
          playerSelec.id === regularIndexes[0]
            ? { ...playerSelec, confirmed: false }
            : playerSelec
        )
      );
      //setPlayer1Selection({ ...player1Selection, confirmed: false });
    }
  }
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

      //setPlayer1Selection({ ...player1Selection, confirmed: true });

      //setPlayer2Selection({ ...player2Selection, confirmed: false }); to add
    }
  }

  /*function handlePlayer2Selection(e) {
    e.preventDefault();
    if (player2Selection.number !== "")
      setPlayer2Selection({ ...player2Selection, confirmed: true });
  }*/

  /*function handleSubmit(e) {
    e.preventDefault();

    if (
      leaderSelection.number !== "" &&
      player1Selection.number !== "" &&
      player2Selection.number !== ""
    ) {
      if (player1Selection.number === leaderSelection.number)
        setWinners((winners) => [...winners, regularPlayers[0].name]);

      if (player2Selection.number === leaderSelection.number)
        setWinners((winners) => [...winners, regularPlayers[1].name]);

      if (
        player1Selection.number !== leaderSelection.number &&
        player2Selection.number !== leaderSelection.number
      )
        setWinners((winners) => [...winners, leader.name]);

      setLeaderSelection({ ...leaderSelection, confirmed: false });
      setPlayer1Selection({ ...player1Selection, confirmed: false });
      setPlayer2Selection({ ...player2Selection, confirmed: false });
    }
  }*/
}

/*function filterNumber(selection, e) {
  if (Number(e.target.value) > 0 && Number(e.target.value) < 11)
    return { number: Number(e.target.value), confirmed: false };
  else if (e.target.value === "")
    return { number: e.target.value, confirmed: false };
  else return selection;
}*/

function filterNumber(selection, e) {
  if (Number(e.target.value) > 0 && Number(e.target.value) < 11)
    return Number(e.target.value);
  else if (e.target.value === "") return e.target.value;
  else return selection.number;
}
