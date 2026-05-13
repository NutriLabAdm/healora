import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const LS_KEY = 'healora_plans';

const PlansContext = createContext(null);

export function PlansProvider({ children }) {
  const [plans, setPlans] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) || '{}');
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(plans));
    } catch {
      // localStorage full or unavailable
    }
  }, [plans]);

  const getPlan = useCallback((profileId) => {
    const stored = plans[profileId];
    if (!stored) return { interventions: [], note: '', status: 'active', templateId: 'custom' };
    if (Array.isArray(stored)) return { interventions: stored, note: '', status: 'active', templateId: 'custom' };
    return stored;
  }, [plans]);

  const savePlan = useCallback((profileId, data) => {
    const planData = Array.isArray(data) ? { interventions: data, note: '', status: 'active', templateId: 'custom' } : data;
    setPlans(prev => ({ ...prev, [profileId]: planData }));
  }, []);

  const removePlan = useCallback((profileId) => {
    setPlans(prev => {
      const next = { ...prev };
      delete next[profileId];
      return next;
    });
  }, []);

  return (
    <PlansContext.Provider value={{ plans, getPlan, savePlan, removePlan }}>
      {children}
    </PlansContext.Provider>
  );
}

export function usePlans() {
  const ctx = useContext(PlansContext);
  if (!ctx) throw new Error('usePlans must be used within PlansProvider');
  return ctx;
}
