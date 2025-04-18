"use client";

import { useState, useEffect } from 'react';
import { Service } from '@/types';

/**
 * Hook for managing bookmarked services
 * Implements localStorage persistence similar to the cart
 */
export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Service[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load bookmarks from localStorage on initial mount
  useEffect(() => {
    setMounted(true);
    try {
      const savedBookmarks = typeof window !== 'undefined' ? localStorage.getItem('bookmarks') : null;
      if (savedBookmarks) {
        const parsedBookmarks = JSON.parse(savedBookmarks);
        if (Array.isArray(parsedBookmarks)) {
          setBookmarks(parsedBookmarks);
        }
      }
    } catch (error) {
      console.error('Failed to parse bookmarks from localStorage:', error);
      setBookmarks([]);
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      try {
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      } catch (error) {
        console.error('Failed to save bookmarks to localStorage:', error);
      }
    }
  }, [bookmarks, mounted]);

  // Add a service to bookmarks
  const addBookmark = (service: Service) => {
    if (!service || !service.id) {
      console.error('Invalid service provided to addBookmark');
      return;
    }

    setBookmarks(prev => {
      // Check if already bookmarked
      const exists = prev.some(item => item.id === service.id);
      if (exists) {
        return prev; // Already bookmarked, don't add again
      }
      return [...prev, service];
    });
  };

  // Remove a service from bookmarks
  const removeBookmark = (serviceId: string) => {
    if (!serviceId) return;
    
    setBookmarks(prev => prev.filter(service => service.id !== serviceId));
  };

  // Toggle a service bookmark status
  const toggleBookmark = (service: Service) => {
    if (!service || !service.id) return;
    
    const isBookmarked = bookmarks.some(item => item.id === service.id);
    if (isBookmarked) {
      removeBookmark(service.id);
    } else {
      addBookmark(service);
    }
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    isBookmarked: (serviceId: string) => bookmarks.some(item => item.id === serviceId)
  };
} 