import React from 'react';
import { Broker } from '../types';

interface BrokersViewProps {
  brokers: Broker[];
}

export const BrokersView: React.FC<BrokersViewProps> = ({ brokers }) => {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-10 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="font-hanken text-[32px] font-bold text-[#181c21]">
          Brokerage Directory & Execution Comparison
        </h1>
        <p className="text-[14px] text-[#6A6D78] font-inter">
          Compare execution latency, margin rates, regulatory licensing, and API access across top tier brokers.
        </p>
      </div>

      <div className="bg-white border border-[#E0E3EB] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f1f4fb] border-b border-[#E0E3EB]">
                <th className="p-4 font-mono-code text-[11px] text-[#6A6D78] uppercase font-medium">
                  Brokerage
                </th>
                <th className="p-4 font-mono-code text-[11px] text-[#6A6D78] uppercase font-medium text-center">
                  Min Deposit
                </th>
                <th className="p-4 font-mono-code text-[11px] text-[#6A6D78] uppercase font-medium text-center">
                  Avg Spread
                </th>
                <th className="p-4 font-mono-code text-[11px] text-[#6A6D78] uppercase font-medium text-center">
                  Latency
                </th>
                <th className="p-4 font-mono-code text-[11px] text-[#6A6D78] uppercase font-medium text-center">
                  Rating
                </th>
                <th className="p-4 font-mono-code text-[11px] text-[#6A6D78] uppercase font-medium text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="font-inter text-[13px]">
              {brokers.map((broker) => (
                <tr
                  key={broker.id}
                  className="border-b border-[#E0E3EB] last:border-none hover:bg-[#f7f9ff] transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl ${broker.logoBg} flex items-center justify-center font-mono-code font-bold text-[13px] shadow-2xs`}
                      >
                        {broker.logoLetter}
                      </div>
                      <div>
                        <div className="font-mono-code font-bold text-[#181c21] text-[14px] flex items-center gap-2">
                          {broker.name}
                          {broker.isPopular && (
                            <span className="bg-[#0049db] text-white text-[9px] font-mono-code font-bold px-1.5 py-0.5 rounded uppercase">
                              Top Pick
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {broker.regulatedBy.map((reg) => (
                            <span
                              key={reg}
                              className="text-[9px] font-mono-code px-1.5 py-0.2 rounded bg-[#f1f4fb] text-[#434656]"
                            >
                              {reg}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center font-mono-code text-[#181c21] font-semibold">
                    {broker.minDeposit}
                  </td>
                  <td className="p-4 text-center font-mono-code text-[#089981] font-bold">
                    {broker.avgSpread}
                  </td>
                  <td className="p-4 text-center font-mono-code text-[#434656]">
                    {broker.executionSpeed}
                  </td>
                  <td className="p-4 text-center font-mono-code font-bold text-[#181c21]">
                    ⭐ {broker.rating}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() =>
                        alert(`Redirecting to ${broker.name} official account setup.`)
                      }
                      className="px-4 py-2 bg-[#0049db] hover:bg-[#2962ff] text-white font-mono-code text-[12px] font-bold rounded-lg transition-colors"
                    >
                      Connect Broker
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
