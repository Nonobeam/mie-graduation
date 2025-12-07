import axios from 'axios';

// Read Google Apps Script URL from environment variable
const GOOGLE_SCRIPT_URL_PRODUCTION = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';
const GOOGLE_SCRIPT_URL = import.meta.env.DEV ? '/api/sheets' : GOOGLE_SCRIPT_URL_PRODUCTION;

// Google Sheets API service
export const api = {
  /**
   * Submit a wish to Google Sheets
   * @param {string} name - User's name
   * @param {string} message - Wish message
   * @returns {Promise<{success: boolean, message: string}>}
   */
  async submitWish(name, message) {
    try {
      // Validate inputs
      if (!name || !name.trim()) {
        return {
          success: false,
          message: 'Vui lòng nhập tên của bạn',
        };
      }

      if (!message || !message.trim()) {
        return {
          success: false,
          message: 'Vui lòng nhập lời chúc của bạn',
        };
      }

      // Prepare data
      const data = {
        type: 'wish',
       name: name.trim(),
        message: message.trim(),
        timestamp: new Date().toISOString(),
      };

      // Send to Google Apps Script
      const response = await axios.post(GOOGLE_SCRIPT_URL, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });

      if (response.data && response.data.success) {
        return {
          success: true,
          message: 'Lời chúc của bạn đã được gửi thành công!',
        };
      } else {
        throw new Error(response.data?.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error submitting wish:', error);

      // Handle specific error cases
      if (error.code === 'ECONNABORTED') {
        return {
          success: false,
          message: 'Kết nối bị timeout. Vui lòng thử lại.',
        };
      }

      if (error.response) {
        // Server responded with error
        return {
          success: false,
          message: `Lỗi server: ${error.response.status}. Vui lòng thử lại sau.`,
        };
      }

      if (error.request) {
        // Request made but no response
        return {
          success: false,
          message: 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối internet.',
        };
      }

      // Other errors
      return {
        success: false,
        message: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
      };
    }
  },

  /**
   * Submit attendance to Google Sheets
   * @param {string} name - User's name
   * @returns {Promise<{success: boolean, message: string}>}
   */
  async submitAttendance(name) {
    try {
      if (!name || !name.trim()) {
        return {
          success: false,
          message: 'Vui lòng nhập tên của bạn',
        };
      }

      const data = {
        type: 'attendance',
        name: name.trim(),
        timestamp: new Date().toISOString(),
      };

      const response = await axios.post(GOOGLE_SCRIPT_URL, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      if (response.data && response.data.success) {
        return {
          success: true,
          message: 'Đã xác nhận tham dự!',
        };
      } else {
        throw new Error(response.data?.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error submitting attendance:', error);
      return {
        success: false,
        message: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
      };
    }
  },
};

export default api;
