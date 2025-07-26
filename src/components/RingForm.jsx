// src/components/Forms/RingForm.js
import React from 'react';
import DiamondColorSelector from './DiamondColorSelector';
import DiamondClaritySelector from './DiamondClaritySelector';
import DiamondShapeSelector from './DiamondShapeSelector';

const RingForm = ({ details, setDetails }) => {
  const handleChange = (field, value) => {
    setDetails(prev => ({ ...prev, [field]: value }));
  };

  const showDiamondDetails = details.diamondType !== 'Other';

  return (
    <div className="space-y-6">
      {/* Gold Type */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Gold Type</label>
        <div className="grid grid-cols-3 gap-2">
          {['18k', '14k', '22k'].map(type => (
            <button
              key={type}
              type="button"
              onClick={() => handleChange('goldType', details.goldType === type ? '' : type)}
              className={`py-2.5 rounded-lg border font-medium ${
                details.goldType === type 
                  ? 'bg-green-100 border-green-500 text-green-700' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      
      {/* Gold Color */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Gold Color</label>
        <div className="grid grid-cols-3 gap-2">
          {['White', 'Yellow', 'RoseGold'].map(color => (
            <button
              key={color}
              type="button"
              onClick={() => handleChange('goldColor', details.goldColor === color ? '' : color)}
              className={`py-2.5 rounded-lg border font-medium ${
                details.goldColor === color 
                  ? 'bg-green-100 border-green-500 text-green-700' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
      
      {/* Diamond Type */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Diamond Type</label>
        <div className="grid grid-cols-3 gap-2">
          {['CVD', 'Natural', 'Other'].map(type => (
            <button
              key={type}
              type="button"
              onClick={() => handleChange('diamondType', details.diamondType === type ? '' : type)}
              className={`py-2.5 rounded-lg border font-medium ${
                details.diamondType === type 
                  ? 'bg-green-100 border-green-500 text-green-700' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        
        {details.diamondType === 'Other' && (
          <div className="mt-3">
            <label className="block text-sm text-gray-600 mb-1">Specify Diamond Type</label>
            <input
              type="text"
              value={details.otherDiamondType || ''}
              onChange={(e) => handleChange('otherDiamondType', e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter diamond type"
            />
          </div>
        )}
      </div>
      
      {/* Show diamond details only if not "Other" */}
      {showDiamondDetails && (
        <>
          {/* Diamond Certification */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Diamond Certification</label>
            <div className="grid grid-cols-2 gap-2">
              {['Certified', 'Non-Certified'].map(cert => (
                <button
                  key={cert}
                  type="button"
                  onClick={() => handleChange('diamondCertification', details.diamondCertification === cert ? '' : cert)}
                  className={`py-2.5 rounded-lg border font-medium ${
                    details.diamondCertification === cert 
                      ? 'bg-green-100 border-green-500 text-green-700' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {cert}
                </button>
              ))}
            </div>
          </div>
          
          {/* Diamond Colors */}
          <DiamondColorSelector 
            values={details.diamondColors || []} 
            onChange={(values) => handleChange('diamondColors', values)} 
          />
          
          {/* Diamond Clarities */}
          <DiamondClaritySelector 
            values={details.clarities || []} 
            onChange={(values) => handleChange('clarities', values)} 
          />
          
          {/* Diamond Size */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Diamond Size (carat)</label>
            <input
              type="text"
              value={details.diamondSize || ''}
              onChange={(e) => handleChange('diamondSize', e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter diamond size"
            />
          </div>
          
          {/* Diamond Shapes */}
          <DiamondShapeSelector 
            values={details.shapes || []} 
            onChange={(values) => handleChange('shapes', values)} 
          />
        </>
      )}
      
      {/* Ring Size */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Ring Size</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={details.ringSize || ''}
            onChange={(e) => handleChange('ringSize', e.target.value)}
            className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter size"
          />
          <select
            value={details.sizeUnit || 'us'}
            onChange={(e) => handleChange('sizeUnit', e.target.value)}
            className="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="us">US</option>
            <option value="uk">UK</option>
            <option value="ind">IND</option>
          </select>
        </div>
      </div>
      
      {/* Notes */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Notes <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          value={details.notes || ''}
          onChange={(e) => handleChange('notes', e.target.value)}
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Additional notes or specifications"
          rows="3"
        />
      </div>
    </div>
  );
};

export default RingForm;