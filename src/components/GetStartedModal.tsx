import React, { useState } from 'react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLiveUpdating: boolean;
  onToggleLiveUpdate: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  isLiveUpdating,
  onToggleLiveUpdate,
}) => {
  const [currency, setCurrency] = useState('USD ($)');
  const [tickerSpeed, setTickerSpeed] = useState('Normal (2s)');
  const [enableSound, setEnableSound] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-[#E0E3EB] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden p-6 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E0E3EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0049db] text-white flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[24px]">tune</span>
            </div>
            <div>
              <h2 className="font-hanken text-[20px] font-bold text-[#181c21]">
                FINCORE Terminal Setup
              </h2>
              <p className="text-[12px] text-[#6A6D78]">
                Configure workspace preferences & streaming feeds
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#6A6D78] hover:text-[#181c21] hover:bg-[#f1f4fb]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-4 text-[13px] font-inter">
          {/* Base Currency */}
          <div className="space-y-1.5">
            <label className="font-mono-code text-[11px] font-bold text-[#181c21] uppercase">
              Base Quotation Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full p-2.5 bg-[#f1f4fb] border border-[#E0E3EB] rounded-lg font-mono-code text-[13px] text-[#181c21] outline-none"
            >
              <option value="USD ($)">USD ($) - United States Dollar</option>
              <option value="EUR (€)">EUR (€) - Euro</option>
              <option value="GBP (£)">GBP (£) - British Pound</option>
              <option value="JPY (¥)">JPY (¥) - Japanese Yen</option>
            </select>
          </div>

          {/* Ticker Speed */}
          <div className="space-y-1.5">
            <label className="font-mono-code text-[11px] font-bold text-[#181c21] uppercase">
              Streaming Refresh Speed
            </label>
            <select
              value={tickerSpeed}
              onChange={(e) => setTickerSpeed(e.target.value)}
              className="w-full p-2.5 bg-[#f1f4fb] border border-[#E0E3EB] rounded-lg font-mono-code text-[13px] text-[#181c21] outline-none"
            >
              <option value="Fast (1s)">Fast (1 second updates)</option>
              <option value="Normal (2s)">Normal (2 second updates)</option>
              <option value="Slow (5s)">Slow (5 second updates)</option>
            </select>
          </div>

          {/* Real-time Ticker Feed Toggle */}
          <div className="p-3 bg-[#f1f4fb] border border-[#E0E3EB] rounded-xl flex items-center justify-between">
            <div>
              <div className="font-mono-code font-bold text-[13px] text-[#181c21]">
                Real-Time Ticker Stream
              </div>
              <div className="text-[11px] text-[#6A6D78]">
                Simulate micro-tick price fluctuations
              </div>
            </div>
            <button
              onClick={onToggleLiveUpdate}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-mono-code font-bold transition-colors ${
                isLiveUpdating
                  ? 'bg-[#089981] text-white'
                  : 'bg-[#dfe2f2] text-[#434656]'
              }`}
            >
              {isLiveUpdating ? 'ACTIVE' : 'PAUSED'}
            </button>
          </div>

          {/* Audio Alerts */}
          <div className="p-3 bg-[#f1f4fb] border border-[#E0E3EB] rounded-xl flex items-center justify-between">
            <div>
              <div className="font-mono-code font-bold text-[13px] text-[#181c21]">
                Breakout Audio Alerts
              </div>
              <div className="text-[11px] text-[#6A6D78]">
                Chime on 2%+ single session movements
              </div>
            </div>
            <input
              type="checkbox"
              checked={enableSound}
              onChange={(e) => setEnableSound(e.target.checked)}
              className="w-5 h-5 accent-[#0049db] cursor-pointer"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#0049db] hover:bg-[#2962ff] text-white font-mono-code text-[13px] font-bold rounded-xl transition-colors shadow-sm"
          >
            Apply Terminal Settings
          </button>
        </div>
      </div>
    </div>
  );
};
