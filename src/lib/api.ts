const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const api = {
  auth: {
    signup: async (data: any) => {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    login: async (data: any) => {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    me: async (token: string) => {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      return res.json();
    },
  },
  onboarding: {
    saveStep: async (data: any, token: string) => {
      const res = await fetch(`${API_URL}/onboarding/save-step`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    getProgress: async (userId: string, token: string) => {
      const res = await fetch(`${API_URL}/onboarding/get-progress?userId=${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      return res.json();
    },
  },
  ai: {
    brandAudit: async (data: any, token: string) => {
      const res = await fetch(`${API_URL}/ai/brand-audit`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    strategy: async (data: any, token: string) => {
      const res = await fetch(`${API_URL}/ai/strategy`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    contentCalendar: async (data: any, token: string) => {
        const res = await fetch(`${API_URL}/ai/content-calendar`, {
          method: 'POST',
          headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(data),
        });
        return res.json();
      },
      campaign: async (data: any, token: string) => {
        const res = await fetch(`${API_URL}/ai/campaign`, {
          method: 'POST',
          headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(data),
        });
        return res.json();
      },
  },
  rag: {
    ingest: async (data: any, token: string) => {
      const res = await fetch(`${API_URL}/rag/ingest`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    query: async (data: any, token: string) => {
      const res = await fetch(`${API_URL}/rag/query`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });
      return res.json();
    },
  }
};
