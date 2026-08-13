import React from 'react';
import { ProductItem } from '../types';

interface ProductsViewProps {
  products: ProductItem[];
}

export const ProductsView: React.FC<ProductsViewProps> = ({ products }) => {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-10 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="font-hanken text-[32px] font-bold text-[#181c21]">
          FINCORE Professional Products
        </h1>
        <p className="text-[14px] text-[#6A6D78] font-inter">
          Modular market data solutions, institutional terminals, and algorithmic backtesting suites.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((prod) => (
          <div
            key={prod.id}
            className="bg-white border border-[#E0E3EB] rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-[#0049db] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#f1f4fb] text-[#0049db] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[28px]">{prod.icon}</span>
                </div>
                {prod.badge && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase bg-[#dce1ff] text-[#003ab3]">
                    {prod.badge}
                  </span>
                )}
              </div>

              <h3 className="font-hanken text-[20px] font-bold text-[#181c21] mb-1">
                {prod.title}
              </h3>
              <div className="font-mono-code text-[12px] text-[#0049db] font-semibold mb-3">
                {prod.tagline}
              </div>
              <p className="text-[13px] text-[#6A6D78] font-inter mb-6 leading-relaxed">
                {prod.description}
              </p>

              <div className="space-y-2 mb-6">
                <div className="text-[11px] font-mono-code font-bold text-[#181c21] uppercase">
                  Capabilities
                </div>
                <ul className="space-y-1.5 text-[12px] font-inter text-[#434656]">
                  {prod.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#089981] text-[16px]">
                        check_circle
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => alert(`Subscribed to ${prod.title} sandbox tier.`)}
              className="w-full py-2.5 bg-[#0049db] hover:bg-[#2962ff] text-white font-mono-code text-[13px] font-medium rounded-lg transition-colors"
            >
              Request Access
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
