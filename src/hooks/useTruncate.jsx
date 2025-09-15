import { useNavigate } from "react-router-dom";

function useTruncate() {
  const navigate = useNavigate();

  const truncateText = (text, id, wordLimit = 7) => {
    const words = text.split(" ");
    const preview =
      words.length > wordLimit
        ? words.slice(0, wordLimit).join(" ") + "..."
        : text;

    return (
      <>
        {preview}{" "}
        {words.length > wordLimit && (
          <span
            style={{
              color: "#555",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/post/${id}`)}
          >
            see more
          </span>
        )}
      </>
    );
  };

  return truncateText;
}

export default useTruncate;
