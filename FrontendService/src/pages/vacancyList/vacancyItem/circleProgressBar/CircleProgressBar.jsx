import React from 'react';
import { CircularProgress } from '@mui/material';

const CircleProgressBar = ({ percentage }) => {
  return (
    <div style={{ position: 'relative', width: '100px', height: '100px' }}>
      <CircularProgress
        variant="determinate"
        size="100%"
        thickness={5}
        value={percentage}
        style={{ color: 'black' }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <div
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: 'black',
          }}
        >
          {`${percentage}%`}
        </div>
      </div>
    </div>
  );
};

export default CircleProgressBar;