import { v4 as uuidv4 } from 'uuid';

const SESSION_KEY = 'lumiere_session_id';

export const getSessionId = (): string => {
    if (typeof window === 'undefined') return '';

    let sessionId = localStorage.getItem(SESSION_KEY);
    if (!sessionId) {
        sessionId = uuidv4();
        localStorage.setItem(SESSION_KEY, sessionId);
    }
    return sessionId;
};

// Mock function to check if user is Pro
// In a real app, this would check against a user database or auth claim
export const isProUser = (): boolean => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('is_pro') === 'true';
};

export const setProUser = (status: boolean): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('is_pro', String(status));
};
