import React, { createContext, useContext, useState, useEffect } from 'react';
import { INDUSTRY_CONFIGS } from '../data/mockIndustryTemplates';

const AuthContext = createContext(null);

const STORAGE_KEY = 'businessos_auth_session';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load auth state', e);
    }
    // Default demo session: Business Owner in Healthcare
    return {
      name: 'Dr. Rajesh Verma',
      email: 'rajesh.verma@apexhealth.in',
      role: 'business_owner',
      businessName: 'Apex Health & Wellness Clinic',
      industry: 'healthcare',
      locationsCount: 3,
      teamSize: '11-50',
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save auth state', e);
    }
  }, [user]);

  const setPlatformOwnerDemo = (name = 'Alex Thorne (Platform Operator)', email = 'operator@businessos.ai') => {
    setUser({
      name,
      email,
      role: 'platform_owner',
      businessName: 'BusinessOS HQ',
      industry: 'general',
      locationsCount: 1,
      teamSize: '50+',
    });
  };

  const setBusinessOwnerDemo = (industry = 'healthcare', customName = '', customBiz = '') => {
    const config = INDUSTRY_CONFIGS[industry] || INDUSTRY_CONFIGS.healthcare;
    let name = customName;
    let email = 'owner@demo.businessos.ai';

    if (!name) {
      if (industry === 'healthcare') {
        name = 'Dr. Rajesh Verma';
        email = 'rajesh.verma@apexhealth.in';
      } else if (industry === 'salon') {
        name = 'Priya Sharma';
        email = 'priya@luxeaura.com';
      } else if (industry === 'education') {
        name = 'Prof. Anand Kulkarni';
        email = 'anand@zenithacademy.org';
      } else if (industry === 'real_estate') {
        name = 'Vikram Singhania';
        email = 'vikram@skylinerealty.in';
      } else {
        name = 'Rohan Deshmukh';
        email = 'rohan@vanguardbiz.com';
      }
    }

    setUser({
      name,
      email,
      role: 'business_owner',
      businessName: customBiz || config.sampleBusinessName,
      industry,
      locationsCount: 2,
      teamSize: '11-25',
    });
  };

  const switchIndustry = (industry) => {
    if (!INDUSTRY_CONFIGS[industry]) return;
    const config = INDUSTRY_CONFIGS[industry];
    setUser((prev) => ({
      ...prev,
      industry,
      businessName: config.sampleBusinessName,
    }));
  };

  const updateProfile = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const currentIndustryConfig = INDUSTRY_CONFIGS[user?.industry || 'healthcare'] || INDUSTRY_CONFIGS.healthcare;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        industry: user?.industry || 'healthcare',
        industryConfig: currentIndustryConfig,
        setPlatformOwnerDemo,
        setBusinessOwnerDemo,
        switchIndustry,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
