import React, { useState, useEffect } from 'react';
import { Asset, AIAnalysis } from '../types';

interface AssetDetailModalProps {
  asset: Asset | null;
  onClose: () => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (assetId: string) => void;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  asset,
  onClose,
  isWatchlisted,
  onToggleWatchlist,
}) => {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y' | 'ALL'>('1D');
  const [simShares, setSimShares] = useState<number>(10);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [loadingAi, setLoadingAi] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    if (asset) {
      fetchAiAnalysis(asset);
    } else {
      setAiAnalysis(null);
    }
  }, [asset?.id]);

  const fetchAiAnalysis = async (currentAsset: Asset) => {
    setLoadingAi(true);
    setAiError(null);
    try {
      const res = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: currentAsset.symbol,
          name: currentAsset.name,
          category: currentAsset.category,
          price: currentAsset.price,
          changePercent: currentAsset.changePercent,
        }),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setAiAnalysis(data);
    } catch (err: unknown) {
      console.error('Failed to fetch AI analysis:', err);
      setAiError('Temporary AI connection issue. Showing default metrics.');
    } finally {
      setLoadingAi(false);
    }
  };

  if (!asset) return null;

  const isPositive = asset.changePercent >= 0;

  // Generate dynamic chart path points based on timeframe multiplier
  const baseChart = asset.chartData || [100, 102, 101, 104, 103, 106];
  const chartPoints = baseChart.map((val, idx) => {
    const mult =
      timeframe === '1W'
        ? 1.02
        : timeframe === '1M'
        ? 1.05
        : timeframe === '1Y'
        ? 1.15
        : timeframe === 'ALL'
        ? 1.3
        : 1;
    return val * (1 + (idx % 2 === 0 ? 0.005 : -0.003) * mult);
  });

  const maxVal = Math.max(...chartPoints);
  const minVal = Math.min(...chartPoints);
  const range = maxVal - minVal || 1;

  const svgPoints = chartPoints
    .map((val, idx) => {
      const x = (idx / (chartPoints.length - 1)) * 300;
      const y = 100 - ((val - minVal) / range) * 80 - 10;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-[#E0E3EB] rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in duration-200">
        {/* Header Bar */}
        <div className="bg-[#f1f4fb] px-6 py-4 border-b border-[#E0E3EB] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0049db] text-white flex items-center justify-center font-mono-code font-bold text-[14px]">
              {asset.badgeText || asset.symbol.substring(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-mono-code text-[18px] font-bold text-[#181c21]">
                  {asset.symbol}
                </h2>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#dfe2f2] text-[#434656] uppercase">
                  {asset.category}
                </span>
              </div>
              <p className="text-[13px] text-[#6A6D78] font-inter">{asset.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleWatchlist(asset.id)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12px] font-mono-code border transition-colors ${
                isWatchlisted
                  ? 'bg-amber-50 text-amber-600 border-amber-300'
                  : 'bg-white text-[#434656] border-[#E0E3EB] hover:bg-[#f1f4fb]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {isWatchlisted ? 'star' : 'star_outline'}
              </span>
              <span>{isWatchlisted ? 'Watchlisted' : 'Add Watchlist'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#6A6D78] hover:text-[#181c21] hover:bg-gray-200"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Price & Change Banner */}
          <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b border-[#E0E3EB]">
            <div>
              <div className="font-mono-code text-[32px] font-bold text-[#181c21]">
                {asset.category === 'crypto' || asset.category === 'stock' ? '$' : ''}
                {asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                {asset.unit ? ` ${asset.unit}` : ''}
              </div>
              <div
                className={`font-mono-code text-[14px] font-semibold flex items-center gap-1 ${
                  isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isPositive ? 'trending_up' : 'trending_down'}
                </span>
                <span>
                  {isPositive ? '+' : ''}
                  {asset.changePercent.toFixed(2)}%
                </span>
                {asset.changeAmount !== undefined && (
                  <span>
                    ({isPositive ? '+' : ''}
                    {asset.changeAmount.toFixed(2)})
                  </span>
                )}
                <span className="text-[12px] text-[#6A6D78] ml-2 font-normal">Today</span>
              </div>
            </div>

            {/* Timeframe Selectors */}
            <div className="flex bg-[#f1f4fb] p-1 rounded-lg border border-[#E0E3EB]">
              {(['1D', '1W', '1M', '1Y', 'ALL'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 text-[12px] font-mono-code rounded font-medium transition-colors ${
                    timeframe === tf
                      ? 'bg-[#0049db] text-white shadow-xs'
                      : 'text-[#434656] hover:text-[#181c21]'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Chart */}
          <div className="bg-[#f7f9ff] p-4 rounded-xl border border-[#E0E3EB] relative">
            <div className="flex justify-between text-[11px] font-mono-code text-[#6A6D78] mb-2">
              <span>Low: {minVal.toFixed(2)}</span>
              <span>High: {maxVal.toFixed(2)}</span>
            </div>

            <div className="h-44 w-full">
              <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={isPositive ? '#089981' : '#F23645'}
                      stopOpacity="0.25"
                    />
                    <stop
                      offset="100%"
                      stopColor={isPositive ? '#089981' : '#F23645'}
                      stopOpacity="0.0"
                    />
                  </linearGradient>
                </defs>
                <polygon
                  points={`0,100 ${svgPoints} 300,100`}
                  fill="url(#chartGradient)"
                />
                <polyline
                  fill="none"
                  stroke={isPositive ? '#089981' : '#F23645'}
                  strokeWidth="2.5"
                  points={svgPoints}
                />
              </svg>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[12px] font-mono-code">
            <div className="bg-[#f1f4fb] p-3 rounded-lg border border-[#E0E3EB]">
              <div className="text-[#6A6D78] text-[10px] uppercase">Open</div>
              <div className="text-[#181c21] font-bold text-[14px]">
                {asset.openPrice ? `$${asset.openPrice.toFixed(2)}` : '-'}
              </div>
            </div>
            <div className="bg-[#f1f4fb] p-3 rounded-lg border border-[#E0E3EB]">
              <div className="text-[#6A6D78] text-[10px] uppercase">Volume</div>
              <div className="text-[#181c21] font-bold text-[14px]">{asset.volume || '-'}</div>
            </div>
            <div className="bg-[#f1f4fb] p-3 rounded-lg border border-[#E0E3EB]">
              <div className="text-[#6A6D78] text-[10px] uppercase">Market Cap</div>
              <div className="text-[#181c21] font-bold text-[14px]">
                {asset.marketCap || '-'}
              </div>
            </div>
            <div className="bg-[#f1f4fb] p-3 rounded-lg border border-[#E0E3EB]">
              <div className="text-[#6A6D78] text-[10px] uppercase">52W Range</div>
              <div className="text-[#181c21] font-bold text-[13px]">
                {asset.low52 ? `$${asset.low52} - $${asset.high52}` : '-'}
              </div>
            </div>
          </div>

          {/* Gemini AI Market Insight Block */}
          <div className="bg-gradient-to-r from-[#f1f4fb] to-[#dce1ff]/30 p-5 rounded-xl border border-[#0049db]/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0049db]">auto_awesome</span>
                <span className="font-hanken font-bold text-[15px] text-[#181c21]">
                  FINCORE AI Institutional Analysis
                </span>
              </div>
              <button
                onClick={() => fetchAiAnalysis(asset)}
                disabled={loadingAi}
                className="text-[11px] font-mono-code text-[#0049db] hover:underline flex items-center gap-1"
              >
                <span className={`material-symbols-outlined text-[14px] ${loadingAi ? 'animate-spin' : ''}`}>
                  refresh
                </span>
                Re-Analyze
              </button>
            </div>

            {loadingAi ? (
              <div className="py-6 flex items-center justify-center gap-3 text-[13px] text-[#0049db] font-mono-code">
                <span className="material-symbols-outlined animate-spin text-[20px]">
                  progress_activity
                </span>
                Evaluating market orderbook and sentiment vectors...
              </div>
            ) : aiAnalysis ? (
              <div className="space-y-3 text-[13px] text-[#181c21]">
                <p className="font-inter leading-relaxed">{aiAnalysis.summary}</p>
                <div className="flex flex-wrap items-center gap-4 text-[12px] font-mono-code pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#6A6D78]">Sentiment:</span>
                    <span
                      className={`px-2 py-0.5 rounded font-bold ${
                        aiAnalysis.sentiment === 'Bullish'
                          ? 'bg-[#089981]/15 text-[#089981]'
                          : aiAnalysis.sentiment === 'Bearish'
                          ? 'bg-[#F23645]/15 text-[#F23645]'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {aiAnalysis.sentiment}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#6A6D78]">AI Confidence Score:</span>
                    <span className="font-bold text-[#0049db]">{aiAnalysis.score}/100</span>
                  </div>
                </div>

                {aiAnalysis.keyDrivers && aiAnalysis.keyDrivers.length > 0 && (
                  <div className="pt-2">
                    <div className="text-[11px] font-mono-code text-[#6A6D78] uppercase font-bold mb-1">
                      Key Catalysts:
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-[12px] font-inter text-[#434656]">
                      {aiAnalysis.keyDrivers.map((driver, idx) => (
                        <li key={idx}>{driver}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="text-[12px] text-[#434656] pt-1 font-inter italic border-t border-[#E0E3EB]/60">
                  <strong className="font-mono-code font-semibold not-italic">Technical Outlook:</strong>{' '}
                  {aiAnalysis.technicalOutlook}
                </div>
              </div>
            ) : aiError ? (
              <div className="text-[12px] text-[#F23645] font-mono-code py-2">{aiError}</div>
            ) : null}
          </div>

          {/* Paper Trading Execution Simulator */}
          <div className="bg-[#f1f4fb] p-4 rounded-xl border border-[#E0E3EB] flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-mono-code font-bold text-[13px] text-[#181c21]">
                Paper Trading Terminal
              </div>
              <div className="text-[12px] text-[#6A6D78]">
                Simulated execution without capital risk
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white border border-[#E0E3EB] rounded px-2 py-1">
                <span className="text-[11px] font-mono-code text-[#6A6D78] mr-2">Qty:</span>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={simShares}
                  onChange={(e) => setSimShares(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 font-mono-code text-[12px] outline-none text-right font-bold"
                />
              </div>
              <button
                onClick={() =>
                  alert(
                    `Simulated Order Executed: Purchased ${simShares} units of ${asset.symbol} for $${(
                      simShares * asset.price
                    ).toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                  )
                }
                className="px-4 py-2 bg-[#089981] hover:bg-[#089981]/90 text-white font-mono-code text-[12px] font-bold rounded transition-colors"
              >
                Simulate Buy (${(simShares * asset.price).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
