"use client";

import { useState } from "react";
import {
  Home,
  Search,
  PlusSquare,
  Users,
  UserRound,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Bell,
  Compass,
  BriefcaseBusiness,
  GraduationCap,
  Music,
  Gamepad2,
  Camera,
  Menu,
  X,
  Send,
  TrendingUp,
} from "lucide-react";

type Post = {
  id: number;
  author: string;
  category: string;
  text: string;
  likes: number;
  comments: number;
  liked: boolean;
  saved: boolean;
};

const initialPosts: Post[] = [
  {
    id: 1,
    author: "A-CHKO Community",
    category: "Entrepreneurship",
    text: "Karibu A-CHKO! Gundua fursa za biashara, ajira, scholarships, michezo na ubunifu. Jiunge na jamii inayokusaidia kukua.",
    likes: 24,
    comments: 8,
    liked: false,
    saved: false,
  },
  {
    id: 2,
    author: "Young Entrepreneurs",
    category: "Business",
    text: "Unaanzaje biashara kwa mtaji mdogo? Shiriki mawazo yako, jifunze kutoka kwa wengine na jiunge na jamii ya wajasiriamali.",
    likes: 17,
    comments: 5,
    liked: false,
    saved: false,
  },
];

const communities = [
  { name: "African Creators", icon: "🌍", members: "12K members" },
  { name: "Young Entrepreneurs", icon: "💡", members: "8K members" },
  { name: "Scholarships", icon: "🎓", members: "15K members" },
  { name: "University Students", icon: "📚", members: "9K members" },
  { name: "Job Opportunities", icon: "💼", members: "20K members" },
  { name: "Football Fans", icon: "⚽", members: "7K members" },
  { name: "Music Lovers", icon: "🎵", members: "6K members" },
  { name: "Gaming Community", icon: "🎮", members: "5K members" },
  { name: "Photography", icon: "📸", members: "3K members" },
  { name: "AI & Technology", icon: "🤖", members: "4K members" },
  { name: "International Creators", icon: "🌐", members: "11K members" },
  { name: "Asian Creators", icon: "🌏", members: "2K members" },
  { name: "European Creators", icon: "🌍", members: "3K members" },
  { name: "American Creators", icon: "🌎", members: "4K members" },
];

const opportunities = [
  {
    icon: "🎓",
    title: "Scholarships",
    detail: "Discover education funding opportunities.",
  },
  {
    icon: "💼",
    title: "Jobs & Careers",
    detail: "Explore jobs and career opportunities.",
  },
  {
    icon: "🚀",
    title: "Business",
    detail: "Discover business ideas and competitions.",
  },
  {
    icon: "🏆",
    title: "Competitions",
    detail: "Find challenges and creator awards.",
  },
  {
    icon: "⚽",
    title: "Sports",
    detail: "Connect with sports communities.",
  },
  {
    icon: "🎵",
    title: "Music & Arts",
    detail: "Discover music, art and creative talent.",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("Home");
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [newPost, setNewPost] = useState("");
  const [joined, setJoined] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function showNotice(message: string) {
    setNotice(message);
    setTimeout(() => setNotice(""), 3000);
  }

  function toggleLike(id: number) {
    setPosts((current) =>
      current.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.likes + (post.liked ? -1 : 1),
            }
          : post
      )
    );
  }

  function toggleSave(id: number) {
    setPosts((current) =>
      current.map((post) =>
        post.id === id ? { ...post, saved: !post.saved } : post
      )
    );
    showNotice("Hali ya kuhifadhi post imebadilishwa.");
  }

  function publishPost() {
    if (!newPost.trim()) {
      showNotice("Andika ujumbe kwanza.");
      return;
    }

    const post: Post = {
      id: Date.now(),
      author: "You",
      category: "Community",
      text: newPost.trim(),
      likes: 0,
      comments: 0,
      liked: false,
      saved: false,
    };

    setPosts((current) => [post, ...current]);
    setNewPost("");
    setActiveTab("Home");
    showNotice("Post imeongezwa kwenye feed yako.");
  }

  function toggleJoin(name: string) {
    const isJoined = joined.includes(name);

    setJoined((current) =>
      isJoined ? current.filter((item) => item !== name) : [...current, name]
    );

    showNotice(isJoined ? `Umeondoka ${name}.` : `Umejiunga na ${name}.`);
  }

  const filteredPosts = posts.filter((post) =>
    `${post.author} ${post.category} ${post.text}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(search.toLowerCase())
  );

  function nav(tab: string) {
    setActiveTab(tab);
    setMenuOpen(false);
    setSearch("");
  }

  return (
    <main className="achko-app">
      <header className="topbar">
        <button
          className="icon-button mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <button className="brand" onClick={() => nav("Home")}>
          <span className="brand-mark">A</span>
          <span>A-CHKO</span>
        </button>

        <div className="top-search">
          <Search size={19} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search posts, groups and opportunities..."
            aria-label="Search"
          />
        </div>

        <button
          className="icon-button notification-button"
          onClick={() => showNotice("Hakuna taarifa mpya kwa sasa.")}
          aria-label="Notifications"
        >
          <Bell size={21} />
        </button>

        <button className="profile-avatar" onClick={() => nav("Profile")}>
          U
        </button>
      </header>

      {notice && <div className="notice">{notice}</div>}

      <div className="app-layout">
        <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
          <p className="side-label">MENU</p>

          <button
            className={`nav-item ${activeTab === "Home" ? "active" : ""}`}
            onClick={() => nav("Home")}
          >
            <Home size={20} /> Home
          </button>

          <button
            className={`nav-item ${activeTab === "Discover" ? "active" : ""}`}
            onClick={() => nav("Discover")}
          >
            <Compass size={20} /> Discover
          </button>

          <button
            className={`nav-item ${activeTab === "Create" ? "active" : ""}`}
            onClick={() => nav("Create")}
          >
            <PlusSquare size={20} /> Create post
          </button>

          <button
            className={`nav-item ${activeTab === "Communities" ? "active" : ""}`}
            onClick={() => nav("Communities")}
          >
            <Users size={20} /> Communities
          </button>

          <button
            className={`nav-item ${activeTab === "Opportunities" ? "active" : ""}`}
            onClick={() => nav("Opportunities")}
          >
            <BriefcaseBusiness size={20} /> Opportunities
          </button>

          <button
            className={`nav-item ${activeTab === "Profile" ? "active" : ""}`}
            onClick={() => nav("Profile")}
          >
            <UserRound size={20} /> Profile
          </button>

          <div className="sidebar-divider" />

          <p className="side-label">YOUR INTERESTS</p>

          <button className="nav-item" onClick={() => nav("Discover")}>
            <GraduationCap size={20} /> Education
          </button>

          <button className="nav-item" onClick={() => nav("Discover")}>
            <Music size={20} /> Music
          </button>

          <button className="nav-item" onClick={() => nav("Discover")}>
            <Gamepad2 size={20} /> Gaming
          </button>

          <button className="nav-item" onClick={() => nav("Discover")}>
            <Camera size={20} /> Photography
          </button>

          <div className="sidebar-promo">
            <span>🌟</span>
            <strong>One hub.</strong>
            <strong>Endless possibilities.</strong>
            <p>Watch, connect and discover opportunities.</p>
          </div>
        </aside>

        <section className="main-content">
          {activeTab === "Home" && (
            <>
              <section className="welcome-banner">
                <div>
                  <span className="eyebrow">YOUR WORLD. YOUR OPPORTUNITIES.</span>
                  <h1>Welcome to A-CHKO</h1>
                  <p>
                    Watch, connect and discover opportunities all in one hub.
                  </p>
                  <button
                    className="primary-button"
                    onClick={() => nav("Discover")}
                  >
                    Explore now <TrendingUp size={17} />
                  </button>
                </div>
                <div className="banner-art" aria-hidden="true">
                  🌍
                </div>
              </section>

              <div className="section-heading">
                <div>
                  <h2>Your community feed</h2>
                  <p>Ideas, stories and conversations from your community.</p>
                </div>
                <button
                  className="outline-button"
                  onClick={() => nav("Create")}
                >
                  <PlusSquare size={17} /> Create
                </button>
              </div>

              <section className="create-box">
                <div className="profile-avatar">U</div>
                <button
                  className="post-prompt"
                  onClick={() => nav("Create")}
                >
                  Share an idea, story or opportunity...
                </button>
                <button
                  className="primary-button compact"
                  onClick={() => nav("Create")}
                >
                  Post
                </button>
              </section>

              <div className="feed-list">
                {filteredPosts.length === 0 ? (
                  <div className="empty-state">
                    <Search size={32} />
                    <h3>No posts found</h3>
                    <p>Try another search term.</p>
                  </div>
                ) : (
                  filteredPosts.map((post) => (
                    <article className="post-card" key={post.id}>
                      <div className="post-header">
                        <div className="post-avatar">
                          {post.author.charAt(0).toUpperCase()}
                        </div>
                        <div className="post-author">
                          <strong>{post.author}</strong>
                          <span>{post.category} · A-CHKO community</span>
                        </div>
                        <button
                          className="icon-button save-button"
                          onClick={() => toggleSave(post.id)}
                          aria-label="Save post"
                        >
                          <Bookmark
                            size={19}
                            fill={post.saved ? "currentColor" : "none"}
                          />
                        </button>
                      </div>

                      <p className="post-text">{post.text}</p>

                      <div className="post-stats">
                        <span>{post.likes} likes</span>
                        <span>{post.comments} comments</span>
                      </div>

                      <div className="post-actions">
                        <button
                          className={post.liked ? "liked action-button" : "action-button"}
                          onClick={() => toggleLike(post.id)}
                        >
                          <Heart
                            size={19}
                            fill={post.liked ? "currentColor" : "none"}
                          />
                          Like
                        </button>
                        <button
                          className="action-button"
                          onClick={() =>
                            showNotice("Maoni yataongezwa kwenye hatua ya backend.")
                          }
                        >
                          <MessageCircle size={19} /> Comment
                        </button>
                        <button
                          className="action-button"
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: "A-CHKO",
                                text: post.text,
                              }).catch(() => {});
                            } else {
                              showNotice("Kushiriki kunapatikana kupitia kifaa chako.");
                            }
                          }}
                        >
                          <Share2 size={19} /> Share
                        </button>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </>
          )}

          {activeTab === "Discover" && (
            <>
              <div className="page-heading">
                <span className="eyebrow">EXPLORE YOUR WORLD</span>
                <h1>Discover</h1>
                <p>Find people, communities and topics you care about.</p>
              </div>

              <div className="search-panel">
                <Search size={20} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search communities..."
                />
              </div>

              <h2 className="subheading">Popular communities</h2>

              <div className="community-grid">
                {filteredCommunities.map((community) => (
                  <CommunityCard
                    key={community.name}
                    community={community}
                    joined={joined.includes(community.name)}
                    onJoin={() => toggleJoin(community.name)}
                  />
                ))}
              </div>

              {filteredCommunities.length === 0 && (
                <p className="empty-state">Hakuna jamii iliyopatikana.</p>
              )}
            </>
          )}

          {activeTab === "Create" && (
            <>
              <div className="page-heading">
                <span className="eyebrow">SHARE WITH THE WORLD</span>
                <h1>Create a post</h1>
                <p>Share ideas, stories and opportunities with your community.</p>
              </div>

              <section className="create-form">
                <label htmlFor="post-content">What would you like to share?</label>
                <textarea
                  id="post-content"
                  value={newPost}
                  onChange={(event) => setNewPost(event.target.value)}
                  placeholder="Tell your story, share a business idea, or post an opportunity..."
                  rows={7}
                  maxLength={2000}
                />
                <div className="form-footer">
                  <span>{newPost.length}/2000 characters</span>
                  <button className="primary-button" onClick={publishPost}>
                    Publish post <Send size={17} />
                  </button>
                </div>
              </section>

              <div className="info-note">
                <strong>Coming next</strong>
                <p>
                  Photo and video uploads will need storage and backend
                  integration.
                </p>
              </div>
            </>
          )}

          {activeTab === "Communities" && (
            <>
              <div className="page-heading">
                <span className="eyebrow">FIND YOUR PEOPLE</span>
                <h1>Communities</h1>
                <p>Join a group, share knowledge and grow together.</p>
              </div>

              <div className="search-panel">
                <Search size={20} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search communities..."
                />
              </div>

              <div className="community-grid">
                {filteredCommunities.map((community) => (
                  <CommunityCard
                    key={community.name}
                    community={community}
                    joined={joined.includes(community.name)}
                    onJoin={() => toggleJoin(community.name)}
                  />
                ))}
              </div>
            </>
          )}

          {activeTab === "Opportunities" && (
            <>
              <div className="page-heading">
                <span className="eyebrow">GROW YOUR FUTURE</span>
                <h1>Opportunities</h1>
                <p>Explore categories that can help you move forward.</p>
              </div>

              <div className="opportunity-grid">
                {opportunities.map((item) => (
                  <button
                    className="opportunity-card"
                    key={item.title}
                    onClick={() => {
                      setSearch(item.title);
                      showNotice(
                        `Umechagua ${item.title}. Fursa halisi zitaunganishwa kwenye backend.`
                      );
                    }}
                  >
                    <span className="opportunity-icon">{item.icon}</span>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                    <span className="text-link">Explore →</span>
                  </button>
                ))}
              </div>

              <div className="info-note">
                <strong>Important</strong>
                <p>
                  Hizi ni categories za fursa. Matangazo halisi ya ajira na
                  scholarships yatahitaji data source au backend.
                </p>
              </div>
            </>
          )}

          {activeTab === "Profile" && (
            <>
              <div className="page-heading">
                <span className="eyebrow">YOUR SPACE</span>
                <h1>Your profile</h1>
                <p>Manage your activity on A-CHKO.</p>
              </div>

              <section className="profile-card">
                <div className="large-avatar">U</div>
                <h2>A-CHKO Member</h2>
                <p>Share. Connect. Grow.</p>

                <div className="profile-stats">
                  <div>
                    <strong>{posts.length}</strong>
                    <span>Posts</span>
                  </div>
                  <div>
                    <strong>{joined.length}</strong>
                    <span>Communities</span>
                  </div>
                  <div>
                    <strong>
                      {posts.reduce((total, post) => total + post.likes, 0)}
                    </strong>
                    <span>Post likes</span>
                  </div>
                </div>

                <button
                  className="primary-button"
                  onClick={() => nav("Create")}
                >
                  <PlusSquare size={18} /> Create a post
                </button>
              </section>

              <div className="info-note">
                <strong>Account setup</strong>
                <p>
                  Profile editing, secure login and permanent account storage
                  will be connected to Supabase.
                </p>
              </div>
            </>
          )}
        </section>

        <aside className="right-sidebar">
          <section className="right-card">
            <div className="right-card-heading">
              <h3>Trending communities</h3>
              <TrendingUp size={18} />
            </div>

            {communities.slice(0, 5).map((community) => (
              <div className="trending-item" key={community.name}>
                <span className="trending-emoji">{community.icon}</span>
                <div>
                  <strong>{community.name}</strong>
                  <span>{community.members}</span>
                </div>
              </div>
            ))}

            <button
              className="text-link full-link"
              onClick={() => nav("Communities")}
            >
              See all communities →
            </button>
          </section>

          <section className="right-card opportunity-highlight">
            <span className="highlight-icon">🚀</span>
            <h3>Discover opportunities</h3>
            <p>Find scholarships, jobs and ways to grow your future.</p>
            <button
              className="primary-button full-button"
              onClick={() => nav("Opportunities")}
            >
              Explore opportunities
            </button>
          </section>

          <p className="footer-note">
            About · Community Guidelines · Privacy
            <br />
            © 2026 A-CHKO
          </p>
        </aside>
      </div>

      <nav className="mobile-bottom-nav">
        <button
          className={activeTab === "Home" ? "mobile-active" : ""}
          onClick={() => nav("Home")}
        >
          <Home size={21} />
          <span>Home</span>
        </button>
        <button
          className={activeTab === "Discover" ? "mobile-active" : ""}
          onClick={() => nav("Discover")}
        >
          <Compass size={21} />
          <span>Discover</span>
        </button>
        <button
          className={activeTab === "Create" ? "mobile-active" : ""}
          onClick={() => nav("Create")}
        >
          <PlusSquare size={21} />
          <span>Create</span>
        </button>
        <button
          className={activeTab === "Communities" ? "mobile-active" : ""}
          onClick={() => nav("Communities")}
        >
          <Users size={21} />
          <span>Groups</span>
        </button>
        <button
          className={activeTab === "Profile" ? "mobile-active" : ""}
          onClick={() => nav("Profile")}
        >
          <UserRound size={21} />
          <span>Profile</span>
        </button>
      </nav>
    </main>
  );
}

function CommunityCard({
  community,
  joined,
  onJoin,
}: {
  community: { name: string; icon: string; members: string };
  joined: boolean;
  onJoin: () => void;
}) {
  return (
    <article className="community-card">
      <div className="community-icon">{community.icon}</div>
      <h3>{community.name}</h3>
      <p>{community.members}</p>
      <button
        className={joined ? "outline-button joined-button" : "primary-button"}
        onClick={onJoin}
      >
        {joined ? "Joined ✓" : "Join group"}
      </button>
    </article>
  );
}
