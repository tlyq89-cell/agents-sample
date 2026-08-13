import React from 'react';
import { Asset } from '../types';

interface IndicesSectionProps {
  indices: Asset[];
  onSelectAsset: (asset: Asset) => void;
}

export const IndicesSection: React.FC<IndicesSectionProps> = ({
  indices,
  onSelectAsset,
}) => {
  return (
    <section className="flex flex-col gap-6">
      <div
        onClick={() => onSelectAsset(indices[0])}
        className="flex items-center gap-1 group cursor-pointer w-fit select-none"
      >
        <h2 className="font-hanken text-[24px] font-semibold text-[#181c21] tracking-tight">
          Indices
        </h2>
        <span className="material-symbols-outlined text-[#181c21] group-hover:translate-x-1 transition-transform">
          chevron_right
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {indices.map((indexAsset) => {
          const isPositive = indexAsset.changePercent >= 0;
          return (
            <div
              key={indexAsset.id}
              onClick={() => onSelectAsset(indexAsset)}
              className="bg-[#f1f4fb] rounded-xl p-6 border border-[#E0E3EB] flex items-center justify-between hover:shadow-md transition-all cursor-pointer group hover:border-[#0049db]"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full ${
                    indexAsset.badgeColor || 'bg-[#0049db]'
                  } text-white flex items-center justify-center font-mono-code text-[13px] font-bold shadow-sm`}
                >
                  {indexAsset.badgeText || indexAsset.symbol}
                </div>
                <div className="flex flex-col">
                  <span className="font-mono-code text-[13px] text-[#181c21] font-semibold group-hover:text-[#0049db] transition-colors">
                    {indexAsset.name}
                  </span>
                  <span className="text-[12px] text-[#6A6D78] font-inter">
                    {indexAsset.symbol}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span
                  className={`font-mono-code text-[13px] font-semibold ${
                    isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {indexAsset.changePercent.toFixed(2)}%
                </span>
                {/* SVG Sparkline Chart */}
                <div className={`w-16 h-8 ${isPositive ? 'text-[#089981]' : 'text-[#F23645]'}`}>
                  <svg
                    className="w-full h-full stroke-current fill-none"
                    viewBox="0 0 100 30"
                    preserveAspectRatio="none"
                  >
                    <path
                      d={
                        isPositive
                          ? 'M0,25 Q10,15 20,20 T40,10 T60,15 T80,5 T100,0'
                          : 'M0,0 Q20,10 40,5 T70,25 T100,30'
                      }
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
