import { BOOKING_STATUS } from './constants';

export const formatters = {
  formatDistance: (distanceKm: number): string => {
    if (distanceKm < 1) {
      return `${Math.round(distanceKm * 1000)}m`;
    }
    return `${distanceKm.toFixed(1)}km`;
  },

  formatPrice: (price: number, currency: string = 'ARS'): string => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency,
    }).format(price);
  },

  formatDateTime: (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('es-AR', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  formatTime: (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  formatDate: (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('es-AR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  formatBookingStatus: (status: string): string => {
    switch (status) {
      case BOOKING_STATUS.PENDING:
        return 'Pending';
      case BOOKING_STATUS.CONFIRMED:
        return 'Confirmed';
      case BOOKING_STATUS.COMPLETED:
        return 'Completed';
      case BOOKING_STATUS.CANCELLED:
        return 'Cancelled';
      default:
        return status;
    }
  },

  getBookingStatusColor: (status: string): string => {
    switch (status) {
      case BOOKING_STATUS.PENDING:
        return '#FF9800'; // Orange
      case BOOKING_STATUS.CONFIRMED:
        return '#4CAF50'; // Green
      case BOOKING_STATUS.COMPLETED:
        return '#2196F3'; // Blue
      case BOOKING_STATUS.CANCELLED:
        return '#F44336'; // Red
      default:
        return '#9E9E9E'; // Grey
    }
  },

  truncate: (text: string, length: number = 50): string => {
    return text.length > length ? `${text.substring(0, length)}...` : text;
  },

  capitalizeFirstLetter: (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  },

  slugify: (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]/g, '-')
      .replace(/-+/g, '-')
      .trim();
  },
};
