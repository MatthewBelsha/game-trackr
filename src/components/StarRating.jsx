"use client";

export default function StarRating({ value, onChange }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div style={{ fontSize: "30px", cursor: "pointer", userSelect: "none" }}>
      {stars.map((num) => {
        const full = value >= num;
        const half = value >= num - 0.5 && value < num;

        return (
          <span
            key={num}
            onClick={() =>
              onChange(full ? num - 0.5 : half ? num : num)
            }
            style={{ color: full || half ? "#FFD700" : "#ccc", marginRight: "4px" }}
          >
            {full ? "★" : half ? "⯨" : "☆"}
          </span>
        );
      })}
    </div>
  );
}
