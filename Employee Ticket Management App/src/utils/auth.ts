import { Employee } from '../types';
import { mockEmployees } from './mockData';

const CURRENT_USER_KEY = 'currentEmployee';

export const login = (email: string, password: string): Employee | null => {
  const employee = mockEmployees.find(
    (emp) => emp.email === email && emp.password === password
  );
  
  if (employee) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(employee));
    return employee;
  }
  
  return null;
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): Employee | null => {
  const userStr = localStorage.getItem(CURRENT_USER_KEY);
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};
