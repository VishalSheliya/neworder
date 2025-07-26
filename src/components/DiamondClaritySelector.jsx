// src/components/DiamondSelectors/DiamondClaritySelector.js
import React from 'react';

const DiamondClaritySelector = ({ values, onChange }) => {
  const clarities = ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2'];
  
  const handleSelection = (clarity) => {
    if (values.includes(clarity)) {
      onChange(values.filter(c => c !== clarity));
    } else {
      onChange([...values, clarity]);
    }
  };

  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">Clarities</label>
      <div className="grid grid-cols-4 gap-2">
        {clarities.map(clarity => (
          <button
            key={clarity}
            type="button"
            onClick={() => handleSelection(clarity)}
            className={`py-2.5 rounded-lg border font-medium ${
              values.includes(clarity) 
                ? 'bg-green-100 border-green-500 text-green-700' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {clarity}
          </button>
        ))}
      </div>
      <div className="mt-2 text-sm text-gray-500">
        Selected: {values.length > 0 ? values.join(', ') : 'None'}
      </div>
    </div>
  );
};

export default DiamondClaritySelector;