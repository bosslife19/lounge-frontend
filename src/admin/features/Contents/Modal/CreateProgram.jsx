import React, { useRef, useState } from "react";
import { useRequest } from "../../../../hooks/useRequest";
import { toast } from "react-toastify";
import { Box, Button, Input, Text, Textarea } from "@chakra-ui/react";

const CreateProgram = ({ open, onClose, setNewsData }) => {
  const [sessions, setSessions] = useState([
    { title: "", description: "", date: "", time: "", video: "" },
  ]);
  const { makeRequest, loading } = useRequest();

  const titleRef = useRef("");
  const descRef = useRef("");
  const timeRef = useRef();
  const dateRef = useRef();

  const addSession = () => {
    setSessions([
      ...sessions,
      { title: "", description: "", date: "", time: "" },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...sessions];
    updated[index][field] = value;
    setSessions(updated);
  };
  const handleCreateProgram = async () => {
    const res = await makeRequest("/program", {
      title: titleRef.current.value,
      content: descRef.current.value,

      sessions,
    });

    if (res.error) return;
    toast.success("Program Created Successfully");
    setNewsData((prev) => [res.response.program, ...prev]);
  };
  if (!open) return null;

  return (
    <Box
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "10px",
      }}
    >
      <Box
        width={{ base: "100%", md: "480px" }}
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "24px",
          // width: "480px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            borderBottom: "1px solid #eee",
            paddingBottom: "10px",
          }}
        >
          <Text
            fontSize={{ base: "12px", md: 14 }}
            style={{
              // fontSize: "18px",
              margin: 0,
              color: "#222",
              fontWeight: "600",
            }}
          >
            Create New Program
          </Text>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "22px",
              cursor: "pointer",
              color: "#666",
              fontWeight: "bold",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* News Fields */}
        <div style={{ marginBottom: "15px" }}>
          <Text
            fontSize={{ base: "11px", md: 14 }}
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "600",
              color: "#444",
            }}
          >
            Title
          </Text>
          <Input
            fontSize={{ base: "10px", md: 14 }}
            type="text"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginBottom: "10px",
              fontSize: "14px",
            }}
            ref={titleRef}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Text
            fontSize={{ base: "11px", md: 14 }}
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "600",
              color: "#444",
            }}
          >
            Description
          </Text>
          <Textarea
            fontSize={{ base: "10px", md: 14 }}
            rows="3"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              resize: "none",
              fontSize: "14px",
            }}
            ref={descRef}
          />
        </div>

        {/* Sessions Section */}
        <Text
          fontSize={{ base: "11px", md: 16 }}
          style={{
            color: "#222",
            fontWeight: "600",
            marginBottom: "12px",
          }}
        >
          Sessions
        </Text>
        {sessions.map((session, index) => (
          <div
            key={index}
            style={{
              marginBottom: "18px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#fafafa",
            }}
          >
            <div style={{ marginBottom: "12px" }}>
              <Text
                fontSize={{ base: "11px", md: 14 }}
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "600",
                  color: "#444",
                }}
              >
                Session Title
              </Text>
              <Input
                fontSize={{ base: "10px", md: 14 }}
                type="text"
                value={session.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <Text
                fontSize={{ base: "11px", md: 14 }}
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "600",
                  color: "#444",
                }}
              >
                Session Description
              </Text>
              <Textarea
                fontSize={{ base: "10px", md: 14 }}
                rows="2"
                value={session.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  resize: "none",
                }}
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <Text
                fontSize={{ base: "11px", md: 14 }}
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "600",
                  color: "#444",
                }}
              >
                Video Link
              </Text>
              <Input
                fontSize={{ base: "10px", md: 14 }}
                type="text"
                value={session.video}
                onChange={(e) => handleChange(index, "video", e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ flex: 1 }}>
                <Text
                  fontSize={{ base: "11px", md: 14 }}
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "600",
                    color: "#444",
                  }}
                >
                  Date of Event
                </Text>
                <Input
                  fontSize={{ base: "10px", md: 14 }}
                  type="date"
                  value={session.date}
                  onChange={(e) => handleChange(index, "date", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Text
                  fontSize={{ base: "11px", md: 14 }}
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "600",
                    color: "#444",
                  }}
                >
                  Time of Event
                </Text>
                <Input
                  fontSize={{ base: "10px", md: 14 }}
                  type="time"
                  value={session.time}
                  onChange={(e) => handleChange(index, "time", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          fontSize={{ base: "10px", md: 14 }}
          size={{ base: "xs", md: "sm" }}
          className=" text-[10px] md:text-[14px]"
          onClick={addSession}
          style={{
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginBottom: "20px",
            fontWeight: "600",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          + Add Session
        </Button>

        {/* Actions */}
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <Button
            fontSize={{ base: "10px", md: 14 }}
            size={{ base: "xs", md: "sm" }}
            onClick={onClose}
            style={{
              padding: "10px 15px",
              backgroundColor: "#e0e0e0",
              color: "#333",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              // fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Cancel
          </Button>
          <Button
            fontSize={{ base: "10px", md: 14 }}
            size={{ base: "xs", md: "sm" }}
            style={{
              padding: "10px 15px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
            onClick={handleCreateProgram}
          >
            Create Program
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default CreateProgram;
