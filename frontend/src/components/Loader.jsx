import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Loader = () => {
    
    return (
        <Box className="absolute top-[77px] left-0 z-100"  sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  );
  
}

export default Loader