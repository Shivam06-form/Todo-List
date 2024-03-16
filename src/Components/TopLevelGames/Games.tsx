import React, { useState } from "react";
import "./Games.css";
import Todolist from "../Todolist";

const Games = () => {
  const [isGame, setIsGame] = useState<number>(0);
  const [Loading, setLoading] = useState<boolean>(false)

  const [List, setList] = useState<[{ _id: string, title: string, image: string, release_date: string }]>([{
    _id: "", title: "Loading", image: "https://t4.ftcdn.net/jpg/03/16/15/47/360_F_316154790_pnHGQkERUumMbzAjkgQuRvDgzjAHkFaQ.jpg",
    release_date: new Date().toLocaleDateString()
  }])

  const url: any = process.env.REACT_APP_URL_PROD


  const DeletePost = async (game: { _id: string }) => {
    fetch(url + "/" + game._id, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(async (response) => {
      (await response.json())
    })
    window.location.reload()
  }



  const RenderGames = (List || []).map(
    (game, i) => {
      return (
        <div className="game-container" key={game.title}>
          {<div
            className="game-card "
            style={{ transform: `translateX(${100 * isGame}%)` }}
          >
            <img src={game.image} alt={game.title} />
            {!Loading && <div className="release">ReleaseDate : {game.release_date}</div>}
            {!Loading && <div className="title">{game.title}</div>}
            {!Loading && <button className=""
              onClick={() => DeletePost(game)}
            >DELETE ❌</button>}
          </div>}
        </div>
      );
    }
  );



  return (
    <React.Fragment>
      <h3>TODO LIST</h3>
      <Todolist List={List} setList={setList} setLoading={setLoading} Loading={Loading} />
      {!Loading && <div className="game-container-2">{RenderGames}</div>}
      {Loading && <div className="game-container-2">
        <h3 style={{ margin: "auto" }}>LOADING...</h3>
      </div>}
      {!Loading && <div className="button-card">
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
      </div>}
    </React.Fragment>
  );
};

export default Games;
