import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

function CenteredLoading() {
    return (
        <div className='flex justify-center items-center text-primaryD p-3'>
            <CircularProgress size={54} color={"inherit"} />
        </div>
    );

}

export default CenteredLoading;
