import React, { useState } from 'react';
import { CommunityPost } from '../types';

interface CommunityViewProps {
  posts: CommunityPost[];
}

export const CommunityView: React.FC<CommunityViewProps> = ({ posts }) => {
  const [postList, setPostList] = useState<CommunityPost[]>(posts);
  const [newPostText, setNewPostText] = useState('');
  const [newPostSymbol, setNewPostSymbol] = useState('SPX');
  const [newPostSentiment, setNewPostSentiment] = useState<'Bullish' | 'Bearish'>('Bullish');

  const handleLike = (id: string) => {
    setPostList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: 'You (Trader)',
      handle: '@fincore_trader',
      avatar: 'TR',
      timeAgo: 'Just now',
      title: `${newPostSymbol} Market Note`,
      content: newPostText,
      assetSymbol: newPostSymbol,
      sentiment: newPostSentiment,
      likes: 0,
      comments: 0,
      shares: 0,
    };

    setPostList([newPost, ...postList]);
    setNewPostText('');
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 md:px-8 py-10 space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="font-hanken text-[32px] font-bold text-[#181c21]">
          Community & Trader Sentiment
        </h1>
        <p className="text-[14px] text-[#6A6D78] font-inter">
          Real-time trade ideas, macro analysis, and sentiment signals from verified market participants.
        </p>
      </div>

      {/* Share an idea box */}
      <form
        onSubmit={handleCreatePost}
        className="bg-white border border-[#E0E3EB] rounded-2xl p-5 shadow-xs space-y-4"
      >
        <div className="font-mono-code text-[13px] font-bold text-[#181c21] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#0049db]">edit_note</span>
          Post Market Commentary
        </div>

        <textarea
          rows={3}
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          placeholder="Share your technical levels, macro view, or order flow observation..."
          className="w-full p-3 bg-[#f1f4fb] border border-[#E0E3EB] rounded-xl text-[13px] font-inter text-[#181c21] outline-none focus:bg-white focus:border-[#0049db] transition-colors resize-none"
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[12px] font-mono-code text-[#6A6D78]">
              <span>Symbol:</span>
              <select
                value={newPostSymbol}
                onChange={(e) => setNewPostSymbol(e.target.value)}
                className="bg-[#f1f4fb] border border-[#E0E3EB] rounded px-2 py-1 text-[#181c21] font-bold outline-none"
              >
                <option value="SPX">SPX</option>
                <option value="NDX">NDX</option>
                <option value="NVDA">NVDA</option>
                <option value="AAPL">AAPL</option>
                <option value="BTCUSD">BTCUSD</option>
                <option value="GC1!">GC1!</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-[12px] font-mono-code">
              <button
                type="button"
                onClick={() => setNewPostSentiment('Bullish')}
                className={`px-2.5 py-1 rounded font-bold transition-colors ${
                  newPostSentiment === 'Bullish'
                    ? 'bg-[#089981] text-white'
                    : 'bg-[#f1f4fb] text-[#6A6D78]'
                }`}
              >
                Bullish
              </button>
              <button
                type="button"
                onClick={() => setNewPostSentiment('Bearish')}
                className={`px-2.5 py-1 rounded font-bold transition-colors ${
                  newPostSentiment === 'Bearish'
                    ? 'bg-[#F23645] text-white'
                    : 'bg-[#f1f4fb] text-[#6A6D78]'
                }`}
              >
                Bearish
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2 bg-[#0049db] hover:bg-[#2962ff] text-white font-mono-code text-[12px] font-bold rounded-lg transition-colors"
          >
            Publish Note
          </button>
        </div>
      </form>

      {/* Posts Feed */}
      <div className="space-y-4">
        {postList.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-[#E0E3EB] rounded-2xl p-6 shadow-xs hover:border-[#0049db]/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#dfe2f2] text-[#171b26] flex items-center justify-center font-mono-code font-bold text-[13px]">
                  {post.avatar}
                </div>
                <div>
                  <div className="font-mono-code text-[13px] font-bold text-[#181c21]">
                    {post.author}
                  </div>
                  <div className="text-[11px] text-[#6A6D78] font-inter">
                    {post.handle} • {post.timeAgo}
                  </div>
                </div>
              </div>

              {post.sentiment && (
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono-code font-bold ${
                    post.sentiment === 'Bullish'
                      ? 'bg-[#089981]/15 text-[#089981]'
                      : 'bg-[#F23645]/15 text-[#F23645]'
                  }`}
                >
                  {post.sentiment} {post.assetSymbol && `(${post.assetSymbol})`}
                </span>
              )}
            </div>

            <h3 className="font-hanken text-[16px] font-bold text-[#181c21] mb-2">
              {post.title}
            </h3>
            <p className="text-[13px] text-[#434656] font-inter leading-relaxed mb-4">
              {post.content}
            </p>

            <div className="flex items-center gap-6 pt-3 border-t border-[#E0E3EB]/60 text-[12px] font-mono-code text-[#6A6D78]">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-1.5 hover:text-[#0049db] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">thumb_up</span>
                <span>{post.likes}</span>
              </button>
              <div className="flex items-center gap-1.5 hover:text-[#0049db] transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                <span>{post.comments}</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-[#0049db] transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">share</span>
                <span>{post.shares}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
