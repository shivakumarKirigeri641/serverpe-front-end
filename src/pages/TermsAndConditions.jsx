import React from 'react';
import LegalPage from '../components/LegalPage';
import { getTermsAndConditions } from '../api/apiClient';

const TermsAndConditions = () => (
  <LegalPage
    title="Terms & Conditions"
    subtitle="The terms that govern your use of ServerPe App Solutions' services and products."
    fetchFn={getTermsAndConditions}
    accentColor="#34D399"
  />
);

export default TermsAndConditions;
