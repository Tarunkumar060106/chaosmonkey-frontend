import { useState } from "react";
import { cloneRepo } from "../services/api";

export default function RepoCard({ repo }: any) {
  const [status, setStatus] = useState<"idle" | "cloning" | "done">("idle");

  const handleClone = async () => {
    setStatus("cloning");
    await cloneRepo(repo.clone_url);
    setStatus("done");
  };

  return (
    <div style={card}>
      <h3>{repo.full_name}</h3>
      <p>{repo.private ? "Private" : "Public"}</p>

      <button onClick={handleClone} disabled={status !== "idle"}>
        {status === "idle" && "Clone"}
        {status === "cloning" && "Cloning…"}
        {status === "done" && "Cloned ✓"}
      </button>
    </div>
  );
}

const card = {
  border: "1px solid #ddd",
  borderRadius: 8,
  padding: 16,
  marginBottom: 12,
};
