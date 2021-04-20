import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./PlaylistRow.css";

function PlaylistRow({ track, isTrue, id, index }) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className={isTrue ? "songRow sidebarRow" : "songRow bodyRow"}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <img className="songRow__album" src={track?.images[0]?.url} alt="" />
          <div className="songRow__info">
            <h1>{track?.name}</h1>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default PlaylistRow;
