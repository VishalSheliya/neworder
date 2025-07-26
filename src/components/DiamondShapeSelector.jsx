// src/components/DiamondSelectors/DiamondShapeSelector.js
import React from 'react';

const DiamondShapeSelector = ({ values, onChange }) => {
  const shapes = [
    { name: 'Round', image: 'round' },
    { name: 'Oval', image: 'oval' },
    { name: 'Pear', image: 'pear' },
    { name: 'Cush Mod', image: 'cushmod' },
    { name: 'Cush Brill', image: 'cushbrill' },
    { name: 'Emerald', image: 'emerald' },
    { name: 'Radiant', image: 'radiant' },
    { name: 'Princess', image: 'princess' },
    { name: 'Asscher', image: 'asscher' },
    { name: 'Square', image: 'square' },
    { name: 'Marquise', image: 'marquise' },
    { name: 'Heart', image: 'heart' },
  ];
  
  const handleSelection = (shape) => {
    if (values.includes(shape)) {
      onChange(values.filter(s => s !== shape));
    } else {
      onChange([...values, shape]);
    }
  };

  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">Diamond Shapes</label>
      <div className="grid grid-cols-3 gap-4">
        {shapes.map(shape => (
          <button
            key={shape.name}
            type="button"
            onClick={() => handleSelection(shape.name)}
            className={`flex flex-col items-center p-3 rounded-lg border ${
              values.includes(shape.name) 
                ? 'bg-green-100 border-green-500' 
                : 'bg-white border-gray-300 hover:bg-gray-50'
            }`}
          >
            <img 
              src={`/shapes/${shape.image}.png`} 
              alt={shape.name} 
              className="w-12 h-12 object-contain mb-2"
              onError={(e) => {
                e.target.onerror = null;
                e.target.parentNode.querySelector('.shape-fallback').classList.remove('hidden');
                e.target.classList.add('hidden');
              }}
            />
            <div className="shape-fallback hidden w-12 h-12 bg-gray-200 border-2 border-dashed rounded-xl mb-2"></div>
            <span className="text-sm text-gray-700">{shape.name}</span>
          </button>
        ))}
      </div>
      <div className="mt-2 text-sm text-gray-500">
        Selected: {values.length > 0 ? values.join(', ') : 'None'}
      </div>
    </div>
  );
};

export default DiamondShapeSelector;