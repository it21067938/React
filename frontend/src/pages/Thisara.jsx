import { useEffect, useState } from "react";

export default function Thisara() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://we.heartfm.lk/wp-json/wp/v2/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-center mb-8">Latest Posts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-200"
          >
            <h2
              className="text-xl font-semibold p-4"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            <p
              className="px-4 pb-4 text-gray-600"
              dangerouslySetInnerHTML={{
                __html: post.excerpt.rendered.slice(0, 150) + "...",
              }}
            />

            <div className="p-4">
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
