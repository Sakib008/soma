import { useEffect, useRef, useState } from "react";

import { usePost } from "../../Context/PostContext";
import Post from "../../components/Post";
import { useScrollToTop } from "../../utils/hooks/useScrollToTop";

const Explore = () => {
  const { getAllPost, state } = usePost();
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // useRef hooks for various functionalities
  const containerRef = useRef(null);
  const loadingRef = useRef(null);
  
  // Custom hooks using useRef
  const { scrollTargetRef, scrollToTop } = useScrollToTop();
  
  // Track previous post count
  const currentPostCount = state?.posts?.all?.length || 0;
  console.log("User Profile : ",state.profile)

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        await getAllPost();
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTargetRef.current) {
        const scrollTop = scrollTargetRef.current.scrollTop;
        setShowScrollTop(scrollTop > 300);
      }
    };

    const scrollElement = scrollTargetRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [scrollTargetRef]);

  // Auto-scroll to top when new posts are loaded
  useEffect(() => {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        scrollToTop('smooth');
      }, 100);
    }
  ,[]);

  return (
    <div className="relative">
    

      {/* Main content with scroll functionality */}
      <div 
        ref={scrollTargetRef}
        className="h-full "
        style={{ 
          scrollBehavior: 'smooth'
        }}
      >
        <div ref={containerRef} className="p-4">
          {/* Loading indicator */}
          {isLoading && (
            <div 
              ref={loadingRef}
              className="flex justify-center items-center py-8"
            >
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2">Loading posts...</span>
            </div>
          )}

          {/* Posts grid */}
          <div className="grid gap-4">
            {state?.posts?.all?.map((post) => (
              <Post myPost={post} key={post._id} />
            ))}
          </div>

          {/* Empty state */}
          {!isLoading && (!state?.posts?.all || state.posts.all.length === 0) && (
            <div className="text-center py-8 text-gray-500">
              <p>No posts found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
