'use client';
import React, { useState } from 'react';

export default function SettingsPage() {
  const [max, setMax] = useState(10000);
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">Max Monthly Expense (LKR)</label>
          <input
            type="number"
            className="border rounded px-2 py-1 w-full"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            min={0}
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
