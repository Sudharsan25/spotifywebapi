import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useStateValue } from "./StateProvider";
import Player from "./Components/Player/Player";
import { getTokenFromResponse } from "./spotify";
import "./App.css";
import Login from "./Components/Login/Login";

function App() {
  const s = new SpotifyWebApi();
  const [{ token }, dispatch] = useStateValue();

  useEffect(() => {
    // Set token
    const hash = getTokenFromResponse();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      s.setAccessToken(_token);

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      s.getUserPlaylists().then((response) =>
        dispatch({
          type: "SET_USERS_PLAYLISTS",
          userPlaylists: response,
        })
      );

      s.getMe().then((user) => {
        console.log(user);
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });

      s.getFeaturedPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists.playlists,
        });
      });
    }
  }, [token, dispatch, s]);

  return (
    <div className="app">
      {!token && <Login />}
      {token && <Player spotify={s} />}
    </div>
  );
}

export default App;
