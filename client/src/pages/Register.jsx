import { useAuthStore } from '@/store/useAuthStore';
import { Form } from 'react-router-dom';
import { Input, Button } from '@/components/ui';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const { signup, isSigningUp } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const {name,value} = e.target
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
    navigate('/login');
  };


  return (
    <section className='p-5 authBg h-screen flex items-center'>
      <div className='w-full max-w-6xl md:h-[600x] h-[650px] bg-secondary rounded-2xl shadow-2xs'>
        <form
          method='post'
          onSubmit={handleSubmit}
          className='p-5 flex flex-col gap-y-4'
        >
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='name' className=''>
              Name
            </label>
            <Input
              id='name'
              name='name'
              placeholder='Enter your name'
              className='p-5'
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='email' className=''>
              Email
            </label>
            <Input
              id='email'
              name='email'
              value={formData.email}
              type='email'
              placeholder='Enter your email'
              className='p-5'
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='password' className=''>
              Password
            </label>
            <Input
              id='password'
              name='password'
              value={formData.password}
              type='password'
              placeholder='Enter your name'
              className='p-5'
              onChange={handleChange}
            />
          </div>
          <Button disabled={isSigningUp} size='lg' className='p-5 font-bold'>
            Register
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Register;
