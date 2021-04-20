import React from "react";
import "./SideBar.css";
import PlaylistRow from "../PlaylistRow/PlaylistRow";

import { Droppable } from "react-beautiful-dnd";

const SideBar = ({ id, items }) => {
  return (
    <div className="sidebar">
      <img
        className="sidebar__logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      <br />

      <strong className="sidebar__title">
        <p>FEATURED PLAYLISTS</p>
      </strong>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className="sidebar__row"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items?.map((playlist, index) => (
              <PlaylistRow
                track={playlist}
                isTrue
                id={playlist.id}
                index={index}
              />
            ))}{" "}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default SideBar;
