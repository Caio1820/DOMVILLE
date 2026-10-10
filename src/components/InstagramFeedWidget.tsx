import React, { useState } from 'react';
import {
  DOMVILLE_INFO,
  INSTAGRAM_POSTS,
  INSTAGRAM_STORIES,
  InstagramPost,
  InstagramStory,
} from '../data/domvilleData';
import {
  Instagram,
  Heart,
  MessageCircle,
  ExternalLink,
  Play,
  X,
  Share2,
  Bookmark,
  MapPin,
  Sparkles,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const InstagramFeedWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'reels'>('all');
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [activeStory, setActiveStory] = useState<InstagramStory | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const filteredPosts = activeTab === 'all'
    ? INSTAGRAM_POSTS
    : INSTAGRAM_POSTS.filter((p) => p.type === 'reel');

  const toggleLike = (postId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <section id="instagram-feed" className="w-full px-4 py-6 max-w-lg mx-auto">
      {/* Section Title & Badge */}
      <div className="flex items-center justify-between mb-3.5">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider">
            <Instagram className="w-3.5 h-3.5 text-rose-400" />
            <span>Feed Oficial & Prova Social</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-display mt-0.5">
            Ao Vivo no Instagram
          </h2>
        </div>
        <a
          href={DOMVILLE_INFO.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all"
        >
          <span>Seguir</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Profile Header Widget */}
      <div className="rounded-2xl bg-neutral-900/90 border border-neutral-800 p-4 mb-4 shadow-lg">
        <div className="flex items-center gap-3.5">
          {/* Avatar with animated Instagram gradient ring */}
          <div className="relative p-[2.5px] rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shrink-0">
            <img
              src={DOMVILLE_INFO.logoUrl}
              alt="Domville Instagram"
              className="w-14 h-14 rounded-full object-cover border-2 border-neutral-950"
            />
            <span className="absolute bottom-0 right-0 p-1 rounded-full bg-blue-500 text-white shadow-sm border border-neutral-950">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                {DOMVILLE_INFO.instagramHandle}
              </h3>
            </div>
            <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
              Casa de Pagode & Entretenimento • Macapá - AP
            </p>
            <div className="flex items-center gap-3 text-[11px] text-neutral-300 font-medium mt-1.5">
              <span><strong>842</strong> posts</span>
              <span>•</span>
              <span><strong className="text-amber-400">28.4k</strong> seguidores</span>
              <span>•</span>
              <span><strong>100%</strong> Pagode</span>
            </div>
          </div>
        </div>

        {/* Stories Strip */}
        <div className="mt-4 pt-3 border-t border-neutral-800/80">
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
            Destaques da Galera & Shows
          </p>
          <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
            {INSTAGRAM_STORIES.map((story) => (
              <button
                key={story.id}
                onClick={() => setActiveStory(story)}
                className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none"
              >
                <div className="p-[2px] rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 group-hover:scale-105 transition-transform duration-200">
                  <div className="p-[1.5px] rounded-full bg-neutral-950">
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-neutral-300 group-hover:text-amber-300 transition-colors">
                  {story.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feed Tabs: Todas as fotos vs Reels */}
      <div className="flex items-center gap-2 mb-3 bg-neutral-950 p-1 rounded-xl border border-neutral-800/80">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'all'
              ? 'bg-neutral-800 text-white font-bold shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Publicações Recentes
        </button>
        <button
          onClick={() => setActiveTab('reels')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'reels'
              ? 'bg-neutral-800 text-white font-bold shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Play className="w-3 h-3 fill-current" />
          <span>Vídeos / Reels</span>
        </button>
      </div>

      {/* Media Grid (Instagram Feed) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {filteredPosts.map((post) => {
          const isLiked = likedPosts[post.id];
          return (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800/80 cursor-pointer shadow-md"
            >
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />

              {/* Reel indicator icon if video */}
              {post.type === 'reel' && (
                <span className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white">
                  <Play className="w-3.5 h-3.5 fill-white" />
                </span>
              )}

              {/* Time tag */}
              <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-neutral-950/80 backdrop-blur-md text-neutral-300">
                {post.timeAgo}
              </span>

              {/* Hover Overlay with Social Proof (Likes and Comments) */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2 text-white">
                <div className="flex items-center gap-4 text-xs font-bold">
                  <span className="flex items-center gap-1">
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : 'fill-white'}`} />
                    {post.likes + (isLiked ? 1 : 0)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 fill-white" />
                    {post.comments}
                  </span>
                </div>
                <p className="text-[10px] text-neutral-300 line-clamp-2 text-center">
                  {post.caption}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA to view full Instagram */}
      <div className="mt-4 text-center">
        <a
          href={DOMVILLE_INFO.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold text-neutral-300 hover:text-white hover:border-rose-500/50 transition-all shadow-sm"
        >
          <Instagram className="w-4 h-4 text-rose-400" />
          <span>Ver mais fotos e vídeos no perfil @domvilleap</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* POST LIGHTBOX MODAL */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-3.5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60">
              <div className="flex items-center gap-2.5">
                <img
                  src={DOMVILLE_INFO.logoUrl}
                  alt="Domville"
                  className="w-8 h-8 rounded-full object-cover border border-amber-500"
                />
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    {DOMVILLE_INFO.instagramHandle}
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </h4>
                  <p className="text-[10px] text-neutral-400 flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 text-amber-400" />
                    {selectedPost.location}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Post Image */}
            <div className="relative aspect-square w-full bg-black">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.caption}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Interactions Bar */}
            <div className="p-4 flex-1 overflow-y-auto space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleLike(selectedPost.id)}
                    className="hover:scale-110 active:scale-95 transition-transform"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        likedPosts[selectedPost.id]
                          ? 'fill-rose-500 text-rose-500'
                          : 'text-white'
                      }`}
                    />
                  </button>
                  <button className="text-white hover:text-amber-400 transition">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                  <a
                    href={DOMVILLE_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-amber-400 transition"
                  >
                    <Share2 className="w-5 h-5" />
                  </a>
                </div>

                <span className="text-[11px] text-neutral-400">
                  {selectedPost.timeAgo}
                </span>
              </div>

              {/* Like counts */}
              <p className="text-xs font-bold text-white">
                {selectedPost.likes + (likedPosts[selectedPost.id] ? 1 : 0)} curtidas
              </p>

              {/* Caption */}
              <div className="text-xs text-neutral-300 leading-relaxed space-y-1">
                <p>
                  <strong className="text-white mr-1.5">{DOMVILLE_INFO.instagramHandle}</strong>
                  {selectedPost.caption}
                </p>
              </div>

              {/* Comments count preview */}
              <div className="pt-2 border-t border-neutral-900 text-xs text-neutral-400">
                Ver todos os {selectedPost.comments} comentários da galera...
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="p-3 border-t border-neutral-800 bg-neutral-950">
              <a
                href={DOMVILLE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:brightness-110 transition"
              >
                <Instagram className="w-4 h-4" />
                <span>Ver Publicação no Instagram Oficial</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* STORY VIEWER MODAL */}
      {activeStory && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setActiveStory(null)}
        >
          <div
            className="relative w-full max-w-sm h-full max-h-[85vh] rounded-2xl overflow-hidden bg-neutral-950 flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Story Progress Bar */}
            <div className="absolute top-3 left-3 right-3 z-20 flex gap-1">
              <div className="h-1 flex-1 bg-white/40 rounded-full overflow-hidden">
                <div className="h-full bg-white animate-[pulse_4s_linear]" />
              </div>
            </div>

            {/* Story Header */}
            <div className="absolute top-6 left-3 right-3 z-20 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <img
                  src={DOMVILLE_INFO.logoUrl}
                  alt="Domville"
                  className="w-7 h-7 rounded-full object-cover border border-amber-500"
                />
                <div>
                  <span className="text-xs font-bold">{DOMVILLE_INFO.instagramHandle}</span>
                  <span className="text-[10px] text-neutral-300 ml-1.5 font-normal">Destaques</span>
                </div>
              </div>
              <button
                onClick={() => setActiveStory(null)}
                className="p-1 rounded-full bg-black/40 text-white hover:bg-black/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Story Image */}
            <div className="flex-1 w-full h-full relative">
              <img
                src={activeStory.storyImage}
                alt={activeStory.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

              {/* Tagline at bottom */}
              <div className="absolute bottom-6 left-4 right-4 text-center space-y-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500 text-neutral-950 uppercase tracking-wider shadow-lg">
                  {activeStory.title}
                </span>
                <p className="text-sm font-bold text-white drop-shadow">
                  {activeStory.tagline}
                </p>
                <a
                  href={DOMVILLE_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold backdrop-blur-md border border-white/30 transition mt-2"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Ver perfil @domvilleap</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
