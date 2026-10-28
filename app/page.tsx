"use client";

import { useState } from "react";

const communities = [
  { name: "Africa Creators", category: "Creators", icon: "🌍" },
  { name: "Europe Creators", category: "Creators", icon: "🌍" },
  { name: "Asia Creators", category: "Creators", icon: "🌏" },
  { name: "International Creators", category: "Creators", icon: "🌐" },
  { name: "Scholarships & Education", category: "Education", icon: "🎓" },
  { name: "University Students", category: "Education", icon: "📚" },
  { name: "Job Opportunities", category: "Jobs", icon: "💼" },
  { name: "Young Entrepreneurs", category: "Business", icon: "🚀" },
  { name: "Football Fans", category: "Sports", icon: "⚽" },
  { name: "Music Lovers", category: "Music", icon: "🎵" },
  { name: "Gamers", category: "Gaming", icon: "🎮" },
  { name: "Photography", category: "Art", icon: "📸" },
  { name: "AI & Technology", category: "Technology", icon: "🤖" },
  { name: "Business Opportunities", category: "Business", icon: "📈" },
];

type Post = {
  id: number;
  text: string;
  author: string;
  likes: number;
  comments: string[];
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("Home");
  const [search, setSearch] = useState("");
  const [joined, setJoined] = useState<string[]>([]);
  const [postText, setPostText] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentingOn, setCommentingOn] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      text: "Karibu A-CHKO! Ungana na watu, jifunze ujuzi mpya na ugundue fursa za ajira, scholarships na biashara.",
      author: "A-CHKO Community",
      likes: 0,
      comments: [],
    },
  ]);

  const filteredCommunities = communities.filter((community) =>
    `${community.name} ${community.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function createPost() {
    if (!postText.trim()) return;

    setPosts([
      {
        id: Date.now(),
        text: postText.trim(),
        author: "You",
        likes: 0,
        comments: [],
      },
      ...posts,
    ]);

    setPostText("");
    setActiveTab("Home");
  }

  function toggleJoin(name: string) {
    setJoined((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name]
    );
  }

  function likePost(id: number) {
    setPosts((current) =>
      current.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  }

  function addComment(id: number) {
    if (!commentText.trim()) return;

    setPosts((current) =>
      current.map((post) =>
        post.id === id
          ? { ...post, comments: [...post.comments, commentText.trim()] }
          : post
      )
    );

    setCommentText("");
    setCommentingOn(null);
  }

  async function sharePost(text: string) {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "A-CHKO",
          text,
        });
      } catch {
        // Mtumiaji anaweza kufunga dirisha la kushiriki.
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        alert("Maandishi yamenakiliwa. Unaweza kuyashiriki.");
      } catch {
        alert(text);
      }
    } else {
      alert(text);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/95 px-4 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <button
            onClick={() => setActiveTab("Home")}
            className="text-left"
          >
            <span className="text-2xl font-black tracking-wider text-cyan-400">
              A-CHKO
            </span>
            <span className="block text-xs text-slate-400">
              Watch. Connect. Discover.
            </span>
          </button>

          <button
            onClick={() => setActiveTab("Profile")}
            className="rounded-full border border-cyan-400/40 px-4 py-2 text-sm"
          >
            My Profile
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:grid-cols-[210px_1fr]">
        <aside className="h-fit rounded-2xl border border-white/10 bg-slate-900 p-3">
          <p className="mb-3 px-3 text-xs uppercase tracking-widest text-slate-500">
            Main menu
          </p>

          {["Home", "Discover", "Create", "Communities", "Opportunities", "Profile"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`mb-1 w-full rounded-xl px-3 py-3 text-left text-sm ${
                  activeTab === tab
                    ? "bg-cyan-400 font-bold text-slate-950"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                {tab === "Home" && "🏠 "}
                {tab === "Discover" && "🔎 "}
                {tab === "Create" && "✍️ "}
                {tab === "Communities" && "👥 "}
                {tab === "Opportunities" && "🎯 "}
                {tab === "Profile" && "👤 "}
                {tab}
              </button>
            )
          )}

          <div className="mt-5 rounded-xl bg-slate-800 p-3">
            <p className="text-sm font-bold text-cyan-300">
              One hub, endless possibilities.
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              Connect with people and discover opportunities around the world.
            </p>
          </div>
        </aside>

        <section className="min-w-0">
          {activeTab === "Home" && (
            <>
              <div className="mb-6 rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-950 to-slate-900 p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
                  Welcome to A-CHKO
                </p>
                <h1 className="mt-3 text-3xl font-black sm:text-4xl">
                  Connect. Create. Grow.
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                  Discover scholarships, jobs, business ideas, sports,
                  entertainment and communities that match your interests.
                </p>
                <button
                  onClick={() => setActiveTab("Discover")}
                  className="mt-5 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950"
                >
                  Explore A-CHKO →
                </button>
              </div>

              <div className="mb-5 rounded-2xl border border-white/10 bg-slate-900 p-4">
                <h2 className="mb-3 font-bold">Create a post</h2>
                <textarea
                  value={postText}
                  onChange={(event) => setPostText(event.target.value)}
                  placeholder="What would you like to share?"
                  className="min-h-24 w-full resize-y rounded-xl border border-white/10 bg-slate-950 p-3 text-sm outline-none focus:border-cyan-400"
                />
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={createPost}
                    className="rounded-xl bg-cyan-400 px-5 py-2 font-bold text-slate-950"
                  >
                    Publish post
                  </button>
                </div>
              </div>

              <h2 className="mb-4 text-xl font-bold">Community feed</h2>

              <div className="space-y-4">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="rounded-2xl border border-white/10 bg-slate-900 p-4"
                  >
                    <p className="text-sm font-bold text-cyan-300">
                      {post.author}
                    </p>
                    <p className="my-4 whitespace-pre-wrap text-sm leading-7 text-slate-200">
                      {post.text}
                    </p>

                    <div className="flex flex-wrap gap-2 border-t border-white/10 pt-3">
                      <button
                        onClick={() => likePost(post.id)}
                        className="rounded-lg bg-slate-800 px-3 py-2 text-sm"
                      >
                        ❤️ Like ({post.likes})
                      </button>
                      <button
                        onClick={() =>
                          setCommentingOn(
                            commentingOn === post.id ? null : post.id
                          )
                        }
                        className="rounded-lg bg-slate-800 px-3 py-2 text-sm"
                      >
                        💬 Comment ({post.comments.length})
                      </button>
                      <button
                        onClick={() => sharePost(post.text)}
                        className="rounded-lg bg-slate-800 px-3 py-2 text-sm"
                      >
                        ↗ Share
                      </button>
                    </div>

                    {commentingOn === post.id && (
                      <div className="mt-3 flex gap-2">
                        <input
                          value={commentText}
                          onChange={(event) => setCommentText(event.target.value)}
                          placeholder="Write a comment..."
                          className="min-w-0 flex-1 rounded-lg border border-white/10 bg-slate-950 p-3 text-sm"
                        />
                        <button
                          onClick={() => addComment(post.id)}
                          className="rounded-lg bg-cyan-400 px-3 text-sm font-bold text-slate-950"
                        >
                          Send
                        </button>
                      </div>
                    )}

                    {post.comments.map((comment, index) => (
                      <p
                        key={`${post.id}-${index}`}
                        className="mt-2 rounded-lg bg-slate-800 p-3 text-sm text-slate-300"
                      >
                        {comment}
                      </p>
                    ))}
                  </article>
                ))}
              </div>
            </>
          )}

          {activeTab === "Discover" && (
            <>
              <h1 className="mb-2 text-2xl font-black">Discover</h1>
              <p className="mb-5 text-sm text-slate-400">
                Find communities and people who share your interests.
              </p>

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search groups, jobs, scholarships..."
                className="mb-5 w-full rounded-xl border border-white/10 bg-slate-900 p-4 outline-none focus:border-cyan-400"
              />

              <div className="grid gap-3 sm:grid-cols-2">
                {filteredCommunities.map((community) => (
                  <div
                    key={community.name}
                    className="rounded-2xl border border-white/10 bg-slate-900 p-4"
                  >
                    <span className="text-3xl">{community.icon}</span>
                    <h2 className="mt-3 font-bold">{community.name}</h2>
                    <p className="mt-1 text-sm text-slate-400">
                      {community.category}
                    </p>
                    <button
                      onClick={() => toggleJoin(community.name)}
                      className={`mt-4 w-full rounded-xl px-4 py-2 text-sm font-bold ${
                        joined.includes(community.name)
                          ? "bg-slate-700 text-white"
                          : "bg-cyan-400 text-slate-950"
                      }`}
                    >
                      {joined.includes(community.name)
                        ? "✓ Joined"
                        : "Join community"}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "Create" && (
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <h1 className="mb-4 text-2xl font-black">Create content</h1>
              <p className="mb-4 text-sm text-slate-400">
                Share an idea, experience or opportunity with the community.
              </p>
              <textarea
                value={postText}
                onChange={(event) => setPostText(event.target.value)}
                placeholder="Write your post here..."
                className="min-h-40 w-full rounded-xl border border-white/10 bg-slate-950 p-4"
              />
              <button
                onClick={createPost}
                className="mt-4 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950"
              >
                Publish
              </button>
            </div>
          )}

          {activeTab === "Communities" && (
            <>
              <h1 className="mb-2 text-2xl font-black">Communities</h1>
              <p className="mb-5 text-sm text-slate-400">
                Join groups based on your interests.
              </p>
              <div className="space-y-3">
                {communities.map((community) => (
                  <div
                    key={community.name}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-900 p-4"
                  >
                    <div>
                      <p className="font-bold">
                        {community.icon} {community.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {community.category}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleJoin(community.name)}
                      className="rounded-lg bg-cyan-400 px-3 py-2 text-xs font-bold text-slate-950"
                    >
                      {joined.includes(community.name) ? "Joined" : "Join"}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "Opportunities" && (
            <>
              <h1 className="mb-2 text-2xl font-black">Opportunities</h1>
              <p className="mb-5 text-sm text-slate-400">
                Explore opportunity categories. Verified live listings
                will require a connected data source.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["🎓", "Scholarships", "Education funding and study opportunities"],
                  ["💼", "Jobs & Internships", "Career and work opportunities"],
                  ["🚀", "Business", "Entrepreneurship and business ideas"],
                  ["🏆", "Competitions", "Challenges, awards and contests"],
                  ["⚽", "Sports", "Sports communities and events"],
                  ["🎵", "Music & Creativity", "Creative projects and talent"],
                ].map(([icon, title, description]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/10 bg-slate-900 p-5"
                  >
                    <span className="text-3xl">{icon}</span>
                    <h2 className="mt-3 font-bold">{title}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {description}
                    </p>
                    <button
                      onClick={() => {
                        setSearch(title);
                        setActiveTab("Discover");
                      }}
                      className="mt-4 rounded-lg border border-cyan-400/50 px-4 py-2 text-sm text-cyan-300"
                    >
                      Explore →
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "Profile" && (
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400 text-3xl text-slate-950">
                👤
              </div>
              <h1 className="text-2xl font-black">My Profile</h1>
              <p className="mt-2 text-sm text-slate-400">
                Your A-CHKO profile
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-800 p-4">
                  <p className="text-2xl font-black">{posts.length}</p>
                  <p className="text-xs text-slate-400">Posts in this session</p>
                </div>
                <div className="rounded-xl bg-slate-800 p-4">
                  <p className="text-2xl font-black">{joined.length}</p>
                  <p className="text-xs text-slate-400">Groups joined</p>
                </div>
              </div>
              <p className="mt-5 text-xs leading-5 text-amber-300">
                Profile information and memberships are currently stored
                in this browser session, not in a user account.
              </p>
            </div>
          )}
        </section>
      </div>

      <footer className="border-t border-white/10 px-4 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} A-CHKO · One hub, endless possibilities.
      </footer>
    </main>
  );
}
