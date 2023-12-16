import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Function to print success message and navigate to the home page
    function showSuccessMessage() {
      console.log('Payment is successful!');
    }

    // Function to navigate to the home page

    // Call the function to show success message and navigate
    showSuccessMessage();
  }, [navigate]);

  return <div>Success Page</div>;
}

export default SuccessPage;
