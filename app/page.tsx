"use client";

import { useState } from "react";
import { Loader2, Copy, RefreshCw, Linkedin } from "lucide-react";

export default function PostGenerator() {
  const [description, setDescription] = useState("");
  const [wordlimit, setwordlimit] = useState("");
  const [generatedPost, setGeneratedPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generatePost = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generatePost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          wordlimit: Number.parseInt(wordlimit) || 100,
        }),
      });
      const data = await response.json();
      setGeneratedPost(data.post);
    } catch (error) {
      console.error("Error generating post:", error);
    }
    setIsLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPost);
    alert("copied post to clipboard");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold flex justify-center items-center">
        <Linkedin />
        <div className="ml-2 pt-1">Post Generator</div>
      </h1>
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          placeholder="Enter post description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 min-h-[100px]"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="wordLimit"
          className="block text-sm font-medium text-gray-700"
        >
          Word Limit (optional)
        </label>
        <input
          id="wordLimit"
          type="number"
          placeholder="Enter word limit"
          value={wordlimit}
          onChange={(e) => setwordlimit(e.target.value)}
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex space-x-2">
        <button
          onClick={generatePost}
          disabled={isLoading || !description}
          className={`flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
            isLoading || !description ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Post"
          )}
        </button>
        <button
          onClick={generatePost}
          disabled={isLoading || !description}
          className={`flex items-center justify-center px-4 py-2 text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
            isLoading || !description ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Regenerate
        </button>
      </div>
      {generatedPost && (
        <div className="space-y-2">
          <label
            htmlFor="generatedPost"
            className="block text-sm font-medium text-gray-700"
          >
            Generated Post
          </label>
          <div className="relative">
            <textarea
              id="generatedPost"
              value={generatedPost}
              readOnly
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 min-h-[200px]"
            />
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
