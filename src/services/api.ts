<<<<<<< HEAD
// API Configuration
const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) 
  ? import.meta.env.VITE_API_URL 
  : 'http://localhost:8000/api';
=======
/✅ API Configuration
const API_BASE_URL =
  typeof import.meta !== "undefined" &&
  typeof (import.meta as any).env !== "undefined" &&
  (import.meta as any).env.VITE_API_URL
    ? (import.meta as any).env.VITE_API_URL
    : "http://localhost:8000/api";

console.log("✅ API Base URL:", API_BASE_URL);
>>>>>>> origin/main

// Types matching Django backend
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'barber' | 'customer';
  phone_number?: string;
}

<<<<<<< HEAD

=======
>>>>>>> origin/main
export interface Barber {
  id: number;
  user: User;
  bio: string;
<<<<<<< HEAD
  experience_years: number;
=======
  experience: number;
>>>>>>> origin/main
  specialization: string;
  pending_appointments_list: string;
}

export interface Appointment {
  id: number;
  customer: User;
  barber: Barber;
  appointment_date: string;
<<<<<<< HEAD
  created_at: string;
  status: 'pending' | 'completed' | 'cancelled';
  notes: string;
=======
  status: 'pending' | 'completed' | 'cancelled';
  notes: string;
  created_at: string;
>>>>>>> origin/main
}

export interface CreateAppointmentData {
  barber_id: number;
  appointment_date: string;
  notes?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
}

// API Service Class
class ApiService {
  private token: string | null = null;

  constructor() {
<<<<<<< HEAD
    // Load token from localStorage on initialization
    this.token = localStorage.getItem('authToken');
  }

=======
    this.token = localStorage.getItem('authToken');
  }
  
>>>>>>> origin/main
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Token ${this.token}`;
<<<<<<< HEAD
=======

>>>>>>> origin/main
    }
    
    return headers;
  }

  async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
      throw new Error(error.detail || error.message || 'Request failed');
    }
    return response.json();
  }

  // Authentication
  async login(credentials: LoginCredentials): Promise<{ token: string; user: User }> {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    
    const data = await this.handleResponse<{ token: string; user: User }>(response);
    this.token = data.token;
    localStorage.setItem('authToken', data.token);
    return data;
  }

  async signup(data: SignupData): Promise<{ token: string; user: User }> {
    const response = await fetch(`${API_BASE_URL}/auth/signup/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const result = await this.handleResponse<{ token: string; user: User }>(response);
    this.token = result.token;
    localStorage.setItem('authToken', result.token);
    return result;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  async getCurrentUser(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/me/`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<User>(response);
  }

  // Barbers
  async getBarbers(): Promise<Barber[]> {
    const response = await fetch(`${API_BASE_URL}/barbers/`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<Barber[]>(response);
  }

  async getBarber(id: number): Promise<Barber> {
    const response = await fetch(`${API_BASE_URL}/barbers/${id}/`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<Barber>(response);
  }

  // Appointments
  async getAppointments(): Promise<Appointment[]> {
    const response = await fetch(`${API_BASE_URL}/appointments/`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<Appointment[]>(response);
  }

  async getMyAppointments(): Promise<Appointment[]> {
    const response = await fetch(`${API_BASE_URL}/appointments/my/`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<Appointment[]>(response);
  }

  async createAppointment(data: CreateAppointmentData): Promise<Appointment> {
    const response = await fetch(`${API_BASE_URL}/appointments/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<Appointment>(response);
  }

  async updateAppointmentStatus(
    id: number, 
    status: 'pending' | 'completed' | 'cancelled'
  ): Promise<Appointment> {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}/`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify({ status }),
    });
    return this.handleResponse<Appointment>(response);
  }

  async deleteAppointment(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}/`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete appointment');
    }
  }
}

export const api = new ApiService();
