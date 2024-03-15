import React, { useEffect, useState } from "react";
import "./LatestGames.css";
import GamesList from "../../Games.json";

const LatestGames = () => {
  const [gamePage, isGamePage] = useState<number>(0);
  const [isPage, setIsPage] = useState<number>(1);
  let Constant: number = 4;

 


  const RenderList = GamesList.slice(0 + gamePage, gamePage + Constant).map(
    (game, i) => {
      return (
        <div style={{ width: "15rem" }} key={i}>
          <div className="gameList-card">
            <img src={game.image} alt={game.title} />
            <h4>{game.title}</h4>
            <div>Price : {game.price}$</div>
          </div>
        </div>
      );
    }
  );


  return (
    <div>
      <div className="game-list">{RenderList}</div>
      <div className="button-container">
        <button
          onClick={() => {
            isGamePage(gamePage - Constant);
          }}
          disabled={gamePage === 0}
        >
          Pre
        </button>
        <button
          onClick={() => {
            isGamePage(gamePage + Constant);
          }}
          disabled={gamePage >= GamesList.length - Constant}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LatestGames;
