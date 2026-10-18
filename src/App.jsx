import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { PlatformLayout } from './layouts/PlatformLayout';
import { BusinessLayout } from './layouts/BusinessLayout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { PlatformSignupPage } from './pages/PlatformSignupPage';
import { BusinessSignupPage } from './pages/BusinessSignupPage';

// Platform Owner Pages
import { PlatformOverviewPage } from './pages/platform/PlatformOverviewPage';
import { BusinessesPage } from './pages/platform/BusinessesPage';
import { SubscriptionsPage } from './pages/platform/SubscriptionsPage';
import { PlatformSettingsPage } from './pages/platform/PlatformSettingsPage';

// Business Owner Pages
import { BusinessOverviewPage } from './pages/business/BusinessOverviewPage';
import { BookingsPage } from './pages/business/BookingsPage';
import { CustomersPage } from './pages/business/CustomersPage';
import { ServicesPage } from './pages/business/ServicesPage';
import { TeamPage } from './pages/business/TeamPage';
import { AnalyticsPage } from './pages/business/AnalyticsPage';
import { AIReceptionistPage } from './pages/business/AIReceptionistPage';
import { BusinessSettingsPage } from './pages/business/BusinessSettingsPage';

// Demo Route Guard for Platform
const PlatformGuard = ({ children }) => {
  const { user } = useAuth();
  // If user is not platform owner in demo session, allow demo access or set demo
  return children;
};

// Demo Route Guard for Business
const BusinessGuard = ({ children }) => {
  const { user } = useAuth();
  return children;
};

export const App = () => {
  return (
    <Routes>
      {/* 1. Public Marketing Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route path="/signup/platform-owner" element={<PlatformSignupPage />} />
      <Route path="/signup/business-owner" element={<BusinessSignupPage />} />

      {/* 2. Platform Owner Suite */}
      <Route
        path="/platform"
        element={
          <PlatformGuard>
            <PlatformLayout />
          </PlatformGuard>
        }
      >
        <Route index element={<PlatformOverviewPage />} />
        <Route path="businesses" element={<BusinessesPage />} />
        <Route path="subscriptions" element={<SubscriptionsPage />} />
        <Route path="settings" element={<PlatformSettingsPage />} />
      </Route>

      {/* 3. Business Owner Suite */}
      <Route
        path="/app"
        element={
          <BusinessGuard>
            <BusinessLayout />
          </BusinessGuard>
        }
      >
        <Route index element={<BusinessOverviewPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="ai-receptionist" element={<AIReceptionistPage />} />
        <Route path="settings" element={<BusinessSettingsPage />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
