import React, { useState } from 'react';
import { RegionFilter } from '../types';

interface HeroSectionProps {
  activeRegion: RegionFilter;
  onSelectRegion: (region: RegionFilter) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeRegion,
  onSelectRegion,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const regions: RegionFilter[] = ['US', 'Global', 'Europe', 'Asia', 'Crypto', 'Futures'];

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-10 md:py-16 flex flex-col items-center justify-center text-center">
      <div className="relative inline-block">
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="inline-flex items-center gap-2 cursor-pointer group select-none py-1 px-3 rounded-lg hover:bg-[#f1f4fb] transition-colors"
        >
          <h1 className="font-hanken text-[24px] md:text-[32px] font-bold text-[#181c21] tracking-tight">
            Markets, everywhere
            {activeRegion !== 'US' && (
              <span className="text-[#0049db] font-mono-code text-[18px] ml-2 font-semibold">
                ({activeRegion})
              </span>
            )}
          </h1>
          <span
            className={`material-symbols-outlined text-[32px] text-[#181c21] group-hover:text-[#0049db] transition-transform duration-200 ${
              isDropdownOpen ? 'rotate-180 text-[#0049db]' : ''
            }`}
          >
            expand_more
          </span>
        </div>

        {/* Region / Category Filter Dropdown */}
        {isDropdownOpen && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white border border-[#E0E3EB] rounded-xl shadow-xl p-2 z-40 text-left">
            <div className="px-3 py-1.5 text-[11px] font-mono-code text-[#6A6D78] uppercase font-semibold">
              Select Market Overview
            </div>
            <div className="space-y-1">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => {
                    onSelectRegion(region);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-mono-code flex items-center justify-between transition-colors ${
                    activeRegion === region
                      ? 'bg-[#0049db] text-white font-bold'
                      : 'hover:bg-[#f1f4fb] text-[#181c21]'
                  }`}
                >
                  <span>{region} Markets</span>
                  {activeRegion === region && (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="text-[14px] text-[#6A6D78] max-w-lg mt-2 font-inter">
        Real-time equities, global indices, digital assets, and commodities terminal.
      </p>
    </section>
  );
};
