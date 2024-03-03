import React, { useState} from 'react';
import MetaMaskConnect from './MetaMaskConnect';
import axios from 'axios';

const TradingDashboard: React.FC = () => {
  // Function to handle MetaMask connection
  const handleConnect = (account: string) => {
    console.log('Connected to MetaMask:', account);
    // You can perform any additional actions here upon successful connection
  };

  // Function to handle MetaMask disconnection
  const handleDisconnect = () => {
    console.log('Disconnected from MetaMask');
    // You can perform any additional actions here upon disconnection
  };

  // State for the bot form
  const [symbol, setSymbol] = useState<string>('');
  const [volume, setVolume] = useState<number>(0);
  const [action, setAction] = useState<string>('');
  const [stopLoss, setStopLoss] = useState<number | undefined>(undefined);
  const [takeProfit, setTakeProfit] = useState<number | undefined>(undefined);
  const [strategy, setStrategy] = useState<string>('');
  const [frequency, setFrequency] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [automationEnabled, setAutomationEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  // State for live cryptocurrency prices
  //const [cryptoPrices, setCryptoPrices] = useState<any[]>([]);

  {/* 
  // Fetch live cryptocurrency prices on component mount
  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await axios.get('http://api.example.com/crypto/prices');
        setCryptoPrices(response.data);
      } catch (error) {
        console.error('Error fetching cryptocurrency prices:', error);
      }
    };
    fetchCryptoPrices();
  }, []);
*/}

  // Function to handle bot form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/trade', {
        symbol,
        volume,
        action,
        stopLoss,
        takeProfit,
        strategy,
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Bot Form */}
      <div>
        <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
          <h1 className="text-3xl font-bold mb-4">AlphaTrader Bot</h1>
          <h2 className="text-3xl font-bold mb-4"> FX-MetaTrader 4/5 </h2>
           {/* Bot Form */}
          <MetaMaskConnect onConnect={handleConnect} onDisconnect={handleDisconnect} />

          {message && (
            <div className="text-center text-sm text-green-600 mb-4">
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="mb-4">
            <label htmlFor="volume" className="block text-sm font-medium mb-1">Volume</label>
            <input
              type="number"
              id="volume"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              placeholder="Volume"
              required
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="action" className="block text-sm font-medium mb-1">Action</label>
            <select
              id="action"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              required
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            >
              <option value="">Select Action</option>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
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
            <label htmlFor="strategy" className="block text-sm font-medium mb-1">Strategy</label>
            <select
              id="strategy"
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              required
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            >
              <option value="">Select Strategy</option>
    <option value="RSI">Relative Strength Index (RSI)</option>
    <option value="MACD">Moving Average Convergence Divergence (MACD)</option>
    <option value="Bollinger Bands">Bollinger Bands</option>
    <option value="Ichimoku Cloud">Ichimoku Cloud</option>
            </select>
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
      </div>
      
      {/* Live Cryptocurrency Prices 
      <div>
        <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
          
          <h1 className="text-3xl font-bold mb-4">Live Trading Graph</h1>
          <ul>
            {cryptoPrices.map((crypto: any, index: number) => (
              <li key={index} className="text-lg mb-2">
                {crypto.name}: ${crypto.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
      */}
      
      {/* Live Trading Graph
      <div>
        <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-4">Live Cryptocurrency Prices</h1>
           Add live trading graph here *
        </div>
      </div>
            */}

    </div>
  );
};

export default TradingDashboard;
