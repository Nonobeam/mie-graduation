// Read Google Apps Script URL from environment variable
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

/**
 * Submit data to Google Apps Script using form submission (bypasses CORS)
 */
function submitViaForm(data) {
  return new Promise((resolve, reject) => {
    // Create hidden iframe to capture response
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden_iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    // Create form
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = GOOGLE_SCRIPT_URL;
    form.target = 'hidden_iframe';

    // Add data as form fields
    Object.keys(data).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);

    // Handle response
    iframe.onload = function() {
      try {
        const responseText = iframe.contentDocument?.body?.textContent || '{}';
        const response = JSON.parse(responseText);
        
        // Cleanup
        document.body.removeChild(form);
        document.body.removeChild(iframe);
        
        resolve(response);
      } catch (error) {
        // Cleanup on error
        document.body.removeChild(form);
        document.body.removeChild(iframe);
        
        // Since we can't read the response due to CORS, assume success
        resolve({ success: true, message: 'Submitted successfully' });
      }
    };

    // Submit and set timeout
    form.submit();
    
    // Fallback timeout
    setTimeout(() => {
      if (document.body.contains(form)) {
        document.body.removeChild(form);
      }
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
      resolve({ success: true, message: 'Submitted (timeout)' });
    }, 5000);
  });
}

// Google Sheets API service
export const api = {
  /**
   * Submit a wish to Google Sheets
   */
  async submitWish(name, message) {
    try {
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

      const data = {
        type: 'wish',
        name: name.trim(),
        message: message.trim(),
        timestamp: new Date().toISOString(),
      };

      const response = await submitViaForm(data);
      
      return {
        success: true,
        message: 'Lời chúc của bạn đã được gửi thành công!',
      };
    } catch (error) {
      console.error('Error submitting wish:', error);
      return {
        success: false,
        message: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
      };
    }
  },

  /**
   * Submit attendance to Google Sheets
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

      const response = await submitViaForm(data);
      
      return {
        success: true,
        message: 'Đã xác nhận tham dự!',
      };
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

