"use client";

import { useState } from "react";
import {
  Home,
  Search,
  PlusSquare,
  Users,
  UserCircle,
  BriefcaseBusiness,
  GraduationCap,
  FileText,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Video,
  Image as ImageIcon,
  Menu,
  X,
  Globe,
  Gamepad2,
  Music,
  Trophy,
  Code,
  Camera,
  Send,
  LogIn,
  UserPlus,
  Bell,
  Settings,
  ChevronRight,
  ExternalLink,
  Upload,
  Trash2,
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
    category: "Biashara",
    text: "Karibu A-CHKO! Shiriki mawazo yako ya biashara, pata fursa na ungana na vijana wengine wenye malengo makubwa.",
    likes: 12,
    comments: 3,
    liked: false,
    saved: false,
  },
  {
    id: 2,
    author: "Education Opportunities",
    category: "Scholarships",
    text: "Unatafuta scholarship au internship? Tembelea sehemu ya Opportunities na uhakikishe unakagua masharti na deadline kwenye tovuti rasmi.",
    likes: 24,
    comments: 5,
    liked: false,
    saved: false,
  },
  {
    id: 3,
    author: "Young Entrepreneurs",
    category: "Biashara",
    text: "Unaweza kuanza kujenga biashara kwa kuchunguza tatizo linalowakabili watu, kuandaa bajeti na kujaribu wazo lako kwa kiwango kidogo.",
    likes: 31,
    comments: 8,
    liked: false,
    saved: false,
  },
];

const categories = [
  "Zote",
  "Ajira",
  "Scholarships",
  "Biashara",
  "Elimu",
  "Michezo",
  "Muziki",
  "Teknolojia",
  "Burudani",
  "Gaming",
  "Photography",
];

const groups = [
  "Africa Creators Group",
  "Europe Creators Group",
  "Asian Creators Group",
  "America Creators Group",
  "International Creators Group",
  "Tanzania Creators",
  "East Africa Creators",
  "Scholarships Opportunities",
  "University Students",
  "College Students",
  "Study Abroad",
  "Jobs in Tanzania",
  "Jobs in Africa",
  "International Jobs",
  "Remote Jobs",
  "Internships & Graduate Training",
  "Young Entrepreneurs",
  "Africa Entrepreneurs",
  "Small Business Ideas",
  "Startup Founders",
  "AI & Technology",
  "Software Developers",
  "App Developers",
  "Cybersecurity",
  "Football Fans",
  "Tanzania Football",
  "Africa Football",
  "Basketball Fans",
  "Sports Opportunities",
  "Music Lovers",
  "African Music",
  "Upcoming Artists",
  "Comedy Creators",
  "Gamers",
  "Photography",
  "Graphic Designers",
  "Fashion & Modeling",
  "Writers & Authors",
  "Competitions & Awards",
  "Grants & Funding",
  "Volunteering Opportunities",
  "Travel Opportunities",
];

const opportunities = [
  {
    title: "Ajira na nafasi za kazi",
    description: "Chunguza nafasi za kazi na mahitaji ya waajiri.",
    category: "Ajira",
    icon: BriefcaseBusiness,
    href: "/opportunities",
  },
  {
    title: "Scholarships",
    description: "Tafuta fursa za ufadhili wa masomo.",
    category: "Elimu",
    icon: GraduationCap,
    href: "/opportunities",
  },
  {
    title: "Internships",
    description: "Tafuta nafasi za mafunzo kwa vitendo.",
    category: "Ajira",
    icon: Globe,
    href: "/opportunities",
  },
  {
    title: "Mashindano na tuzo",
    description: "Gundua competitions na awards.",
    category: "Mashindano",
    icon: Trophy,
    href: "/opportunities",
  },
];

export default function ACHKOHome() {
  const [activeTab, setActiveTab] = useState("Home");
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Zote");
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);
  const [newPost, setNewPost] = useState("");
  const [postCategory, setPostCategory] = useState("Biashara");
  const [commentText, setCommentText] = useState("");
  const [commentPostId, setCommentPostId] = useState<number | null>(null);
  const [comments, setComments] = useState<Record<number, string[]>>({});
  const [profileName, setProfileName] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [notifications, setNotifications] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState("");
  const [shortTitle, setShortTitle] = useState("");
  const [shorts, setShorts] = useState<string[]>([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  function notify(message: string) {
    setNotifications((previous) => [message, ...previous].slice(0, 5));
  }

  function toggleLike(id: number) {
    setPosts((previous) =>
      previous.map((post) =>
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
    setPosts((previous) =>
      previous.map((post) =>
        post.id === id ? { ...post, saved: !post.saved } : post
      )
    );
  }

  function createPost() {
    if (!newPost.trim()) {
      notify("Andika ujumbe wako kwanza.");
      return;
    }

    const post: Post = {
      id: Date.now(),
      author: profileName.trim() || "A-CHKO Member",
      category: postCategory,
      text: newPost.trim(),
      likes: 0,
      comments: 0,
      liked: false,
      saved: false,
    };

    setPosts((previous) => [post, ...previous]);
    setNewPost("");
    setActiveTab("Home");
    notify("Post imeongezwa kwenye feed ya kifaa hiki.");
  }

  function addComment(postId: number) {
    if (!commentText.trim()) return;

    setComments((previous) => ({
      ...previous,
      [postId]: [...(previous[postId] || []), commentText.trim()],
    }));

    setPosts((previous) =>
      previous.map((post) =>
        post.id === postId
          ? { ...post, comments: post.comments + 1 }
          : post
      )
    );

    setCommentText("");
    setCommentPostId(null);
  }

  function toggleGroup(group: string) {
    const alreadyJoined = joinedGroups.includes(group);

    setJoinedGroups((previous) =>
      alreadyJoined
        ? previous.filter((item) => item !== group)
        : [...previous, group]
    );

    notify(alreadyJoined ? `Umeondoka: ${group}` : `Umejiunga: ${group}`);
  }

  function createShort() {
    if (!shortTitle.trim()) {
      notify("Andika maelezo ya video yako kwanza.");
      return;
    }

    setShorts((previous) => [shortTitle.trim(), ...previous]);
    setShortTitle("");
    notify("Video post imeongezwa kama maandishi. Upload ya video halisi inahitaji kuhifadhi faili.");
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.text.toLowerCase().includes(search.toLowerCase()) ||
      post.author.toLowerCase().includes(search.toLowerCase()) ||
      post.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "Zote" ||
      post.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const navItems = [
    { label: "Home", icon: Home },
    { label: "Discover", icon: Search },
    { label: "Create", icon: PlusSquare },
    { label: "Communities", icon: Users },
    { label: "Profile", icon: UserCircle },
  ];

  function goToPage(path: string) {
    window.location.href = path;
  }

  return (
    <main className="achko-app">
      <header className="achko-header">
        <button
          className="achko-icon-button mobile-menu-button"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          aria-label="Fungua menu"
        >
          {showMobileMenu ? <X /> : <Menu />}
        </button>

        <button
          className="achko-logo"
          onClick={() => setActiveTab("Home")}
        >
          <span className="achko-logo-mark">A</span>
          <span>A-CHKO</span>
        </button>

        <div className="achko-header-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tafuta watu, makundi, posts na fursa..."
          />
        </div>

        <button
          className="achko-icon-button"
          onClick={() => setActiveTab("Notifications")}
          aria-label="Notifications"
        >
          <Bell size={21} />
          {notifications.length > 0 && (
            <span className="achko-notification-dot" />
          )}
        </button>

        <button
          className="achko-profile-small"
          onClick={() => setActiveTab("Profile")}
        >
          {profileName.trim() ? profileName.trim().charAt(0).toUpperCase() : "A"}
        </button>
      </header>

      <div className="achko-layout">
        <aside className={`achko-sidebar ${showMobileMenu ? "open" : ""}`}>
          <div className="achko-sidebar-section">
            <p className="achko-sidebar-label">MENU</p>

            {navItems.map((item) => (
              <button
                key={item.label}
                className={`achko-nav-item ${
                  activeTab === item.label ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab(item.label);
                  setShowMobileMenu(false);
                }}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}

            <button
              className={`achko-nav-item ${
                activeTab === "Opportunities" ? "active" : ""
              }`}
              onClick={() => goToPage("/opportunities")}
            >
              <BriefcaseBusiness size={20} />
              <span>Opportunities</span>
            </button>

            <button
              className={`achko-nav-item ${
                activeTab === "CV Builder" ? "active" : ""
              }`}
              onClick={() => goToPage("/cv-builder")}
            >
              <FileText size={20} />
              <span>CV Builder</span>
            </button>

            <button
              className={`achko-nav-item ${
                activeTab === "Shorts" ? "active" : ""
              }`}
              onClick={() => setActiveTab("Shorts")}
            >
              <Video size={20} />
              <span>A-CHKO Shorts</span>
            </button>
          </div>

          <div className="achko-sidebar-section">
            <p className="achko-sidebar-label">MAKUNDI YAKO</p>

            {groups.slice(0, 5).map((group) => (
              <button
                key={group}
                className="achko-group-shortcut"
                onClick={() => setActiveTab("Communities")}
              >
                <span className="achko-group-avatar">
                  {group.charAt(0)}
                </span>
                <span>{group}</span>
              </button>
            ))}

            <button
              className="achko-text-link"
              onClick={() => setActiveTab("Communities")}
            >
              Angalia makundi yote <ChevronRight size={16} />
            </button>
          </div>

          <div className="achko-sidebar-footer">
            Watch, connect and discover opportunities.
            <br />
            <span>A-CHKO © 2026</span>
          </div>
        </aside>

        <section className="achko-main">
          {activeTab === "Home" && (
            <>
              <div className="achko-welcome">
                <div>
                  <p className="achko-eyebrow">KARIBU A-CHKO</p>
                  <h1>Watch. Connect. Discover.</h1>
                  <p>
                    Ungana na watu, shiriki mawazo na gundua fursa zinazokusaidia
                    kukua.
                  </p>
                </div>

                <div className="achko-welcome-icon">
                  <Globe size={48} />
                </div>
              </div>

              <div className="achko-quick-links">
                <button onClick={() => setActiveTab("Create")}>
                  <PlusSquare />
                  <span>Create post</span>
                </button>

                <button onClick={() => goToPage("/opportunities")}>
                  <BriefcaseBusiness />
                  <span>Tafuta fursa</span>
                </button>

                <button onClick={() => goToPage("/cv-builder")}>
                  <FileText />
                  <span>Tengeneza CV</span>
                </button>

                <button onClick={() => setActiveTab("Communities")}>
                  <Users />
                  <span>Jiunge na makundi</span>
                </button>
              </div>

              <div className="achko-section-heading">
                <div>
                  <h2>Feed yako</h2>
                  <p>Machapisho kutoka kwenye jamii ya A-CHKO.</p>
                </div>

                <button
                  className="achko-button achko-button-primary"
                  onClick={() => setActiveTab("Create")}
                >
                  <PlusSquare size={17} /> Tengeneza post
                </button>
              </div>

              <div className="achko-category-row">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`achko-chip ${
                      selectedCategory === category ? "selected" : ""
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="achko-feed">
                {filteredPosts.map((post) => (
                  <article className="achko-post" key={post.id}>
                    <div className="achko-post-header">
                      <div className="achko-post-avatar">
                        {post.author.charAt(0).toUpperCase()}
                      </div>

                      <div className="achko-post-author">
                        <strong>{post.author}</strong>
                        <span>{post.category} · A-CHKO</span>
                      </div>

                      <button
                        className="achko-icon-button"
                        onClick={() => toggleSave(post.id)}
                        aria-label="Hifadhi post"
                      >
                        <Bookmark
                          size={19}
                          fill={post.saved ? "currentColor" : "none"}
                        />
                      </button>
                    </div>

                    <p className="achko-post-text">{post.text}</p>

                    <div className="achko-post-stats">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>

                    <div className="achko-post-actions">
                      <button
                        className={post.liked ? "liked" : ""}
                        onClick={() => toggleLike(post.id)}
                      >
                        <Heart
                          size={19}
                          fill={post.liked ? "currentColor" : "none"}
                        />
                        Like
                      </button>

                      <button
                        onClick={() =>
                          setCommentPostId(
                            commentPostId === post.id ? null : post.id
                          )
                        }
                      >
                        <MessageCircle size={19} />
                        Comment
                      </button>

                      <button
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(post.text);
                            notify("Maandishi ya post yamenakiliwa.");
                          } catch {
                            notify("Nakili maandishi ya post kwa mkono.");
                          }
                        }}
                      >
                        <Share2 size={19} />
                        Share
                      </button>
                    </div>

                    {commentPostId === post.id && (
                      <div className="achko-comment-box">
                        <input
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Andika comment..."
                        />
                        <button onClick={() => addComment(post.id)}>
                          <Send size={17} />
                        </button>
                      </div>
                    )}

                    {(comments[post.id] || []).map((comment, index) => (
                      <div className="achko-comment" key={index}>
                        <strong>
                          {profileName.trim() || "A-CHKO Member"}
                        </strong>
                        <p>{comment}</p>
                      </div>
                    ))}
                  </article>
                ))}

                {filteredPosts.length === 0 && (
                  <div className="achko-empty">
                    Hakuna post inayolingana na utafutaji wako.
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === "Discover" && (
            <div className="achko-page-section">
              <p className="achko-eyebrow">GUNDUA</p>
              <h1>Discover opportunities & interests</h1>
              <p className="achko-muted">
                Tafuta mada, watu, communities na fursa unazopenda.
              </p>

              <div className="achko-discover-grid">
                {[
                  { title: "Ajira", icon: BriefcaseBusiness },
                  { title: "Scholarships", icon: GraduationCap },
                  { title: "Biashara", icon: Globe },
                  { title: "Michezo", icon: Trophy },
                  { title: "Muziki", icon: Music },
                  { title: "Teknolojia", icon: Code },
                  { title: "Gaming", icon: Gamepad2 },
                  { title: "Photography", icon: Camera },
                ].map((item) => (
                  <button
                    key={item.title}
                    className="achko-discover-card"
                    onClick={() => {
                      if (
                        item.title === "Ajira" ||
                        item.title === "Scholarships"
                      ) {
                        goToPage("/opportunities");
                      } else {
                        setSelectedCategory(item.title);
                        setActiveTab("Home");
                      }
                    }}
                  >
                    <item.icon size={27} />
                    <strong>{item.title}</strong>
                    <span>Gundua zaidi <ChevronRight size={15} /></span>
                  </button>
                ))}
              </div>

              <h2>Fursa za kuchunguza</h2>

              {opportunities.map((item) => (
                <button
                  key={item.title}
                  className="achko-opportunity-card"
                  onClick={() => goToPage(item.href)}
                >
                  <item.icon size={25} />
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </div>
                  <ChevronRight />
                </button>
              ))}
            </div>
          )}

          {activeTab === "Create" && (
            <div className="achko-page-section">
              <p className="achko-eyebrow">SHIRIKI NA JAMII</p>
              <h1>Tengeneza post</h1>

              <div className="achko-card">
                <label className="achko-label">
                  Jina litakaloonekana
                  <input
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="Jina lako"
                  />
                </label>

                <label className="achko-label">
                  Chagua category
                  <select
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value)}
                  >
                    {categories
                      .filter((item) => item !== "Zote")
                      .map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                  </select>
                </label>

                <label className="achko-label">
                  Una mawazo gani ya kushiriki?
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    rows={6}
                    placeholder="Andika post yako hapa..."
                  />
                </label>

                <div className="achko-create-tools">
                  <label className="achko-upload-button">
                    <ImageIcon size={20} />
                    Chagua picha/video
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={(e) =>
                        setUploadedFile(e.target.files?.[0]?.name || "")
                      }
                      hidden
                    />
                  </label>

                  {uploadedFile && (
                    <span className="achko-upload-name">
                      {uploadedFile}
                      <button
                        onClick={() => setUploadedFile("")}
                        aria-label="Ondoa faili"
                      >
                        <Trash2 size={15} />
                      </button>
                    </span>
                  )}
                </div>

                <button
                  className="achko-button achko-button-primary achko-full"
                  onClick={createPost}
                >
                  <PlusSquare size={18} /> Chapisha post
                </button>

                <p className="achko-muted achko-small">
                  Kwa sasa post inaongezwa kwenye feed ya ukurasa huu tu.
                  Picha/video hazipandishwi kwenye seva hadi upload service
                  iunganishwe.
                </p>
              </div>
            </div>
          )}

          {activeTab === "Communities" && (
            <div className="achko-page-section">
              <p className="achko-eyebrow">UNGANA NA WENGINE</p>
              <h1>Communities</h1>
              <p className="achko-muted">
                Chagua makundi yanayolingana na malengo na maslahi yako.
              </p>

              <div className="achko-community-stats">
                <div>
                  <strong>{groups.length}</strong>
                  <span>Makundi yanayopatikana</span>
                </div>
                <div>
                  <strong>{joinedGroups.length}</strong>
                  <span>Makundi uliyojiunga nayo</span>
                </div>
              </div>

              <div className="achko-community-grid">
                {groups.map((group) => {
                  const joined = joinedGroups.includes(group);

                  return (
                    <article className="achko-community-card" key={group}>
                      <div className="achko-community-icon">
                        <Users size={24} />
                      </div>

                      <h3>{group}</h3>
                      <p>Ungana na watu wenye maslahi yanayofanana.</p>

                      <button
                        className={`achko-button ${
                          joined
                            ? "achko-button-joined"
                            : "achko-button-primary"
                        }`}
                        onClick={() => toggleGroup(group)}
                      >
                        {joined ? "Umejiunga ✓" : "Join group"}
                      </button>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "Profile" && (
            <div className="achko-page-section">
              <p className="achko-eyebrow">AKAUNTI YAKO</p>
              <h1>Profile</h1>

              <div className="achko-card achko-profile-card">
                <div className="achko-profile-avatar">
                  {profileName.trim()
                    ? profileName.trim().charAt(0).toUpperCase()
                    : "A"}
                </div>

                <label className="achko-label">
                  Jina lako
                  <input
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="Ingiza jina lako"
                  />
                </label>

                <label className="achko-label">
                  Bio / kuhusu wewe
                  <textarea
                    value={profileBio}
                    onChange={(e) => setProfileBio(e.target.value)}
                    rows={4}
                    placeholder="Eleza kuhusu wewe, ujuzi wako na malengo yako..."
                  />
                </label>

                <div className="achko-profile-stats">
                  <div>
                    <strong>{posts.length}</strong>
                    <span>Posts zinazoonekana</span>
                  </div>
                  <div>
                    <strong>{joinedGroups.length}</strong>
                    <span>Groups ulizojiunga nazo</span>
                  </div>
                  <div>
                    <strong>
                      {posts.filter((post) => post.saved).length}
                    </strong>
                    <span>Saved posts</span>
                  </div>
                </div>

                <button
                  className="achko-button achko-button-primary achko-full"
                  onClick={() => notify("Taarifa za profile zimebadilishwa kwenye ukurasa huu.")}
                >
                  Hifadhi mabadiliko
                </button>

                <p className="achko-muted achko-small">
                  Profile hii bado haijaunganishwa na mfumo wa login au
                  database ya Supabase.
                </p>
              </div>

              <div className="achko-card">
                <h2>Vifaa vya akaunti</h2>

                <button
                  className="achko-setting-row"
                  onClick={() => goToPage("/cv-builder")}
                >
                  <FileText />
                  <span>
                    <strong>CV Builder</strong>
                    <small>Tengeneza na hariri CV yako.</small>
                  </span>
                  <ChevronRight />
                </button>

                <button
                  className="achko-setting-row"
                  onClick={() => goToPage("/opportunities")}
                >
                  <BriefcaseBusiness />
                  <span>
                    <strong>Opportunities</strong>
                    <small>Tafuta ajira, scholarships na internships.</small>
                  </span>
                  <ChevronRight />
                </button>
              </div>
            </div>
          )}

          {activeTab === "Shorts" && (
            <div className="achko-page-section">
              <p className="achko-eyebrow">A-CHKO SHORTS</p>
              <h1>Video fupi na ubunifu</h1>
              <p className="achko-muted">
                Shiriki mawazo, burudani, vipaji na mafunzo mafupi.
              </p>

              <div className="achko-card">
                <label className="achko-label">
                  Maelezo ya video yako
                  <textarea
                    value={shortTitle}
                    onChange={(e) => setShortTitle(e.target.value)}
                    rows={3}
                    placeholder="Mfano: Jinsi nilivyoanza biashara yangu..."
                  />
                </label>

                <button
                  className="achko-button achko-button-primary"
                  onClick={createShort}
                >
                  <Video size={18} /> Ongeza Short
                </button>

                <p className="achko-muted achko-small">
                  Hii inaongeza maelezo ya post tu, si video halisi.
                  Mfumo wa kupakia, kucheza na kushiriki video unahitaji
                  storage na backend.
                </p>
              </div>

              {shorts.map((short, index) => (
                <article className="achko-post" key={`${short}-${index}`}>
                  <Video size={24} />
                  <p>{short}</p>
                  <div className="achko-post-actions">
                    <button onClick={() => notify("Like ya Short imepokelewa kwenye ukurasa huu.")}>
                      <Heart size={18} /> Like
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(short);
                          notify("Maelezo yamenakiliwa.");
                        } catch {
                          notify("Nakili maelezo kwa mkono.");
                        }
                      }}
                    >
                      <Share2 size={18} /> Share
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {activeTab === "Notifications" && (
            <div className="achko-page-section">
              <h1>Notifications</h1>
              {notifications.length === 0 ? (
                <div className="achko-empty">
                  Bado hakuna taarifa mpya.
                </div>
              ) : (
                notifications.map((item, index) => (
                  <div className="achko-notification" key={index}>
                    <Bell size={19} />
                    <span>{item}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </section>

        <aside className="achko-right-sidebar">
          <div className="achko-right-card">
            <h3>Gundua fursa</h3>
            {opportunities.map((item) => (
              <button
                className="achko-right-link"
                key={item.title}
                onClick={() => goToPage(item.href)}
              >
                <item.icon size={19} />
                <span>{item.title}</span>
                <ChevronRight size={16} />
              </button>
            ))}
            <button
              className="achko-text-link"
              onClick={() => goToPage("/opportunities")}
            >
              Fursa zote <ExternalLink size={15} />
            </button>
          </div>

          <div className="achko-right-card">
            <h3>Makundi maarufu</h3>
            {groups.slice(0, 6).map((group) => (
              <div className="achko-popular-group" key={group}>
                <span className="achko-group-avatar">
                  {group.charAt(0)}
                </span>
                <span>{group}</span>
                <button
                  onClick={() => toggleGroup(group)}
                  aria-label={`Jiunge na ${group}`}
                >
                  {joinedGroups.includes(group) ? "✓" : "+"}
                </button>
              </div>
            ))}
            <button
              className="achko-text-link"
              onClick={() => setActiveTab("Communities")}
            >
              Angalia yote <ChevronRight size={15} />
            </button>
          </div>

          <div className="achko-right-card achko-cv-promo">
            <FileText size={28} />
            <h3>Unahitaji CV?</h3>
            <p>Tengeneza CV yako ya kitaalamu ndani ya A-CHKO.</p>
            <button
              className="achko-button achko-button-primary achko-full"
              onClick={() => goToPage("/cv-builder")}
            >
              Fungua CV Builder
            </button>
          </div>

          <div className="achko-right-card">
            <h3>Kujiunga na A-CHKO</h3>
            <p className="achko-muted">
              Mfumo wa usajili unahitaji kuunganishwa na Supabase Auth.
            </p>
            <button
              className="achko-button achko-button-secondary achko-full"
              onClick={() =>
                notify("Usajili na login bado havijaunganishwa na Supabase.")
              }
            >
              <LogIn size={17} /> Login / Sign up
            </button>
          </div>
        </aside>
      </div>

      <nav className="achko-bottom-nav">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={activeTab === item.label ? "active" : ""}
            onClick={() => setActiveTab(item.label)}
          >
            <item.icon size={21} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </main>
  );
}
