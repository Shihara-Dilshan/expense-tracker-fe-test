import React from 'react';
import TextField from '@mui/material/TextField';

const FilterBar = ({ filter, setFilter }: { filter: string; setFilter: (v: string) => void }) => (
  <TextField
    label="Filter by description..."
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    variant="outlined"
    fullWidth
    sx={{ mb: 2, backgroundColor: 'white', borderRadius: 1 }}
    InputLabelProps={{ style: { color: '#333' } }}
    InputProps={{ style: { color: '#222' } }}
  />
);

export default FilterBar;
