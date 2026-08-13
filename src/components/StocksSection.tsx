import React, { useState } from 'react';
import { Asset } from '../types';

interface StocksSectionProps {
  stocks: Asset[];
  onSelectAsset: (asset: Asset) => void;
}

export const StocksSection: React.FC<StocksSectionProps> = ({
  stocks,
  onSelectAsset,
}) => {
  const [showAllDrawer, setShowAllDrawer] = useState(false);

  const displayedStocks = stocks.slice(0, 5);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div
          onClick={() => setShowAllDrawer(true)}
          className="flex items-center gap-1 group cursor-pointer w-fit select-none"
        >
          <h2 className="font-hanken text-[24px] font-semibold text-[#181c21] tracking-tight">
            US stocks
          </h2>
          <span className="material-symbols-outlined text-[#181c21] group-hover:translate-x-1 transition-transform">
            chevron_right
          </span>
        </div>
        <button
          onClick={() => setShowAllDrawer(true)}
          className="px-4 py-2 text-[13px] font-mono-code text-[#0049db] hover:bg-[#dce1ff] rounded transition-colors hidden sm:block font-medium"
        >
          See all US stocks
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {displayedStocks.map((stock) => {
          const isPositive = stock.changePercent >= 0;
          return (
            <div
              key={stock.id}
              onClick={() => onSelectAsset(stock)}
              className="bg-white rounded-lg p-4 border border-[#E0E3EB] hover:border-[#0049db] transition-colors cursor-pointer group shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono-code text-[13px] font-bold text-[#181c21]">
                    {stock.symbol}
                  </span>
                  <span
                    className={`material-symbols-outlined text-[16px] group-hover:text-[#0049db] ${
                      isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {isPositive ? 'trending_up' : 'trending_down'}
                  </span>
                </div>
                <div className="text-[12px] text-[#6A6D78] truncate mb-3 font-inter">
                  {stock.name}
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono-code text-[13px] font-semibold text-[#181c21]">
                  {stock.price.toFixed(2)}
                </span>
                <span
                  className={`font-mono-code text-[11px] font-medium ${
                    isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {stock.changePercent.toFixed(1)}%
                </span>
              </div>
            </div>
          );
        })}

        {/* View More Card */}
        <div
          onClick={() => setShowAllDrawer(true)}
          className="bg-white rounded-lg p-4 border border-[#E0E3EB] hover:border-[#0049db] transition-colors cursor-pointer group flex flex-col justify-center items-center h-full min-h-[100px] shadow-2xs"
        >
          <span className="material-symbols-outlined text-[#6A6D78] group-hover:text-[#0049db] mb-1 transition-colors">
            arrow_forward
          </span>
          <span className="font-mono-code text-[11px] text-[#6A6D78] group-hover:text-[#0049db] transition-colors font-medium">
            View More
          </span>
        </div>
      </div>

      {/* All US Stocks Drawer / Modal */}
      {showAllDrawer && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E0E3EB]">
                <div>
                  <h3 className="font-hanken text-[20px] font-bold text-[#181c21]">
                    All US Stocks
                  </h3>
                  <p className="text-[12px] text-[#6A6D78]">
                    Real-time market depth & trading metrics
                  </p>
                </div>
                <button
                  onClick={() => setShowAllDrawer(false)}
                  className="p-1 rounded text-[#6A6D78] hover:text-[#181c21] hover:bg-[#f1f4fb]"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="divide-y divide-[#E0E3EB] mt-4">
                {stocks.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      onSelectAsset(s);
                      setShowAllDrawer(false);
                    }}
                    className="py-3 px-2 hover:bg-[#f1f4fb] rounded-lg cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div>
                      <div className="font-mono-code font-bold text-[14px] text-[#181c21]">
                        {s.symbol}
                      </div>
                      <div className="text-[12px] text-[#6A6D78]">{s.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono-code text-[13px] font-semibold text-[#181c21]">
                        ${s.price.toFixed(2)}
                      </div>
                      <div
                        className={`font-mono-code text-[11px] ${
                          s.changePercent >= 0 ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {s.changePercent >= 0 ? '+' : ''}
                        {s.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E0E3EB] text-center">
              <button
                onClick={() => setShowAllDrawer(false)}
                className="w-full py-2 bg-[#f1f4fb] text-[#181c21] font-mono-code text-[12px] rounded hover:bg-[#dfe2f2]"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
