import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import Body from "./Body/Body";
import SideBar from "./SideBar/SideBar";
import "./Player.css";
import { useStateValue } from "../../StateProvider";

function Player({ spotify, ...props }) {
  const id = uuidv4();
  // eslint-disable-next-line
  const [{ playlists, user, userPlaylists, token }, dispatch] = useStateValue();

  const [items, setitems] = useState([]);
  const [items2, setitems2] = useState([]);
  const [draggedItemId, setDraggedItemId] = useState("");
  const [uris, setUris] = useState([]);

  useEffect(() => {
    alert(
      "Drag playlists from Featured Playlists and drop them in user Playlists to Add them to your local Spotify playlists"
    );
  }, []);

  useEffect(() => {
    setitems(playlists.items);
    setitems2(userPlaylists.items);
  }, [playlists, userPlaylists]);
  useEffect(() => {
    if (uris && draggedItemId) {
      fetch(`https://api.spotify.com/v1/playlists/${draggedItemId}/tracks`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uris: uris,
        }),
      });
    }
  }, [uris, draggedItemId, token]);

  const onDragEnd = (result) => {
    // return if item was dropped outside
    if (!result.destination) return;
    // return if the item was dropped in the same place
    if (
      result.source.droppableId === result.destination.droppableId &&
      result.source.index === result.destination.index
    )
      return;
    // get the items array
    const newItems = [...items];
    let newItems2 = [...items2];

    // get the draggedItems
    const draggedItem = newItems[result.source.index];

    fetch(`https://api.spotify.com/v1/users/${user?.id}/playlists`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: draggedItem.name,
        description: draggedItem.description,
      }),
    })
      .then((response) => response.json())
      .then((data) => setDraggedItemId(data.id));

    spotify.getPlaylistTracks(draggedItem.id).then((response) => {
      let uri = [];
      response.items.map((item) => uri.push(item.track.uri));
      setUris(uri);
    });

    // delete the item from source position and insert it to the destination positon
    newItems.splice(result.source.index, 1);
    // newItems2.splice(result.destination.index, 0, draggedItem);
    newItems2 = [...newItems2, draggedItem];

    setitems(newItems);
    setitems2(newItems2);
  };

  return (
    <div className="player">
      <DragDropContext onDragEnd={onDragEnd}>
        <SideBar id={id} items={items} />
        <Body id={id} items={items2} />
      </DragDropContext>
    </div>
  );
}

export default Player;
