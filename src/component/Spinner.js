import React from 'react';
import PropTypes from 'prop-types';

const Spinner = (props)=> {
  
  // Set spinner color based on Dark/Light mode
  const spinnerColor = props.mode === 'dark' ? '#f8f9fa' : '#343a40';

  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px 0',
        height: '50px', // Consistent height for the loader area
      }}>
      
      {/* New Three-dot pulsing loading animation (Ellipsis Loader) */}
      <div className="dot-spinner" style={{display: 'flex', alignItems: 'center'}}>
        {/* Dot 1: Animation starts immediately (0s delay) */}
        <div className="dot" style={{ backgroundColor: spinnerColor, animationDelay: '0s' }}></div>
        {/* Dot 2: Animation delayed by 0.2s */}
        <div className="dot" style={{ backgroundColor: spinnerColor, animationDelay: '0.2s' }}></div>
        {/* Dot 3: Animation delayed by 0.4s */}
        <div className="dot" style={{ backgroundColor: spinnerColor, animationDelay: '0.4s' }}></div>
      </div>
      
      {/* Custom CSS for the new spinner animation */}
      <style>{`
        /* Container for the dots */
        .dot-spinner {
          display: flex;
          justify-content: space-around;
          width: 60px; /* Total width of the spinner */
        }
        
        /* Individual dot styling */
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin: 0 4px;
          transform: scale(0); /* Start scaled down */
          animation: dot-pulse 1.2s infinite ease-in-out;
        }

        /* Keyframes for the pulsing animation */
        @keyframes dot-pulse {
          0%, 100% {
            transform: scale(0); /* Invisible at start/end */
          }
          50% {
            transform: scale(1); /* Full size in the middle */
          }
        }
      `}</style>
      
    </div>
  );
  
}

Spinner.propTypes = {
    mode: PropTypes.string.isRequired
}

export default Spinner;