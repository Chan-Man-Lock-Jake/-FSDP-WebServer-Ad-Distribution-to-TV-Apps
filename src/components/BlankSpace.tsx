import React from 'react';

// Define the props for the BlankSpace component
interface BlankSpaceProps {
  height?: string;
  width?: string;
}

// Functional component to render blank space
const BlankSpace: React.FC<BlankSpaceProps> = ({ height = '2rem', width = '100%' }) => {
  return (
    <div style={{ height, width }} />
  );
};

export default BlankSpace;
