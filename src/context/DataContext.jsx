import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_BUSINESSES } from '../data/mockBusinesses';
import { INITIAL_BOOKINGS } from '../data/mockBookings';
import { INITIAL_CUSTOMERS } from '../data/mockCustomers';
import { INITIAL_SERVICES } from '../data/mockServices';
import { INITIAL_TEAM } from '../data/mockTeam';
import { INITIAL_SUBSCRIPTIONS } from '../data/mockSubscriptions';
import { DEFAULT_AI_CONFIGS } from '../data/mockIndustryTemplates';

const DataContext = createContext(null);

const STORAGE_PREFIX = 'businessos_data_';

const loadLocal = (key, fallback) => {
  try {
    const saved = localStorage.getItem(STORAGE_PREFIX + key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    console.error(`Failed loading ${key}`, e);
    return fallback;
  }
};

export const DataProvider = ({ children }) => {
  const [businesses, setBusinesses] = useState(() => loadLocal('businesses', INITIAL_BUSINESSES));
  const [bookings, setBookings] = useState(() => loadLocal('bookings', INITIAL_BOOKINGS));
  const [customers, setCustomers] = useState(() => loadLocal('customers', INITIAL_CUSTOMERS));
  const [services, setServices] = useState(() => loadLocal('services', INITIAL_SERVICES));
  const [team, setTeam] = useState(() => loadLocal('team', INITIAL_TEAM));
  const [subscriptions, setSubscriptions] = useState(() => loadLocal('subscriptions', INITIAL_SUBSCRIPTIONS));
  const [aiConfigs, setAiConfigs] = useState(() => loadLocal('ai_configs', DEFAULT_AI_CONFIGS));

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'businesses', JSON.stringify(businesses));
  }, [businesses]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'bookings', JSON.stringify(bookings));
  }, [bookings]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'customers', JSON.stringify(customers));
  }, [customers]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'services', JSON.stringify(services));
  }, [services]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'team', JSON.stringify(team));
  }, [team]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'ai_configs', JSON.stringify(aiConfigs));
  }, [aiConfigs]);

  // Bookings CRUD
  const addBooking = (bookingData) => {
    const newBooking = {
      id: `bk-${Date.now().toString().slice(-4)}`,
      status: 'Confirmed',
      ...bookingData,
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBooking = (id, updates) => {
    setBookings((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const deleteBooking = (id) => {
    setBookings((prev) => prev.filter((item) => item.id !== id));
  };

  // Customers CRUD
  const addCustomer = (customerData) => {
    const newCustomer = {
      id: `cust-${Date.now().toString().slice(-4)}`,
      totalBookings: 1,
      totalSpend: 0,
      lastInteraction: 'Just now',
      status: 'Active',
      ...customerData,
    };
    setCustomers((prev) => [newCustomer, ...prev]);
    return newCustomer;
  };

  const updateCustomer = (id, updates) => {
    setCustomers((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const deleteCustomer = (id) => {
    setCustomers((prev) => prev.filter((item) => item.id !== id));
  };

  // Services CRUD
  const addService = (serviceData) => {
    const newService = {
      id: `srv-${Date.now().toString().slice(-4)}`,
      isActive: true,
      ...serviceData,
    };
    setServices((prev) => [newService, ...prev]);
    return newService;
  };

  const updateService = (id, updates) => {
    setServices((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const toggleServiceStatus = (id) => {
    setServices((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isActive: !item.isActive } : item))
    );
  };

  const deleteService = (id) => {
    setServices((prev) => prev.filter((item) => item.id !== id));
  };

  // Team CRUD
  const addTeamMember = (memberData) => {
    const newMember = {
      id: `tm-${Date.now().toString().slice(-4)}`,
      status: 'Invited',
      avatarColor: 'bg-teal-600',
      ...memberData,
    };
    setTeam((prev) => [newMember, ...prev]);
    return newMember;
  };

  const updateTeamMember = (id, updates) => {
    setTeam((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const deleteTeamMember = (id) => {
    setTeam((prev) => prev.filter((item) => item.id !== id));
  };

  // Platform Businesses CRUD
  const addBusiness = (businessData) => {
    const newBiz = {
      id: `biz-${Date.now().toString().slice(-4)}`,
      locations: 1,
      plan: 'Starter',
      status: 'Active',
      monthlyRevenue: 2499,
      joinedDate: 'Just now',
      ...businessData,
    };
    setBusinesses((prev) => [newBiz, ...prev]);
    return newBiz;
  };

  const updateBusiness = (id, updates) => {
    setBusinesses((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const toggleBusinessStatus = (id) => {
    setBusinesses((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === 'Active' ? 'Suspended' : 'Active';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  // AI Receptionist Config
  const updateAiConfig = (industry, updates) => {
    setAiConfigs((prev) => ({
      ...prev,
      [industry]: { ...prev[industry], ...updates },
    }));
  };

  // Reset to initial demo data
  const resetAllData = () => {
    setBusinesses(INITIAL_BUSINESSES);
    setBookings(INITIAL_BOOKINGS);
    setCustomers(INITIAL_CUSTOMERS);
    setServices(INITIAL_SERVICES);
    setTeam(INITIAL_TEAM);
    setSubscriptions(INITIAL_SUBSCRIPTIONS);
    setAiConfigs(DEFAULT_AI_CONFIGS);
  };

  return (
    <DataContext.Provider
      value={{
        businesses,
        bookings,
        customers,
        services,
        team,
        subscriptions,
        aiConfigs,
        addBooking,
        updateBooking,
        deleteBooking,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        addService,
        updateService,
        toggleServiceStatus,
        deleteService,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addBusiness,
        updateBusiness,
        toggleBusinessStatus,
        updateAiConfig,
        resetAllData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
