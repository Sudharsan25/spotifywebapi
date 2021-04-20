import React from "react";
import PlaylistRow from "../PlaylistRow/PlaylistRow";
import { Avatar } from "@material-ui/core";
import { useStateValue } from "../../../StateProvider";
import "./Body.css";
import { Droppable } from "react-beautiful-dnd";

const Body = ({ id, items }) => {
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          className="body"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className="body__info">
            <h2>YOUR PLAYLISTS</h2>
            <div className="body__userInfo">
              <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
              <h4>{user?.display_name}</h4>
            </div>
          </div>
          <div className="body__songs">
            {items?.map((playlist, index) => (
              <PlaylistRow track={playlist} index={index} id={playlist.id} />
            ))}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Body;
