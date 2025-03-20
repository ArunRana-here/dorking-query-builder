import React from "react";
import { motion } from "framer-motion";

const SearchBar = ({ queryInput, setQueryInput, handleSearch, autoSuggestQuery }) => {
  return (
    <div className="w-full max-w-6xl flex flex-col items-center">
      <motion.div
        className="relative w-full"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <input
          type="text"
          placeholder="🔍 Type your search query here..."
          className="w-full p-8 text-5xl rounded-2xl text-black focus:outline-none border-8 border-green-400 bg-gray-200 dark:bg-gray-800 dark:text-white font-mono transition-all focus:shadow-green-500 focus:shadow-3xl"
          value={queryInput}
          onChange={(e) => setQueryInput(e.target.value)}
        />
        <motion.div
          className="absolute top-0 left-0 w-full h-full rounded-2xl border-8 border-green-400"
          animate={{ opacity: [0.5, 1], scale: [1, 1.02] }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.div>

      <div className="flex mt-6 space-x-6">
        <motion.button
          className="px-8 py-6 bg-purple-500 text-2xl rounded-2xl font-bold hover:bg-purple-700 transition-all hover:scale-110"
          onClick={() => setQueryInput(autoSuggestQuery(queryInput))}
          whileHover={{ rotate: 3 }}
        >
          🤖 Auto-Suggest Query
        </motion.button>

        <motion.button
          className="px-10 py-6 bg-green-500 text-2xl rounded-2xl font-bold shadow-lg hover:bg-green-700 hover:scale-110 transition-all"
          onClick={handleSearch}
          whileHover={{ rotate: 3 }}
        >
          🚀 Search
        </motion.button>
      </div>
    </div>
  );
};

export default SearchBar;
