import React, { useState } from "react";
import "./Games.css";
import Todolist from "../Todolist";

const Games = () => {
  const [isGame, setIsGame] = useState<number>(0);

  const [List, setList] = useState<[{ _id: string, title: string, image: string, release_date: string }]>([{
    _id: "", title: "PUBG", image: "https://wallpapers.com/images/featured/pubg-4k-m7d01u319yw5wo0m.jpg", release_date: '3/14/2017'
  }])

  const url: string = 'http://localhost:4000/api/todos/'


  const DeletePost = async (game: { _id: string }) => {
    fetch(url + game._id, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    window.location.reload()
  }



  const RenderGames = (List || []).map(
    (game, i) => {
      return (
        <div className="game-container" key={game.title}>
          <div
            className="game-card "
            style={{ transform: `translateX(${100 * isGame}%)` }}
          >
            <img src={game.image} alt={game.title} />
            <div className="release">ReleaseDate : {game.release_date}</div>
            <div className="title">{game.title}</div>
            <button className=""
              onClick={() => DeletePost(game)}
            >DELETE ❌</button>
          </div>
        </div>
      );
    }
  );



  return (
    <React.Fragment>
      <h3>TODO LIST</h3>
      <Todolist List={List} setList={setList} />
      <div className="game-container-2">{RenderGames}</div>
      <div className="button-card">
        <button
          onClick={() => {
            setIsGame(isGame + 1);
          }}
          disabled={isGame > -1}
        >
          PREVIOUS
        </button>

        <button
          onClick={() => {
            setIsGame(isGame - 1);
          }}
          disabled={isGame <= -(List.length - 1)}
        >
          NEXT
        </button>
      </div>
    </React.Fragment>
  );
};

export default Games;
