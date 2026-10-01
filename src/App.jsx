import { useMemo, useState } from "react";
import "./App.css";

const initialPosts = [
  {
    id: 1,
    name: "Aisha Kamau",
    handle: "@aishakamau",
    time: "2h",
    avatar: "https://i.pravatar.cc/150?img=47",
    text: "Just finished building my first React dashboard. The feeling when everything finally works is unmatched! 🚀",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
    replies: 24,
    reposts: 38,
    likes: 287,
    views: 12400,
    liked: false,
    reposted: false,
  },
  {
    id: 2,
    name: "David Mwangi",
    handle: "@davidmwangi",
    time: "4h",
    avatar: "https://i.pravatar.cc/150?img=12",
    text: "Good software isn't only about writing code. It's about understanding the people who will use it.",
    replies: 16,
    reposts: 52,
    likes: 421,
    views: 18700,
    liked: false,
    reposted: false,
  },
  {
    id: 3,
    name: "Tech Daily",
    handle: "@techdaily",
    time: "6h",
    avatar: "https://i.pravatar.cc/150?img=13",
    text: "Web development continues to evolve quickly. React, TypeScript, AI tools and modern CSS are changing how developers build products.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80",
    replies: 71,
    reposts: 129,
    likes: 968,
    views: 45200,
    liked: false,
    reposted: false,
  },
  {
    id: 4,
    name: "Brian Otieno",
    handle: "@brianotieno",
    time: "8h",
    avatar: "https://i.pravatar.cc/150?img=33",
    text: "Consistency beats motivation. Spend a little time learning every day and look back after six months. The progress will surprise you.",
    replies: 31,
    reposts: 84,
    likes: 632,
    views: 24100,
    liked: false,
    reposted: false,
  },
  {
    id: 5,
    name: "Sarah Wanjiku",
    handle: "@sarahw",
    time: "1d",
    avatar: "https://i.pravatar.cc/150?img=32",
    text: "Coffee ☕ + headphones 🎧 + a good coding session = a productive afternoon.",
    replies: 12,
    reposts: 23,
    likes: 214,
    views: 8900,
    liked: false,
    reposted: false,
  },
];

const trends = [
  { category: "Technology · Trending", title: "#ReactJS", posts: "18.4K posts" },
  { category: "Trending in Kenya", title: "Nairobi", posts: "9,821 posts" },
  { category: "Technology · Trending", title: "Artificial Intelligence", posts: "42.7K posts" },
  { category: "Business · Trending", title: "Startups", posts: "12.3K posts" },
  { category: "Sports · Trending", title: "Football", posts: "31.9K posts" },
];

const suggestedUsers = [
  {
    id: 1,
    name: "React",
    handle: "@reactjs",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 2,
    name: "GitHub",
    handle: "@github",
    avatar: "https://i.pravatar.cc/150?img=68",
  },
  {
    id: 3,
    name: "Vercel",
    handle: "@vercel",
    avatar: "https://i.pravatar.cc/150?img=56",
  },
];

function Icon({ name, size = 22 }) {
  const icons = {
    home: (
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <path d="M3 11.5 12 4l9 7.5v8a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
      </svg>
    ),
    search: (
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <circle cx="11" cy="11" r="7" />
        <path d="m16.5 16.5 4 4" />
      </svg>
    ),
    bell: (
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
      </svg>
    ),
    message: (
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <path d="M20 11.5a8 8 0 0 1-8 8 8.8 8.8 0 0 1-3.7-.8L4 20l1.3-3.8A8 8 0 1 1 20 11.5Z" />
      </svg>
    ),
    bookmark: (
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-4-6 4z" />
      </svg>
    ),
    user: (
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </svg>
    ),
    more: (
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <circle cx="5" cy="12" r="1.5" />
        <circle cx="12" cy="12" r="1.5" />
        <circle cx="19" cy="12" r="1.5" />
      </svg>
    ),
    comment: (
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <path d="M20 11.5a8 8 0 0 1-8 8 8.8 8.8 0 0 1-3.7-.8L4 20l1.3-3.8A8 8 0 1 1 20 11.5Z" />
      </svg>
    ),
    repost: (
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <path d="M17 3l4 4-4 4M3 7h18M7 21l-4-4 4-4M21 17H3" />
      </svg>
    ),
    heart: (
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <path d="M20.8 8.8c0 5.5-8.8 10.2-8.8 10.2S3.2 14.3 3.2 8.8A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z" />
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <path d="M4 19V5M4 19h17M8 16v-4M12 16V8M16 16v-6M20 16V4" />
      </svg>
    ),
    share: (
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <path d="M12 16V4M7 9l5-5 5 5M5 13v6h14v-6" />
      </svg>
    ),
    image: (
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="8" cy="9" r="1.5" />
        <path d="m4 18 5-5 3 3 2-2 6 5" />
      </svg>
    ),
    smile: (
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
      </svg>
    ),
    sun: (
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
    moon: (
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />
      </svg>
    ),
    close: (
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <path d="m6 6 12 12M18 6 6 18" />
      </svg>
    ),
  };

  return <span className="icon">{icons[name]}</span>;
}

function Logo() {
  return (
    <div className="logo">
      <span>𝕏</span>
    </div>
  );
}

function Sidebar({ active, setActive }) {
  const items = [
    ["home", "Home"],
    ["search", "Explore"],
    ["bell", "Notifications"],
    ["message", "Messages"],
    ["bookmark", "Bookmarks"],
    ["user", "Profile"],
    ["more", "More"],
  ];

  return (
    <aside className="left-sidebar">
      <Logo />

      <nav className="main-nav">
        {items.map(([icon, label]) => (
          <button
            className={`nav-item ${active === label ? "active" : ""}`}
            key={label}
            onClick={() => setActive(label)}
          >
            <Icon name={icon} size={25} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <button className="post-sidebar-button">Post</button>

      <div className="profile-mini">
        <img src="https://i.pravatar.cc/150?img=68" alt="Profile" />
        <div>
          <strong>Mohamed Amin</strong>
          <span>@mohamedamin</span>
        </div>
        <Icon name="more" size={20} />
      </div>
    </aside>
  );
}

function PostComposer({ avatar, onAddPost }) {
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);

  const submitPost = () => {
    if (!text.trim()) return;

    onAddPost(text.trim());
    setText("");
    setFocused(false);
  };

  return (
    <div className="composer">
      <img className="avatar" src={avatar} alt="Your profile" />

      <div className="composer-main">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="What is happening?!"
          rows={focused || text ? 3 : 1}
        />

        {(focused || text) && (
          <div className="composer-footer">
            <div className="composer-tools">
              <button title="Add image">
                <Icon name="image" size={20} />
              </button>
              <button title="Add emoji">
                <Icon name="smile" size={20} />
              </button>
            </div>

            <button
              className="post-button"
              disabled={!text.trim()}
              onClick={submitPost}
            >
              Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ActionButton({
  icon,
  count,
  active,
  activeClass,
  onClick,
  title,
}) {
  return (
    <button
      className={`action-button ${active ? activeClass : ""}`}
      onClick={onClick}
      title={title}
    >
      <Icon name={icon} size={19} />
      <span>{count}</span>
    </button>
  );
}

function PostCard({ post, onUpdate }) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [shared, setShared] = useState(false);

  const toggleLike = () => {
    onUpdate(post.id, {
      liked: !post.liked,
      likes: post.liked ? post.likes - 1 : post.likes + 1,
    });
  };

  const toggleRepost = () => {
    onUpdate(post.id, {
      reposted: !post.reposted,
      reposts: post.reposted ? post.reposts - 1 : post.reposts + 1,
    });
  };

  const submitReply = () => {
    if (!replyText.trim()) return;

    onUpdate(post.id, {
      replies: post.replies + 1,
    });

    setReplyText("");
    setShowReply(false);
  };

  const sharePost = async () => {
    setShared(true);

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(post.text);
      } catch {
        // Clipboard may be unavailable in some browsers.
      }
    }

    setTimeout(() => setShared(false), 1800);
  };

  return (
    <article className="post-card">
      <img className="avatar" src={post.avatar} alt={post.name} />

      <div className="post-content">
        <div className="post-header">
          <div className="post-author">
            <strong>{post.name}</strong>
            <span>{post.handle}</span>
            <span>·</span>
            <span>{post.time}</span>
          </div>

          <button className="more-button">
            <Icon name="more" size={20} />
          </button>
        </div>

        <p className="post-text">{post.text}</p>

        {post.image && (
          <img className="post-image" src={post.image} alt="Post content" />
        )}

        <div className="post-actions">
          <ActionButton
            icon="comment"
            count={post.replies}
            onClick={() => setShowReply(!showReply)}
            title="Reply"
          />

          <ActionButton
            icon="repost"
            count={post.reposts}
            active={post.reposted}
            activeClass="reposted"
            onClick={toggleRepost}
            title="Repost"
          />

          <ActionButton
            icon="heart"
            count={post.likes}
            active={post.liked}
            activeClass="liked"
            onClick={toggleLike}
            title="Like"
          />

          <ActionButton
            icon="chart"
            count={post.views}
            onClick={() => {}}
            title="Views"
          />

          <button
            className={`action-button share-button ${
              shared ? "shared" : ""
            }`}
            onClick={sharePost}
            title="Share"
          >
            <Icon name={shared ? "bookmark" : "share"} size={19} />
            <span>{shared ? "Copied" : ""}</span>
          </button>
        </div>

        {showReply && (
          <div className="reply-box">
            <img
              className="small-avatar"
              src="https://i.pravatar.cc/150?img=68"
              alt="You"
            />

            <input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Post your reply"
              onKeyDown={(e) => {
                if (e.key === "Enter") submitReply();
              }}
            />

            <button
              className="reply-button"
              disabled={!replyText.trim()}
              onClick={submitReply}
            >
              Reply
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

function RightSidebar({ search, setSearch, followed, setFollowed }) {
  const filteredTrends = trends.filter((trend) =>
    `${trend.title} ${trend.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <aside className="right-sidebar">
      <div className="search-box">
        <Icon name="search" size={20} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
        {search && (
          <button onClick={() => setSearch("")}>
            <Icon name="close" size={17} />
          </button>
        )}
      </div>

      <section className="side-card">
        <h2>What's happening</h2>

        {filteredTrends.length > 0 ? (
          filteredTrends.map((trend, index) => (
            <div className="trend-item" key={index}>
              <span>{trend.category}</span>
              <strong>{trend.title}</strong>
              <span>{trend.posts}</span>
            </div>
          ))
        ) : (
          <p className="empty-search">No trends found.</p>
        )}

        <button className="show-more">Show more</button>
      </section>

      <section className="side-card">
        <h2>Who to follow</h2>

        {suggestedUsers.map((user) => (
          <div className="follow-item" key={user.id}>
            <img src={user.avatar} alt={user.name} />

            <div className="follow-info">
              <strong>{user.name}</strong>
              <span>{user.handle}</span>
            </div>

            <button
              className={`follow-button ${
                followed[user.id] ? "following" : ""
              }`}
              onClick={() =>
                setFollowed((prev) => ({
                  ...prev,
                  [user.id]: !prev[user.id],
                }))
              }
            >
              {followed[user.id] ? "Following" : "Follow"}
            </button>
          </div>
        ))}

        <button className="show-more">Show more</button>
      </section>

      <footer className="side-footer">
        <span>Terms of Service</span>
        <span>Privacy Policy</span>
        <span>Cookie Policy</span>
        <span>Accessibility</span>
        <span>© 2026 Pulse</span>
      </footer>
    </aside>
  );
}

function MobileNav({ active, setActive }) {
  const items = [
    ["home", "Home"],
    ["search", "Explore"],
    ["bell", "Notifications"],
    ["message", "Messages"],
    ["user", "Profile"],
  ];

  return (
    <nav className="mobile-nav">
      {items.map(([icon, label]) => (
        <button
          key={label}
          className={active === label ? "active" : ""}
          onClick={() => setActive(label)}
        >
          <Icon name={icon} size={23} />
        </button>
      ))}
    </nav>
  );
}

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [active, setActive] = useState("Home");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const [followed, setFollowed] = useState({
    1: false,
    2: false,
    3: false,
  });

  const currentUserAvatar = "https://i.pravatar.cc/150?img=68";

  const addPost = (text) => {
    const newPost = {
      id: Date.now(),
      name: "Mohamed Amin",
      handle: "@mohamedamin",
      time: "now",
      avatar: currentUserAvatar,
      text,
      replies: 0,
      reposts: 0,
      likes: 0,
      views: 0,
      liked: false,
      reposted: false,
    };

    setPosts((prev) => [newPost, ...prev]);
  };

  const updatePost = (id, updates) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, ...updates } : post))
    );
  };

  const filteredPosts = useMemo(() => {
    if (!search.trim()) return posts;

    const query = search.toLowerCase();

    return posts.filter(
      (post) =>
        post.text.toLowerCase().includes(query) ||
        post.name.toLowerCase().includes(query) ||
        post.handle.toLowerCase().includes(query)
    );
  }, [posts, search]);

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="layout">
        <Sidebar active={active} setActive={setActive} />

        <main className="feed">
          <header className="feed-header">
            <div>
              <h1>{active === "Home" ? "Home" : active}</h1>
              <span className="header-subtitle">
                {active === "Home"
                  ? "Your latest updates"
                  : `${active} section`}
              </span>
            </div>

            <button
              className="theme-button"
              onClick={() => setDarkMode(!darkMode)}
              title="Toggle theme"
            >
              <Icon name={darkMode ? "sun" : "moon"} size={20} />
            </button>
          </header>

          {active === "Home" ? (
            <>
              <PostComposer avatar={currentUserAvatar} onAddPost={addPost} />

              {search && (
                <div className="search-result-info">
                  Showing results for <strong>"{search}"</strong>
                  <button onClick={() => setSearch("")}>Clear</button>
                </div>
              )}

              <section className="posts">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onUpdate={updatePost}
                    />
                  ))
                ) : (
                  <div className="no-posts">
                    <h2>No posts found</h2>
                    <p>Try searching for another word or topic.</p>
                  </div>
                )}
              </section>
            </>
          ) : (
            <div className="section-placeholder">
              <div className="placeholder-icon">
                <Icon
                  name={
                    active === "Explore"
                      ? "search"
                      : active === "Notifications"
                      ? "bell"
                      : active === "Messages"
                      ? "message"
                      : active === "Bookmarks"
                      ? "bookmark"
                      : "user"
                  }
                  size={38}
                />
              </div>
              <h2>{active}</h2>
              <p>
                This section is ready for additional functionality in a larger
                social-media application.
              </p>
              <button onClick={() => setActive("Home")}>
                Back to Home
              </button>
            </div>
          )}
        </main>

        <RightSidebar
          search={search}
          setSearch={setSearch}
          followed={followed}
          setFollowed={setFollowed}
        />
      </div>

      <MobileNav active={active} setActive={setActive} />

      <button className="mobile-post-button" onClick={() => setActive("Home")}>
        +
      </button>
    </div>
  );
}

export default App;