import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import FeedHeader from '../components/feed/FeedHeader';
import SearchBar from '../components/feed/SearchBar';
import FeedFilters from '../components/feed/FeedFilters';
import FeedSkeleton from '../components/feed/FeedSkeleton';
import PostCard from '../components/feed/PostCard';
import CreatePostCard from '../components/post/CreatePostCard';
import usePostStore from '../store/postStore';

const FeedPage = () => {
  const posts = usePostStore((state) => state.posts);
  const isLoading = usePostStore((state) => state.isLoading);
  const fetchPosts = usePostStore((state) => state.fetchPosts);

  // Search state integration
  const searchQuery = usePostStore((state) => state.searchQuery);
  const searchResults = usePostStore((state) => state.searchResults);
  const isSearching = usePostStore((state) => state.isSearching);

  // Determine active dataset to display
  const isSearchActive = searchQuery.trim().length >= 2;
  const displayPosts = isSearchActive ? searchResults : posts;
  const displayLoading = isSearchActive ? isSearching : isLoading;

  // Load feed posts on page mount
  useEffect(() => {
    fetchPosts(1, 10, false);
  }, [fetchPosts]);

  return (
    <Box sx={{ bgcolor: 'var(--background)', minHeight: '100vh', pb: 4, pt: '80px' }}>
      {/* Header bar */}
      <FeedHeader />

      {/* Main Content Layout Container */}
      <Box 
        component="main" 
        sx={{ 
          maxWidth: '800px', 
          mx: 'auto', 
          px: { xs: 2, md: 0 }, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 3 
        }}
      >
        {/* Search Input Card */}
        <SearchBar />

        {/* Create Post Card Component */}
        <CreatePostCard />

        {/* Filter Chips Selection Bar */}
        <FeedFilters />

        {/* Post Feed List / Skeletal Loader switcher */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {displayLoading ? (
            <FeedSkeleton />
          ) : displayPosts.length > 0 ? (
            displayPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))
          ) : (
            <Box 
              sx={{
                bgcolor: 'var(--surface-container-lowest)',
                borderRadius: '16px',
                border: '1px solid rgba(193, 198, 215, 0.3)',
                p: 6,
                textAlign: 'center',
                boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.04)'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '40px', color: 'var(--on-surface-variant)', marginBottom: '8px' }}>
                {isSearchActive ? 'search_off' : 'forum'}
              </span>
              <Typography sx={{ fontFamily: 'Inter', fontSize: '15px', color: 'var(--on-surface-variant)', fontWeight: 500 }}>
                {isSearchActive ? 'No matching posts found' : 'Your feed is empty. Start posting to build the conversation!'}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FeedPage;
