import React from "react";
import { motion } from "framer-motion";

const SearchResults = ({ results, hasSearched }) => {
  return (
    <div className="mt-8 w-full max-w-6xl">
      {/* Show "No results found" only if a search was made */}
      {hasSearched && results.length === 0 ? (
        <motion.div
          className="text-red-500 text-2xl font-mono mt-6 text-center"
          animate={{ opacity: [0, 1], y: [-10, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "mirror" }}
        >
          ❌ No results found. Try another query!
        </motion.div>
      ) : (
        results.map((result, index) => (
          <motion.div
            key={index}
            className="p-6 bg-gray-900 dark:bg-gray-800 rounded-xl mb-5 border-l-8 border-green-400 hover:bg-gray-800 dark:hover:bg-gray-700 transition-all shadow-lg shadow-green-500 hover:shadow-green-700 hover:scale-105"
            animate={{ opacity: [0, 1], x: [-20, 0] }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <a
              href={result.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 underline text-2xl font-bold hover:text-blue-500 transition-all"
            >
              {result.title}
            </a>

            <p className="text-gray-400 text-lg mt-2 font-mono">{result.snippet}</p>

            <motion.p
              className="text-sm text-gray-500 mt-2 break-all"
              animate={{ opacity: [0.7, 1], x: [-5, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              🔗{" "}
              <a
                href={result.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500 transition-all"
              >
                {result.link}
              </a>
            </motion.p>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default SearchResults;
