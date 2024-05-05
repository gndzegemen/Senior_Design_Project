import React from 'react';
import axios from 'axios';
import CustomButton from './CustomButton';

const OpenApp = () => {
  const handleClick = () => {
    axios.get('http://localhost:3001/work/open-app')
      .then(response => {
        console.log(response.data); // "Operation completed successfully"
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div className="flex mx-4">
      <CustomButton
        btnType="button"
        title={'open app'}
        styles={'bg-[#1dc071]'}
        handleClick={handleClick}
      />
    </div>
  )
}

export default OpenApp;
