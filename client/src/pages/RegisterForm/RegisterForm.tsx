import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

// Define validation schema
const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  image: z.instanceof(FileList).optional(), // Image field is optional
});

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  image?: FileList;
}

const RegisterForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();


  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('username', data.username);
    formData.append('password', data.password);
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    }

    try {
      const response = await axios.post('http://localhost:8080/users/register/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('User created successfully.', {
        onClose: () => navigate('/login')
      });
      
    } catch (error) {
      toast.error('This user already exist!');
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name Field */}
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-secondary font-medium mb-2">First Name</label>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  id="firstName"
                  {...field}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-primary focus:ring-yellow'
                  }`}
                />
              )}
            />
            {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
          </div>

          {/* Last Name Field */}
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-secondary font-medium mb-2">Last Name</label>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  id="lastName"
                  {...field}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-primary focus:ring-yellow'
                  }`}
                />
              )}
            />
            {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-secondary font-medium mb-2">Email</label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  id="email"
                  type="email"
                  {...field}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-primary focus:ring-yellow'
                  }`}
                />
              )}
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          {/* Username Field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-secondary font-medium mb-2">Username</label>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  id="username"
                  {...field}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.username ? 'border-red-500 focus:ring-red-500' : 'border-primary focus:ring-yellow'
                  }`}
                />
              )}
            />
            {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-secondary font-medium mb-2">Password</label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  id="password"
                  type="password"
                  {...field}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.password ? 'border-red-500 focus:ring-red-500' : 'border-primary focus:ring-yellow'
                  }`}
                />
              )}
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>

          {/* Profile Image Field */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-secondary font-medium mb-2">Profile Image</label>
            <Controller
              name="image"
              control={control}
              render={({ field: { onChange, onBlur, ref } }) => (
                <input
                  type="file"
                  onChange={(e) => onChange(e.target.files)}
                  onBlur={onBlur}
                  ref={ref}
                  className={`w-full text-primary border rounded-md focus:outline-none focus:ring-2 ${
                    errors.image ? 'border-red-500 focus:ring-red-500' : 'border-primary focus:ring-yellow'
                  }`}
                />
              )}
            />
            {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow text-background font-bold py-2 px-4 rounded-md hover:bg-primary transition duration-300"
          >
            Register
          </button>
        </form>
         {/* Toast container to render notifications */}
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} closeOnClick />
      </div>
    </div>
  );
};

export default RegisterForm;
