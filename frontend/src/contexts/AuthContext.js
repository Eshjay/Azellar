import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, db } from '../lib/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Get initial session
    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await loadUserProfile(session.user.id);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setUserProfile(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const getInitialSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await loadUserProfile(session.user.id);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error getting initial session:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error) {
        // If profile doesn't exist, create one with default student role
        if (error.code === 'PGRST116') {
          const { data: insertedProfile, error: insertError } = await supabase
            .from('profiles')
            .insert([{
              user_id: userId,
              email: user?.email || '',
              full_name: user?.user_metadata?.full_name || '',
              role: 'student',
              is_active: true
            }])
            .select()
            .single();
          
          if (!insertError) {
            setUserProfile(insertedProfile);
          } else {
            console.error('Error creating profile:', insertError);
          }
        } else {
          console.error('Error loading profile:', error);
        }
      } else {
        setUserProfile(data);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const signUp = async (email, password, metadata = {}) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: metadata.full_name || '',
            ...metadata
          }
        }
      });

      if (!error && data.user) {
        // Create profile with student role by default
        await supabase
          .from('profiles')
          .insert([{
            user_id: data.user.id,
            email: email,
            full_name: metadata.full_name || '',
            role: 'student',
            is_active: true
          }]);
      }

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        setUser(null);
        setUserProfile(null);
        setIsAuthenticated(false);
      }
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const updateProfile = async (updates) => {
    try {
      if (!user) return { data: null, error: new Error('No user logged in') };
      
      const { data, error } = await db.updateProfile(user.id, updates);
      if (!error) {
        setUserProfile(data);
      }
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Role-based helper functions
  const hasRole = (role) => {
    return userProfile?.role === role;
  };

  const hasAnyRole = (roles) => {
    return roles.includes(userProfile?.role);
  };

  const isAdmin = () => hasRole('admin');
  const isClient = () => hasRole('client');
  const isStudent = () => hasRole('student');

  const canAccessAdmin = () => isAdmin();
  const canAccessSupport = () => hasAnyRole(['admin', 'client']);
  const canAccessAcademy = () => hasAnyRole(['admin', 'student']);

  const value = {
    user,
    userProfile,
    loading,
    isAuthenticated,
    signUp,
    signIn,
    signOut,
    updateProfile,
    // Role-based helpers
    hasRole,
    hasAnyRole,
    isAdmin,
    isClient,
    isStudent,
    canAccessAdmin,
    canAccessSupport,
    canAccessAcademy,
    // Reload profile function
    reloadProfile: () => loadUserProfile(user?.id)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};