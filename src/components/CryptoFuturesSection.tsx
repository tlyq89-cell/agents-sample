import React from 'react';
import { Asset } from '../types';

interface CryptoFuturesSectionProps {
  cryptoAssets: Asset[];
  futuresAssets: Asset[];
  onSelectAsset: (asset: Asset) => void;
}

export const CryptoFuturesSection: React.FC<CryptoFuturesSectionProps> = ({
  cryptoAssets,
  futuresAssets,
  onSelectAsset,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
      {/* Crypto Section */}
      <section className="flex flex-col gap-6">
        <div
          onClick={() => onSelectAsset(cryptoAssets[0])}
          className="flex items-center gap-1 group cursor-pointer w-fit select-none"
        >
          <h2 className="font-hanken text-[24px] font-semibold text-[#181c21] tracking-tight">
            Crypto
          </h2>
          <span className="material-symbols-outlined text-[#181c21] group-hover:translate-x-1 transition-transform">
            chevron_right
          </span>
        </div>

        <div className="bg-white border border-[#E0E3EB] rounded-xl overflow-hidden shadow-2xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f1f4fb] border-b border-[#E0E3EB]">
                <th className="p-3 px-4 font-mono-code text-[11px] text-[#6A6D78] uppercase font-medium">
                  Asset
                </th>
                <th className="p-3 px-4 font-mono-code text-[11px] text-[#6A6D78] uppercase font-medium text-right">
                  Price
                </th>
                <th className="p-3 px-4 font-mono-code text-[11px] text-[#6A6D78] uppercase font-medium text-right hidden sm:table-cell">
                  Market Cap
                </th>
              </tr>
            </thead>
            <tbody className="font-inter text-[12px]">
              {cryptoAssets.map((crypto) => {
                const isPositive = crypto.changePercent >= 0;
                return (
                  <tr
                    key={crypto.id}
                    onClick={() => onSelectAsset(crypto)}
                    className="border-b border-[#E0E3EB] last:border-none hover:bg-[#f1f4fb] transition-colors cursor-pointer"
                  >
                    <td className="p-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#dfe2f2] text-[#171b26] flex items-center justify-center font-mono-code text-[11px] font-bold shadow-2xs">
                          {crypto.badgeText || crypto.symbol.substring(0, 1)}
                        </div>
                        <div>
                          <div className="font-mono-code font-bold text-[#181c21] text-[13px]">
                            {crypto.name}
                          </div>
                          <div className="text-[#6A6D78] text-[10px] font-mono-code uppercase">
                            {crypto.symbol}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 px-4 text-right">
                      <div className="font-mono-code text-[13px] text-[#181c21] font-semibold">
                        ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div
                        className={`font-mono-code text-[11px] ${
                          isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isPositive ? '+' : ''}
                        {crypto.changePercent.toFixed(2)}%
                      </div>
                    </td>
                    <td className="p-3 px-4 text-right hidden sm:table-cell font-mono-code text-[#434656]">
                      {crypto.marketCap || '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Futures and commodities Section */}
      <section className="flex flex-col gap-6">
        <div
          onClick={() => onSelectAsset(futuresAssets[0])}
          className="flex items-center gap-1 group cursor-pointer w-fit select-none"
        >
          <h2 className="font-hanken text-[24px] font-semibold text-[#181c21] tracking-tight">
            Futures and commodities
          </h2>
          <span className="material-symbols-outlined text-[#181c21] group-hover:translate-x-1 transition-transform">
            chevron_right
          </span>
        </div>

        <div className="bg-white border border-[#E0E3EB] rounded-xl overflow-hidden shadow-2xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f1f4fb] border-b border-[#E0E3EB]">
                <th className="p-3 px-4 font-mono-code text-[11px] text-[#6A6D78] uppercase font-medium">
                  Commodity
                </th>
                <th className="p-3 px-4 font-mono-code text-[11px] text-[#6A6D78] uppercase font-medium text-right">
                  Symbol
                </th>
                <th className="p-3 px-4 font-mono-code text-[11px] text-[#6A6D78] uppercase font-medium text-right">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="font-inter text-[12px]">
              {futuresAssets.map((future) => {
                const isPositive = future.changePercent >= 0;
                return (
                  <tr
                    key={future.id}
                    onClick={() => onSelectAsset(future)}
                    className="border-b border-[#E0E3EB] last:border-none hover:bg-[#f1f4fb] transition-colors cursor-pointer"
                  >
                    <td className="p-3 px-4 font-mono-code text-[#181c21] font-semibold text-[13px]">
                      {future.name}
                    </td>
                    <td className="p-3 px-4 text-right text-[#6A6D78] font-mono-code text-[11px]">
                      {future.symbol}
                    </td>
                    <td className="p-3 px-4 text-right">
                      <div className="font-mono-code text-[13px] text-[#181c21] font-semibold">
                        {future.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div
                        className={`font-mono-code text-[11px] ${
                          isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isPositive ? '+' : ''}
                        {future.changePercent.toFixed(1)}%
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
