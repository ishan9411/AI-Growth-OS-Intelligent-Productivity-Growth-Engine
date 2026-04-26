import React, { useState } from "react";

function FocusModal({ taskId, onClose, onSubmit }) {

  const [rating, setRating] = useState(0);

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>

        <h2>Rate Your Focus</h2>

        <div>
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              onClick={() => setRating(i + 1)}
              style={{
                fontSize: "25px",
                cursor: "pointer",
                color: i < rating ? "gold" : "gray"
              }}
            >
              ★
            </span>
          ))}
        </div>

        <p>Selected: {rating}</p>

        <button onClick={() => onSubmit(taskId, rating)}>
          Submit
        </button>

        <button onClick={onClose}>
          Cancel
        </button>

      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "10px"
  }
};

export default FocusModal;