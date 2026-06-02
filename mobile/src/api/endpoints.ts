import apiClient from './client';
import { Profile, Plan, DiaryEntry, Protocol } from '../types';

export const profilesApi = {
  list: () => apiClient.get<{ profiles: Profile[] }>('/profiles'),
  get: (id: string) => apiClient.get<{ profile: Profile }>(`/profiles/${id}`),
  update: (id: string, data: Partial<Profile>) =>
    apiClient.patch<{ profile: Profile }>(`/profiles/${id}`, data),
};

export const plansApi = {
  list: (profileId: string) =>
    apiClient.get<{ plans: Plan[] }>(`/plans?profile_id=${profileId}`),
  get: (id: string) => apiClient.get<{ plan: Plan }>(`/plan/${id}`),
  generate: (profileId: string, protocolId: string, options?: Record<string, unknown>) =>
    apiClient.post<{ plan: Plan }>('/plan/generate', {
      profile_id: profileId,
      protocol_id: protocolId,
      options,
    }),
  updateIntervention: (planId: string, intId: string, data: { status?: string; result?: string; comment?: string }) =>
    apiClient.patch<{ plan: Plan }>(`/plan/${planId}/intervention/${intId}`, data),
  approve: (planId: string, approvedBy?: string) =>
    apiClient.post<{ plan: Plan }>(`/plan/${planId}/approve`, { approved_by: approvedBy }),
  reschedule: (planId: string, interventionId: string, newDate: string, newTime?: string) =>
    apiClient.post<{ plan: Plan }>(`/plan/${planId}/reschedule`, {
      intervention_id: interventionId,
      new_date: newDate,
      new_time: newTime,
    }),
};

export const diaryApi = {
  get: (profileId: string, day: number) =>
    apiClient.get<DiaryEntry>(`/diary/${profileId}/${day}`),
  save: (entry: DiaryEntry) =>
    apiClient.post('/diary', entry),
};

export const chatApi = {
  send: (message: string, profileId: string, history?: Array<{ role: string; content: string }>) =>
    apiClient.post<{ reply: string; source: string }>('/chat', {
      message,
      profile: profileId,
      history,
    }),
};

export const protocolsApi = {
  list: () => apiClient.get<{ protocols: Protocol[] }>('/protocols'),
  suggest: (query: string) =>
    apiClient.get<{ suggestions: Array<{ protocol_id: string; name: string; keyword: string; goal: string }> }>(
      `/goal/suggest?q=${encodeURIComponent(query)}`,
    ),
};
