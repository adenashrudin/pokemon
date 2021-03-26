import React, { useState } from "react";
import { useDataLayerValue } from "../../state-provider/DataLayer";
import "./Modal.css";

export default function Modal({ show }) {
  const [{ list, pokemonSelected }, dispatch] = useDataLayerValue();
  const [nickname, setNickname] = useState("");
  const [errNickname, setErrNickname] = useState(false);

  const handleCancel = () => {
    dispatch({
      type: "SET_MODAL",
      modal: false,
    });
  };

  const handleSave = () => {
    dispatch({
      type: "ADD_LIST",
      list: {
        nickname: nickname,
        pokemon: pokemonSelected,
      },
    });
    setNickname("");
    handleCancel();
  };

  const handleNickname = (e) => {
    const cek = list.filter(
      (f) => f.nickname.toLowerCase() === e.target.value.toLowerCase()
    );
    cek.length > 0 ? setErrNickname(true) : setErrNickname(false);

    setNickname(e.target.value);
  };

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal__content">
        <div className="modal__header">
          <p>Please give me nickname :)</p>
        </div>
        <div className={`modal__body ${errNickname ? "error" : ""}`}>
          <input
            placeholder="Type your nickname"
            onChange={(e) => handleNickname(e)}
            value={nickname}
          />
        </div>
        {errNickname && (
          <span className="error__message">Opps nickname already taken!</span>
        )}

        <div className="modal__footer">
          <button onClick={handleCancel}>Cancel</button>
          <button
            className="save__button"
            onClick={handleSave}
            disabled={nickname !== "" && !errNickname ? false : true}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
