import React, { useState, useEffect } from 'react';
import { Thermometer, ArrowRight, Snowflake, Sun, Flame } from 'lucide-react';

interface ConversionResult {
  celsius: number;
  fahrenheit: number;
  kelvin: number;
}

function App() {
  const [temperature, setTemperature] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<'celsius' | 'fahrenheit' | 'kelvin'>('celsius');
  const [result, setResult] = useState<ConversionResult | null>(null);

  const convertTemperature = (value: number, from: string): ConversionResult => {
    let celsius: number;
    
    // Convert to Celsius first
    switch (from) {
      case 'celsius':
        celsius = value;
        break;
      case 'fahrenheit':
        celsius = (value - 32) * 5 / 9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      default:
        celsius = value;
    }

    // Convert from Celsius to other units
    const fahrenheit = (celsius * 9 / 5) + 32;
    const kelvin = celsius + 273.15;

    return {
      celsius: Math.round(celsius * 100) / 100,
      fahrenheit: Math.round(fahrenheit * 100) / 100,
      kelvin: Math.round(kelvin * 100) / 100
    };
  };

  useEffect(() => {
    const numValue = parseFloat(temperature);
    if (!isNaN(numValue) && temperature.trim() !== '') {
      setResult(convertTemperature(numValue, fromUnit));
    } else {
      setResult(null);
    }
  }, [temperature, fromUnit]);

  const getTemperatureColor = (temp: number, unit: string) => {
    let celsiusTemp = temp;
    if (unit === 'fahrenheit') {
      celsiusTemp = (temp - 32) * 5 / 9;
    } else if (unit === 'kelvin') {
      celsiusTemp = temp - 273.15;
    }

    if (celsiusTemp < 0) return 'text-blue-600';
    if (celsiusTemp < 20) return 'text-cyan-600';
    if (celsiusTemp < 35) return 'text-orange-600';
    return 'text-red-600';
  };

  const getTemperatureIcon = (temp: number, unit: string) => {
    let celsiusTemp = temp;
    if (unit === 'fahrenheit') {
      celsiusTemp = (temp - 32) * 5 / 9;
    } else if (unit === 'kelvin') {
      celsiusTemp = temp - 273.15;
    }

    if (celsiusTemp < 0) return <Snowflake className="w-5 h-5" />;
    if (celsiusTemp < 20) return <Thermometer className="w-5 h-5" />;
    if (celsiusTemp < 35) return <Sun className="w-5 h-5" />;
    return <Flame className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full">
              <Thermometer className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
              Temperature Converter
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Convert between Celsius, Fahrenheit, and Kelvin instantly
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Temperature Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter Temperature
              </label>
              <input
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                placeholder="Enter temperature value"
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
              />
            </div>

            {/* Unit Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Original Unit
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'celsius', label: '°C', name: 'Celsius' },
                  { value: 'fahrenheit', label: '°F', name: 'Fahrenheit' },
                  { value: 'kelvin', label: 'K', name: 'Kelvin' }
                ].map((unit) => (
                  <button
                    key={unit.value}
                    onClick={() => setFromUnit(unit.value as any)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      fromUnit === unit.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-lg font-bold">{unit.label}</div>
                    <div className="text-xs text-gray-600">{unit.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <h2 className="text-2xl font-bold text-gray-800">Conversion Results</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Celsius */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className={`flex items-center gap-2 ${getTemperatureColor(result.celsius, 'celsius')}`}>
                    {getTemperatureIcon(result.celsius, 'celsius')}
                    <span className="font-semibold">Celsius</span>
                  </div>
                  <span className="text-sm text-gray-500">°C</span>
                </div>
                <div className={`text-3xl font-bold ${getTemperatureColor(result.celsius, 'celsius')}`}>
                  {result.celsius}°
                </div>
              </div>

              {/* Fahrenheit */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className={`flex items-center gap-2 ${getTemperatureColor(result.fahrenheit, 'fahrenheit')}`}>
                    {getTemperatureIcon(result.fahrenheit, 'fahrenheit')}
                    <span className="font-semibold">Fahrenheit</span>
                  </div>
                  <span className="text-sm text-gray-500">°F</span>
                </div>
                <div className={`text-3xl font-bold ${getTemperatureColor(result.fahrenheit, 'fahrenheit')}`}>
                  {result.fahrenheit}°
                </div>
              </div>

              {/* Kelvin */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className={`flex items-center gap-2 ${getTemperatureColor(result.kelvin, 'kelvin')}`}>
                    {getTemperatureIcon(result.kelvin, 'kelvin')}
                    <span className="font-semibold">Kelvin</span>
                  </div>
                  <span className="text-sm text-gray-500">K</span>
                </div>
                <div className={`text-3xl font-bold ${getTemperatureColor(result.kelvin, 'kelvin')}`}>
                  {result.kelvin}
                </div>
              </div>
            </div>

            {/* Temperature Scale Info */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Temperature Scale References</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="font-semibold text-blue-800">Celsius</div>
                  <div className="text-blue-600">Water freezes at 0°C</div>
                  <div className="text-blue-600">Water boils at 100°C</div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="font-semibold text-orange-800">Fahrenheit</div>
                  <div className="text-orange-600">Water freezes at 32°F</div>
                  <div className="text-orange-600">Water boils at 212°F</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="font-semibold text-purple-800">Kelvin</div>
                  <div className="text-purple-600">Absolute zero at 0K</div>
                  <div className="text-purple-600">Water freezes at 273.15K</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!result && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Use</h2>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                <div>Enter a temperature value in the input field</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                <div>Select the original unit of measurement (°C, °F, or K)</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                <div>View the instant conversion to all three temperature scales</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;