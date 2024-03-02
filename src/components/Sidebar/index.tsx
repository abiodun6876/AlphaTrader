// Import React and other necessary dependencies
import React, { useState } from 'react';
import axios from 'axios';

const TradeForm: React.FC = () => {
  // Define state variables and their respective updater functions
  const [symbol, setSymbol] = useState<string>('');
  const [volume] = useState<number>(0); // State variable for volume
  const [action] = useState<string>(''); // State variable for action
  const [stopLoss, setStopLoss] = useState<number | undefined>(undefined);
  const [takeProfit, setTakeProfit] = useState<number | undefined>(undefined);
  const [frequency, setFrequency] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [automationEnabled, setAutomationEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  // Define the submit handler function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/trade', {
        symbol,
        volume, // Use the volume state variable in the request payload
        action, // Use the action state variable in the request payload
        stopLoss,
        takeProfit,
        frequency,
        duration,
        automationEnabled
      });
      console.log(response.data);
      setMessage('Trade executed successfully!');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error executing trade. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Render the component UI
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-4">AlphaTrader Bot</h1>
      {message && (
        <div className="text-center text-sm text-green-600 mb-4">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="symbol" className="block text-sm font-medium mb-1">Symbol</label>
          <select
            id="symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          >
            <option value="">Select Symbol</option>
            <option value="EURUSD">EURUSD</option>
            <option value="GBPUSD">GBPUSD</option>
            <option value="USDJPY">USDJPY</option>
            {/* Add more FX symbols here */}
          </select>
        </div>
        {/* Other input fields */}
        <div className="mb-4">
          <label htmlFor="stopLoss" className="block text-sm font-medium mb-1">Stop Loss</label>
          <input
            type="number"
            id="stopLoss"
            value={stopLoss || ''}
            onChange={(e) => setStopLoss(parseInt(e.target.value))}
            placeholder="Stop Loss (optional)"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="takeProfit" className="block text-sm font-medium mb-1">Take Profit</label>
          <input
            type="number"
            id="takeProfit"
            value={takeProfit || ''}
            onChange={(e) => setTakeProfit(parseInt(e.target.value))}
            placeholder="Take Profit (optional)"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="frequency" className="block text-sm font-medium mb-1">Trade Frequency (in minutes)</label>
          <input
            type="number"
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(parseInt(e.target.value))}
            placeholder="Trade Frequency"
            required
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="duration" className="block text-sm font-medium mb-1">Trade Duration (in hours)</label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            placeholder="Trade Duration"
            required
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="automationEnabled" className="block text-sm font-medium mb-1">Enable Automation</label>
          <input
            type="checkbox"
            id="automationEnabled"
            checked={automationEnabled}
            onChange={(e) => setAutomationEnabled(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white rounded-md py-2 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default TradeForm;
