import React from 'react';

const FilterBar = ({ filter, setFilter }: { filter: string; setFilter: (v: string) => void }) => (
  <div className="mb-4">
    <input
      type="text"
      placeholder="Filter by description..."
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="border rounded px-2 py-1 w-full"
    />
  </div>
);

export default FilterBar;
