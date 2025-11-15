import React, { useState } from "react";
import { motion } from "framer-motion";

export default function LikeDislikeButtons() {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [selected, setSelected] = useState(null);

  const handleLike = () => {
    if (selected === "like") {
      setLikes(likes - 1);
      setSelected(null);
      return;
    }
    if (selected === "dislike") {
      setDislikes(dislikes - 1);
    }
    setLikes(likes + 1);
    setSelected("like");
  };

  const handleDislike = () => {
    if (selected === "dislike") {
      setDislikes(dislikes - 1);
      setSelected(null);
      return;
    }
    if (selected === "like") {
      setLikes(likes - 1);
    }
    setDislikes(dislikes + 1);
    setSelected("dislike");
  };

  return (
    <motion.div
      className="flex items-center gap-4 mt-3 select-none"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Like Button */}
      <motion.button
        whileTap={{ scale: 0.88 }}
        whileHover={{ scale: 1.05 }}
        animate={
          selected === "like"
            ? { scale: [1, 1.16, 1], boxShadow: "0 0 12px rgba(16, 190, 16, 0.35)" }
            : { scale: 1, boxShadow: "0 0 4px rgba(255,255,255,0.08)" }
        }
        transition={{ duration: 0.2 }}
        onClick={handleLike}
        className={`px-3 py-1 rounded-full flex items-center gap-2
          border text-sm transition-all duration-200
          ${
            selected === "like"
              ? "bg-green-500/20 border-green-400 text-green-300"
              : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
          }
        `}
      >
        <motion.span
          animate={
            selected === "like"
              ? { color: "rgb(110, 255, 110)", textShadow: "0 0 6px rgba(0,255,0,0.6)" }
              : { color: "inherit", textShadow: "none" }
          }
        >
          👍
        </motion.span>

        {/* Animated Counter */}
        <motion.span
          key={likes}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 320 }}
        >
          {likes}
        </motion.span>
      </motion.button>

      {/* Dislike Button */}
      <motion.button
        whileTap={{ scale: 0.88 }}
        whileHover={{ scale: 1.05 }}
        animate={
          selected === "dislike"
            ? { scale: [1, 1.16, 1], boxShadow: "0 0 12px rgba(255, 60, 60, 0.35)" }
            : { scale: 1, boxShadow: "0 0 4px rgba(255,255,255,0.08)" }
        }
        transition={{ duration: 0.2 }}
        onClick={handleDislike}
        className={`px-3 py-1 rounded-full flex items-center gap-2
          border text-sm transition-all duration-200
          ${
            selected === "dislike"
              ? "bg-red-500/20 border-red-400 text-red-300"
              : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
          }
        `}
      >
        <motion.span
          animate={
            selected === "dislike"
              ? { color: "rgb(255, 140, 140)", textShadow: "0 0 6px rgba(255,0,0,0.6)" }
              : { color: "inherit", textShadow: "none" }
          }
        >
          👎
        </motion.span>

        {/* Animated Counter */}
        <motion.span
          key={dislikes}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 320 }}
        >
          {dislikes}
        </motion.span>
      </motion.button>
    </motion.div>
  );
}
