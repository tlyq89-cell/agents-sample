import { useState, useEffect } from 'react';
import { NavTab, RegionFilter, Asset } from './types';
import {
  INITIAL_INDICES,
  INITIAL_STOCKS,
  INITIAL_CRYPTO,
  INITIAL_FUTURES,
  PRODUCTS_LIST,
  BROKERS_LIST,
  COMMUNITY_POSTS,
} from './data/marketData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { IndicesSection } from './components/IndicesSection';
import { StocksSection } from './components/StocksSection';
import { CryptoFuturesSection } from './components/CryptoFuturesSection';
import { AssetDetailModal } from './components/AssetDetailModal';
import { ProductsView } from './components/ProductsView';
import { CommunityView } from './components/CommunityView';
import { BrokersView } from './components/BrokersView';
import { GetStartedModal } from './components/GetStartedModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('markets');
  const [activeRegion, setActiveRegion] = useState<RegionFilter>('US');

  const [indices, setIndices] = useState<Asset[]>(INITIAL_INDICES);
  const [stocks, setStocks] = useState<Asset[]>(INITIAL_STOCKS);
  const [crypto, setCrypto] = useState<Asset[]>(INITIAL_CRYPTO);
  const [futures, setFutures] = useState<Asset[]>(INITIAL_FUTURES);

  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [isLiveUpdating, setIsLiveUpdating] = useState(true);

  // Watchlist stored in localStorage
  const [watchlistIds, setWatchlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fincore_watchlist');
      return saved ? JSON.parse(saved) : ['spx', 'nvda', 'btcusd'];
    } catch {
      return ['spx', 'nvda', 'btcusd'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('fincore_watchlist', JSON.stringify(watchlistIds));
    } catch {
      // ignore
    }
  }, [watchlistIds]);

  const toggleWatchlist = (assetId: string) => {
    setWatchlistIds((prev) =>
      prev.includes(assetId) ? prev.filter((id) => id !== assetId) : [...prev, assetId]
    );
  };

  // Combine all assets for search & watchlist mapping
  const allAssets = [...indices, ...stocks, ...crypto, ...futures];
  const watchlistAssets = allAssets.filter((a) => watchlistIds.includes(a.id));

  // Live price fluctuation simulation ticker
  useEffect(() => {
    if (!isLiveUpdating) return;

    const interval = setInterval(() => {
      const updateList = (list: Asset[]) =>
        list.map((asset) => {
          // 40% chance to tick a price
          if (Math.random() < 0.4) {
            const deltaPercent = (Math.random() - 0.48) * 0.15; // small delta
            const newPrice = Math.max(0.01, asset.price * (1 + deltaPercent / 100));
            const newChangePercent = asset.changePercent + deltaPercent * 0.1;
            const newChart = [...asset.chartData.slice(1), newPrice];

            return {
              ...asset,
              price: parseFloat(newPrice.toFixed(2)),
              changePercent: parseFloat(newChangePercent.toFixed(2)),
              chartData: newChart,
            };
          }
          return asset;
        });

      setIndices((prev) => updateList(prev));
      setStocks((prev) => updateList(prev));
      setCrypto((prev) => updateList(prev));
      setFutures((prev) => updateList(prev));
    }, 2000);

    return () => clearInterval(interval);
  }, [isLiveUpdating]);

  return (
    <div className="min-h-screen bg-[#f7f9ff] text-[#181c21] font-inter flex flex-col justify-between">
      <div>
        {/* Header Navigation */}
        <Header
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          allAssets={allAssets}
          onSelectAsset={(asset) => setSelectedAsset(asset)}
          onOpenGetStarted={() => setIsGetStartedOpen(true)}
          isLiveUpdating={isLiveUpdating}
          onToggleLiveUpdate={() => setIsLiveUpdating(!isLiveUpdating)}
          watchlistCount={watchlistIds.length}
          onOpenWatchlist={() => setIsWatchlistOpen(true)}
        />

        {/* Main Content Area */}
        <main className="pt-16 min-h-[85vh]">
          {activeTab === 'markets' && (
            <div className="flex flex-col w-full bg-[#f7f9ff]">
              {/* Hero Section */}
              <HeroSection
                activeRegion={activeRegion}
                onSelectRegion={(region) => setActiveRegion(region)}
              />

              {/* Main Content Grid */}
              <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-24 flex flex-col gap-12 md:gap-16">
                {/* Indices Section */}
                <IndicesSection
                  indices={indices}
                  onSelectAsset={(asset) => setSelectedAsset(asset)}
                />

                {/* US Stocks Section */}
                <StocksSection
                  stocks={stocks}
                  onSelectAsset={(asset) => setSelectedAsset(asset)}
                />

                {/* Crypto & Futures Split Section */}
                <CryptoFuturesSection
                  cryptoAssets={crypto}
                  futuresAssets={futures}
                  onSelectAsset={(asset) => setSelectedAsset(asset)}
                />
              </div>
            </div>
          )}

          {activeTab === 'products' && <ProductsView products={PRODUCTS_LIST} />}

          {activeTab === 'community' && <CommunityView posts={COMMUNITY_POSTS} />}

          {activeTab === 'brokers' && <BrokersView brokers={BROKERS_LIST} />}
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#ebeef5] border-t border-[#E0E3EB] py-8 mt-auto">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-[#6A6D78]">
          <div>© 2026 FINCORE Terminal. Professional Market Data.</div>
          <div className="flex gap-6 font-mono-code">
            <button
              onClick={() => setActiveTab('markets')}
              className="text-[#434656] hover:text-[#0049db] transition-colors"
            >
              Markets
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className="text-[#434656] hover:text-[#0049db] transition-colors"
            >
              Products
            </button>
            <button
              onClick={() => alert('FINCORE Privacy Policy: All user session data is handled locally.')}
              className="text-[#434656] hover:text-[#0049db] transition-colors"
            >
              Terms & Privacy
            </button>
            <button
              onClick={() => alert('FINCORE API Documentation v2.4 initialized.')}
              className="text-[#434656] hover:text-[#0049db] transition-colors"
            >
              API Docs
            </button>
          </div>
        </div>
      </footer>

      {/* Asset Detail Modal */}
      <AssetDetailModal
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
        isWatchlisted={selectedAsset ? watchlistIds.includes(selectedAsset.id) : false}
        onToggleWatchlist={toggleWatchlist}
      />

      {/* Get Started / Terminal Setup Modal */}
      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
        isLiveUpdating={isLiveUpdating}
        onToggleLiveUpdate={() => setIsLiveUpdating(!isLiveUpdating)}
      />

      {/* Watchlist Drawer */}
      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlistAssets={watchlistAssets}
        onSelectAsset={(asset) => setSelectedAsset(asset)}
        onRemoveFromWatchlist={toggleWatchlist}
      />
    </div>
  );
}
