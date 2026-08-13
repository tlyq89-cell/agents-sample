import React from 'react';
import { Asset } from '../types';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlistAssets: Asset[];
  onSelectAsset: (asset: Asset) => void;
  onRemoveFromWatchlist: (assetId: string) => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlistAssets,
  onSelectAsset,
  onRemoveFromWatchlist,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#E0E3EB]">
            <div>
              <h2 className="font-hanken text-[20px] font-bold text-[#181c21] flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-500 text-[22px]">star</span>
                Saved Watchlist ({watchlistAssets.length})
              </h2>
              <p className="text-[12px] text-[#6A6D78]">
                Monitored tickers & custom price alerts
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded text-[#6A6D78] hover:text-[#181c21] hover:bg-[#f1f4fb]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="divide-y divide-[#E0E3EB] mt-4">
            {watchlistAssets.length > 0 ? (
              watchlistAssets.map((asset) => {
                const isPositive = asset.changePercent >= 0;
                return (
                  <div
                    key={asset.id}
                    className="py-3 px-2 hover:bg-[#f1f4fb] rounded-lg flex items-center justify-between group transition-colors"
                  >
                    <div
                      onClick={() => {
                        onSelectAsset(asset);
                        onClose();
                      }}
                      className="cursor-pointer flex-1"
                    >
                      <div className="font-mono-code font-bold text-[14px] text-[#181c21]">
                        {asset.symbol}
                      </div>
                      <div className="text-[12px] text-[#6A6D78] truncate max-w-[180px]">
                        {asset.name}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-mono-code text-[13px] font-semibold text-[#181c21]">
                          ${asset.price.toFixed(2)}
                        </div>
                        <div
                          className={`font-mono-code text-[11px] ${
                            isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                          }`}
                        >
                          {isPositive ? '+' : ''}
                          {asset.changePercent.toFixed(2)}%
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveFromWatchlist(asset.id)}
                        title="Remove from watchlist"
                        className="text-[#6A6D78] hover:text-[#F23645] p-1 rounded transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center text-[13px] text-[#6A6D78] space-y-2">
                <span className="material-symbols-outlined text-[36px] text-gray-300">
                  grade
                </span>
                <p>Your watchlist is empty.</p>
                <p className="text-[11px]">Star any asset from the terminal to track it here.</p>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-[#E0E3EB]">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#f1f4fb] text-[#181c21] font-mono-code text-[12px] font-bold rounded-lg hover:bg-[#dfe2f2]"
          >
            Close Watchlist
          </button>
        </div>
      </div>
    </div>
  );
};
