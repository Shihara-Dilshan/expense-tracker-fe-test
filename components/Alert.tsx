import React from 'react';

const Alert = ({ message }: { message: string }) => (
  <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded">{message}</div>
);

export default Alert;
