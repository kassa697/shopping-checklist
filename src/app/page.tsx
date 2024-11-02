// src/app/page.tsx

"use client";

import React, { useState } from "react";

const ClipboardCheckList: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [manualInput, setManualInput] = useState<string>("");

  const handlePaste = () => {
    const lines = manualInput.split("\n").filter((line) => line.trim() !== "");
    setItems(lines);
    setManualInput("");
  };

  const handleClear = () => {
    setItems([]);
    setCheckedItems({});
  };

  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleCheckboxChange = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shopping Checklist</h1>
      <textarea
        value={manualInput}
        onChange={(e) => setManualInput(e.target.value)}
        placeholder="ここにリストを貼り付けてください"
        className="w-full p-2 border rounded-md mb-2 text-black"
        rows={4}
      />
      <div className="flex space-x-2 mb-4">
        <button
          onClick={handlePaste}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add to List
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Clear List
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={!!checkedItems[index]}
                onChange={() => handleCheckboxChange(index)}
                className="mr-2"
              />
              <span
                className={`${
                  checkedItems[index] ? "line-through text-gray-500" : ""
                }`}
              >
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Home() {
  return <ClipboardCheckList />;
}
