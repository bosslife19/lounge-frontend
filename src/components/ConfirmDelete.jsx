import { Spinner } from "@chakra-ui/react";
import React, { useState } from "react";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, loading }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "24px",
          width: "90%",
          maxWidth: "400px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "8px",
          }}
        >
          Confirm Deletion
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "#555",
            marginBottom: "20px",
          }}
        >
          Are you sure you want to delete this post? This action cannot be undone.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: "#f9f9f9",
              color: "#333",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#f1f1f1")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#f9f9f9")}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#ef4444",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#dc2626")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ef4444")}
          >
            {
                loading? <Spinner/>:'Delete'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;