import api from './api';
import bcrypt from 'bcryptjs';

interface SignupResponse {
  success: boolean;
  message: string;
  userId?: string;
}

interface LoginResponse {
  token: string;
  userId: string;
}

interface VerificationCodeResponse {
  success: boolean;
}

interface VerifyCodeResponse {
  success: boolean;
}

export const signup = async (email: string, username: string, password: string): Promise<SignupResponse> => {
  if (!email || !username || !password) {
    throw new Error('Please provide email, username, and password.');
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await api.post<SignupResponse>('/signup', { email, username, password: hashedPassword });
    return response.data;
  } catch (error: any) {
    console.error('Signup error:', error);
    throw error.response ? error.response.data : new Error('An unexpected error occurred during signup.');
  }
};

export const login = async (identifier: string, password: string): Promise<LoginResponse> => {
  if (!identifier || !password) {
    throw new Error('Please provide username/email and password.');
  }

  const emailPattern = /^\S+@\S+\.\S+$/;
  const isEmail = emailPattern.test(identifier);
  const payload = isEmail ? { email: identifier } : { username: identifier };

  try {
    // Retrieve user data from backend
    const userDataResponse = await api.post<{ password: string; userId: string }>('/login', payload);

    // Compare hashed password
    const isValidPassword = await bcrypt.compare(password, userDataResponse.data.password);

    if (!isValidPassword) {
      throw new Error('Invalid username/email or password.');
    }

    return { token: 'jwt_token', userId: userDataResponse.data.userId };
  } catch (error: any) {
    console.error('Login error:', error);
    throw error.response ? error.response.data : new Error('An unexpected error occurred during login.');
  }
};

export const sendVerificationCode = async (email: string): Promise<VerificationCodeResponse> => {
  if (!email) {
    throw new Error('Please provide an email address.');
  }

  try {
    // Check if email is already verified
    // For example, you can query your database here to see if the email is already verified
    const isEmailVerified = false; // Set this to the result of your database query

    if (isEmailVerified) {
      throw new Error('Email is already verified.');
    }

    const response = await api.post<VerificationCodeResponse>('/sendVerificationCode', { email });
    return response.data;
  } catch (error: any) {
    console.error('Send verification code error:', error);
    throw error.response ? error.response.data : new Error('An unexpected error occurred while sending the verification code.');
  }
};

export const verifyCode = async (email: string, verificationCode: string): Promise<VerifyCodeResponse> => {
  if (!email || !verificationCode) {
    throw new Error('Please provide email and verification code.');
  }

  try {
    // Verify the code
    // For example, you can compare the verification code with the one stored in your database
    const isCodeValid = true; // Set this to the result of verification

    if (!isCodeValid) {
      throw new Error('Invalid or expired verification code.');
    }

    const response = await api.post<VerifyCodeResponse>('/verifyCode', { email, verificationCode });
    return response.data;
  } catch (error: any) {
    console.error('Verify code error:', error);
    throw error.response ? error.response.data : new Error('An unexpected error occurred while verifying the code.');
  }
};
