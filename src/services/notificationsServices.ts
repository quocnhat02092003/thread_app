import React from 'react'
import API from './refreshTokenService'

export const getAllNotificationsUser = async () => {
  try {
    const response = await API.get('api/notifications/get-notifications');
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
}