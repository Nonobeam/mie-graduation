import Cookies from 'js-cookie';

// Cookie configuration
const COOKIE_OPTIONS = {
  expires: 365, // 1 year
  sameSite: 'strict',
};

const KEYS = {
  USER_NAME: 'mie_grad_user_name',
  USER_WISH: 'mie_grad_user_wish',
  WISH_SENT: 'mie_grad_wish_sent',
};

// Storage service for managing user data with cookies and localStorage
export const storage = {
  // User name methods
  saveUserName(name) {
    try {
      Cookies.set(KEYS.USER_NAME, name, COOKIE_OPTIONS);
      localStorage.setItem(KEYS.USER_NAME, name);
      return true;
    } catch (error) {
      console.error('Error saving user name:', error);
      return false;
    }
  },

  getUserName() {
    try {
      // Try cookie first, then localStorage as fallback
      return Cookies.get(KEYS.USER_NAME) || localStorage.getItem(KEYS.USER_NAME) || null;
    } catch (error) {
      console.error('Error getting user name:', error);
      return null;
    }
  },

  // Wish methods
  saveWish(wish) {
    try {
      const wishData = {
        message: wish,
        timestamp: new Date().toISOString(),
      };
      Cookies.set(KEYS.USER_WISH, JSON.stringify(wishData), COOKIE_OPTIONS);
      localStorage.setItem(KEYS.USER_WISH, JSON.stringify(wishData));
      Cookies.set(KEYS.WISH_SENT, 'true', COOKIE_OPTIONS);
      localStorage.setItem(KEYS.WISH_SENT, 'true');
      return true;
    } catch (error) {
      console.error('Error saving wish:', error);
      return false;
    }
  },

  getUserWish() {
    try {
      const wishStr = Cookies.get(KEYS.USER_WISH) || localStorage.getItem(KEYS.USER_WISH);
      if (!wishStr) return null;
      return JSON.parse(wishStr);
    } catch (error) {
      console.error('Error getting user wish:', error);
      return null;
    }
  },

  hasUserSentWish() {
    try {
      return Cookies.get(KEYS.WISH_SENT) === 'true' || 
             localStorage.getItem(KEYS.WISH_SENT) === 'true';
    } catch (error) {
      console.error('Error checking wish status:', error);
      return false;
    }
  },

  // Clear all data (for testing or user request)
  clearAll() {
    try {
      Object.values(KEYS).forEach(key => {
        Cookies.remove(key);
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  },
};

export default storage;
