import {LoginResponse} from '@/features/auth/services/auth.service';

// Simple auth client handling JWT-less session with inactivity logout
export class AuthClient {
  private tokenKey = 'app_token';
  private expiryKey = 'app_token_expiry';
  private activityTimeout: number | null = null;
  private inactivityCheckInterval: number | null = null;

  constructor() {
    this.handleActivity = this.handleActivity.bind(this);
    this.checkInactivity = this.checkInactivity.bind(this);
    this.setupListeners();
  }

  private setupListeners() {
    window.addEventListener('mousemove', this.handleActivity);
    window.addEventListener('keydown', this.handleActivity);
    window.addEventListener('mousedown', this.handleActivity);
    // Periodic check every minute
    this.inactivityCheckInterval = window.setInterval(this.checkInactivity, 60_000);
  }

  private handleActivity() {
    this.persistLastInteraction();
  }

  private persistLastInteraction() {
    localStorage.setItem('app_last_interaction', Date.now().toString());
  }

  private checkInactivity() {
    const last = Number(localStorage.getItem('app_last_interaction')) || 0;
    const now = Date.now();
    // If user inactive for 10 minutes, logout
    if (now - last > 10 * 60 * 1000) {
      this.logout();
    }
  }

  async login(email: string) {
    const resp = await fetch('/api?action=login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const json = await resp.json();
    if (!json.success) {
      throw new Error(json.message || 'Login failed');
    }
    const data = json.data as LoginResponse & { token: string; expiresAt: number };
    if (!data.authenticated) throw new Error('Login failed');
    this.setToken(data.token, data.expiresAt);
    return { user: data.user };
  }

  private setToken(token: string, expiresAt: number) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.expiryKey, expiresAt.toString());
    this.persistLastInteraction();
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expiryKey);
    localStorage.removeItem('app_last_interaction');
    // Optionally navigate to login or set app state
    window.location.href = '/account/login';
  }

  isAuthenticated() {
    const token = localStorage.getItem(this.tokenKey);
    const expiry = Number(localStorage.getItem(this.expiryKey));
    if (!token || !expiry) return false;
    if (Date.now() > expiry) {
      this.logout();
      return false;
    }
    return true;
  }
}
