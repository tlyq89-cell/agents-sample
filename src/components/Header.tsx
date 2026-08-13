import React, { useState, useRef, useEffect } from 'react';
import { NavTab, Asset } from '../types';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  allAssets: Asset[];
  onSelectAsset: (asset: Asset) => void;
  onOpenGetStarted: () => void;
  isLiveUpdating: boolean;
  onToggleLiveUpdate: () => void;
  watchlistCount: number;
  onOpenWatchlist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  allAssets,
  onSelectAsset,
  onOpenGetStarted,
  isLiveUpdating,
  onToggleLiveUpdate,
  watchlistCount,
  onOpenWatchlist
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredAssets = searchQuery.trim()
    ? allAssets.filter(
        (a) =>
          a.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#f7f9ff]/90 backdrop-blur-md border-b border-[#E0E3EB]">
      <div className="h-16 w-full px-4 md:px-8 flex items-center justify-between gap-4 max-w-[1440px] mx-auto">
        {/* Left: Brand & Search */}
        <div className="flex items-center gap-6">
          <div
            onClick={() => onSelectTab('markets')}
            className="flex items-center gap-2 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 bg-[#0049db] rounded flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-white text-[20px]">query_stats</span>
            </div>
            <span className="font-hanken text-[18px] font-bold tracking-tight text-[#181c21]">
              FINCORE
            </span>
          </div>

          {/* Search bar */}
          <div ref={searchRef} className="relative hidden lg:block">
            <div className="flex items-center bg-[#f1f4fb] px-3 py-1.5 rounded border border-[#E0E3EB] gap-2 w-64 focus-within:w-80 focus-within:border-[#0049db] focus-within:bg-white transition-all duration-200">
              <span className="material-symbols-outlined text-[#434656] text-[18px]">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search markets (e.g. AAPL, BTC)..."
                className="bg-transparent border-none outline-none text-[12px] w-full text-[#181c21] placeholder:text-[#6A6D78] font-inter"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-[#6A6D78] hover:text-[#181c21] text-[14px]"
                >
                  ×
                </button>
              )}
            </div>

            {/* Live Search Results Dropdown */}
            {isSearchFocused && searchQuery.trim() !== '' && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-[#E0E3EB] rounded-lg shadow-xl overflow-hidden z-50">
                <div className="px-3 py-2 bg-[#f1f4fb] border-b border-[#E0E3EB] text-[11px] font-mono-code font-medium text-[#6A6D78] uppercase">
                  Market Search Results ({filteredAssets.length})
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {filteredAssets.length > 0 ? (
                    filteredAssets.map((asset) => (
                      <div
                        key={asset.id}
                        onClick={() => {
                          onSelectAsset(asset);
                          setIsSearchFocused(false);
                          setSearchQuery('');
                        }}
                        className="px-4 py-2.5 hover:bg-[#f1f4fb] cursor-pointer flex items-center justify-between border-b border-[#E0E3EB]/50 last:border-none transition-colors"
                      >
                        <div>
                          <div className="font-mono-code text-[13px] font-bold text-[#181c21]">
                            {asset.symbol}
                          </div>
                          <div className="text-[11px] text-[#6A6D78] truncate max-w-[150px]">
                            {asset.name}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono-code text-[12px] font-semibold text-[#181c21]">
                            {asset.category === 'crypto' || asset.category === 'stock'
                              ? `$${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                              : asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </div>
                          <div
                            className={`font-mono-code text-[11px] ${
                              asset.changePercent >= 0 ? 'text-[#089981]' : 'text-[#F23645]'
                            }`}
                          >
                            {asset.changePercent >= 0 ? '+' : ''}
                            {asset.changePercent.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-[13px] text-[#6A6D78]">
                      No markets found matching "{searchQuery}"
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center self-stretch gap-6">
          <button
            onClick={() => onSelectTab('markets')}
            className={`flex items-center h-full px-1 text-[13px] font-mono-code font-medium transition-colors border-b-2 ${
              activeTab === 'markets'
                ? 'text-[#0049db] border-[#0049db]'
                : 'text-[#434656] border-transparent hover:text-[#0049db]'
            }`}
          >
            Markets
          </button>
          <button
            onClick={() => onSelectTab('products')}
            className={`flex items-center h-full px-1 text-[13px] font-mono-code font-medium transition-colors border-b-2 ${
              activeTab === 'products'
                ? 'text-[#0049db] border-[#0049db]'
                : 'text-[#434656] border-transparent hover:text-[#0049db]'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => onSelectTab('community')}
            className={`flex items-center h-full px-1 text-[13px] font-mono-code font-medium transition-colors border-b-2 ${
              activeTab === 'community'
                ? 'text-[#0049db] border-[#0049db]'
                : 'text-[#434656] border-transparent hover:text-[#0049db]'
            }`}
          >
            Community
          </button>
          <button
            onClick={() => onSelectTab('brokers')}
            className={`flex items-center h-full px-1 text-[13px] font-mono-code font-medium transition-colors border-b-2 ${
              activeTab === 'brokers'
                ? 'text-[#0049db] border-[#0049db]'
                : 'text-[#434656] border-transparent hover:text-[#0049db]'
            }`}
          >
            Brokers
          </button>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Live Stream Toggle Badge */}
          <button
            onClick={onToggleLiveUpdate}
            title="Toggle Live Real-Time Ticker Stream"
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono-code border transition-colors ${
              isLiveUpdating
                ? 'bg-[#089981]/10 text-[#089981] border-[#089981]/30'
                : 'bg-[#f1f4fb] text-[#6A6D78] border-[#E0E3EB]'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isLiveUpdating ? 'bg-[#089981] animate-pulse' : 'bg-gray-400'
              }`}
            />
            {isLiveUpdating ? 'LIVE' : 'PAUSED'}
          </button>

          {/* Watchlist Quick Access */}
          <button
            onClick={onOpenWatchlist}
            className="relative p-1.5 text-[#434656] hover:text-[#0049db] hover:bg-[#f1f4fb] rounded transition-colors"
            title="Watchlist"
          >
            <span className="material-symbols-outlined text-[20px]">star</span>
            {watchlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#0049db] text-white text-[9px] font-mono-code font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Get Started Button */}
          <button
            onClick={onOpenGetStarted}
            className="hidden sm:block px-4 py-2 bg-[#0049db] text-white text-[13px] font-mono-code font-medium rounded hover:bg-[#2962ff] transition-colors shadow-sm"
          >
            Get Started
          </button>

          <div className="w-px h-6 bg-[#E0E3EB] mx-1"></div>

          {/* Notifications & Profile Menu */}
          <div className="flex items-center gap-2 relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1.5 text-[#434656] hover:text-[#0049db] hover:bg-[#f1f4fb] rounded transition-colors relative"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#F23645] rounded-full" />
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-[#E0E3EB] rounded-lg shadow-xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-[#E0E3EB]">
                  <span className="text-[12px] font-mono-code font-bold text-[#181c21]">
                    Market Alerts
                  </span>
                  <span className="text-[10px] text-[#0049db] cursor-pointer">Mark read</span>
                </div>
                <div className="py-2 space-y-2 text-[12px]">
                  <div className="p-2 bg-[#f1f4fb] rounded border border-[#E0E3EB]/50">
                    <span className="font-mono-code font-bold text-[#089981]">SPX Breakout:</span>{' '}
                    S&P 500 reached 5,567.80 (+1.24%)
                  </div>
                  <div className="p-2 bg-[#f1f4fb] rounded border border-[#E0E3EB]/50">
                    <span className="font-mono-code font-bold text-[#0049db]">BTCUSD Alert:</span>{' '}
                    Bitcoin broke past $64,000 resistance.
                  </div>
                </div>
              </div>
            )}

            {/* Profile Avatar */}
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-8 h-8 rounded-full bg-[#0049db] text-white flex items-center justify-center hover:ring-2 hover:ring-[#0049db]/30 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>

            {showProfileMenu && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-[#E0E3EB] rounded-lg shadow-xl p-2 z-50">
                <div className="px-3 py-2 border-b border-[#E0E3EB]">
                  <div className="font-mono-code text-[12px] font-bold text-[#181c21]">
                    Professional Trader
                  </div>
                  <div className="text-[11px] text-[#6A6D78]">fincore.trader@terminal.io</div>
                </div>
                <div className="py-1 text-[12px] font-inter">
                  <button
                    onClick={() => {
                      onOpenGetStarted();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#f1f4fb] rounded text-[#181c21]"
                  >
                    Terminal Settings
                  </button>
                  <button
                    onClick={() => {
                      onOpenWatchlist();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#f1f4fb] rounded text-[#181c21]"
                  >
                    My Watchlist ({watchlistCount})
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
