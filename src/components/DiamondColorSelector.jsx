// src/components/DiamondSelectors/DiamondColorSelector.js
import React from 'react';

const DiamondColorSelector = ({ values, onChange }) => {
  const colors = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
  
  const handleSelection = (color) => {
    if (values.includes(color)) {
      onChange(values.filter(c => c !== color));
    } else {
      onChange([...values, color]);
    }
  };

  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">Diamond Colors</label>
      <div className="grid grid-cols-4 gap-2">
        {colors.map(color => (
          <button
            key={color}
            type="button"
            onClick={() => handleSelection(color)}
            className={`py-2.5 rounded-lg border font-medium ${
              values.includes(color) 
                ? 'bg-green-100 border-green-500 text-green-700' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {color}
          </button>
        ))}
      </div>
      <div className="mt-2 text-sm text-gray-500">
        Selected: {values.length > 0 ? values.join(', ') : 'None'}
      </div>
    </div>
  );
};

export default DiamondColorSelector;