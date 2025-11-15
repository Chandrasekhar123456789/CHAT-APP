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
    <div className="flex items-center gap-4 mt-3 select-none">

      {/* Like Button */}
      <motion.button
        whileTap={{ scale: 0.8 }}
        animate={selected === "like" ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={{ duration: 0.25 }}
        onClick={handleLike}
        className={`px-3 py-1 rounded-full flex items-center gap-2
          border text-sm shadow-sm transition-all duration-200
          ${selected === "like" 
            ? "bg-green-500/20 border-green-400 text-green-300 shadow-green-500/40" 
            : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"}
        `}
      >
        👍 
        <motion.span
          key={likes}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {likes}
        </motion.span>
      </motion.button>

      {/* Dislike Button */}
      <motion.button
        whileTap={{ scale: 0.8 }}
        animate={selected === "dislike" ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={{ duration: 0.25 }}
        onClick={handleDislike}
        className={`px-3 py-1 rounded-full flex items-center gap-2
          border text-sm shadow-sm transition-all duration-200
          ${selected === "dislike" 
            ? "bg-red-500/20 border-red-400 text-red-300 shadow-red-500/40" 
            : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"}
        `}
      >
        👎 
        <motion.span
          key={dislikes}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {dislikes}
        </motion.span>
      </motion.button>

    </div>
  );
}
