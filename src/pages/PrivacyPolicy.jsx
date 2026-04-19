import React from 'react';
import LegalPage from '../components/LegalPage';
import { getPrivacyPolicy } from '../api/apiClient';

const PrivacyPolicy = () => (
  <LegalPage
    title="Privacy Policy"
    subtitle="How ServerPe App Solutions collects, uses, and protects your personal information."
    fetchFn={getPrivacyPolicy}
    accentColor="#4F8EFF"
  />
);

export default PrivacyPolicy;
