import { useAuthStore } from '@/store/useAuthStore';
import { Input, Button } from '@/components/ui';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'

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
    <section className='p-5 authBg h-screen flex items-center justify-center text-foreground'>
      <div className='w-full max-w-6xl md:h-[800x] h-[550px] bg-background rounded-2xl shadow-2xs'>
        {/* left side */}
        <div className=' p-8 w-1/2 h-full flex flex-col items-center justify-center md:border-r border-b-emerald-400-600/30'>
          <div className='w-full max-w-md'>
            <div className=' flex flex-col items-center'>
              <img src={logo} alt="" className='h-10 mb-4'/>
              <h2 className='text-2xl font-bold mb-2'>Create Account</h2>
              <p className='text-muted-foreground text-sm'>
                Sign up for new Account
              </p>
            </div>
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
              <div className='flex flex-col gap-y-2 text-sm '>
                <label htmlFor='email' className='text-sm'>
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
                <label htmlFor='password' className='text-sm'>
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
              <Button
                disabled={isSigningUp}
                size='lg'
                className='p-5 font-bold'
              >
                Register
              </Button>
            </form>
            <div className='text-center'>
              <Button className='text-center' variant='secondary'>
                <Link to='/login'>
                already have an account? Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
