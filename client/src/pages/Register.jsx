import { useAuthStore } from '@/store/useAuthStore';
import { Button, Spinner } from '@/components/ui';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import signupImg from '../assets/signup.png';
import { FormRow } from '@/components';
const Register = () => {
  const { signup, isSigningUp } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <section className='p-5 authBg h-screen flex items-center justify-center text-foreground'>
      <div className='w-full max-w-6xl h-[550px] md:h-[650px] bg-background rounded-2xl shadow-2xs'>
        <div className='w-full h-full flex flex-col md:flex-row'>
          {/* left side */}
          <div className=' p-8 w-1/2 h-full flex flex-col items-center justify-center md:border-r border-b-emerald-400-600/30'>
            <div className='w-full max-w-md'>
              <div className=' flex flex-col items-center'>
                <img src={logo} alt='' className='h-10 mb-4' />
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
                <FormRow
                  label='Name'
                  placeholder='Enter your name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                />
                <FormRow
                  label='Email'
                  placeholder='Enter your email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                />
                <FormRow
                  label='Password'
                  placeholder='Password'
                  name='password'
                  type='password'
                  value={formData.password}
                  onChange={handleChange}
                />
                <Button
                  disabled={isSigningUp}
                  size='lg'
                  className='p-5 font-bold'
                >
                  {isSigningUp ? (
                    <>
                      <Spinner /> Signing Up...
                    </>
                  ) : (
                    'Register'
                  )}
                </Button>
              </form>
              <div className='text-center'>
                <Button className='text-center' variant='secondary'>
                  <Link to='/login'>already have an account? Login</Link>
                </Button>
              </div>
            </div>
          </div>
          {/* Right Side */}
          <div className='hidden md:w-1/2 md:flex items-center justify-center p-6'>
            <div>
              <img
                src={signupImg}
                className='w-full h-auto object-contain'
                alt=''
              />
              <div className='mt-6 text-center'>
                <h3 className='text-xl text-primary font-semibold'>
                  Start Your Journey Today
                </h3>
              </div>
              <div className='mt-2 flex text-primary justify-center gap-3'>
                <span className='py-2 px-4 text-xs font-semibold bg-secondary rounded-2xl'>
                  Free
                </span>
                <span className='py-2 px-4 text-xs font-semibold bg-secondary rounded-2xl'>
                  Easy setup
                </span>
                <span className='py-2 px-4 text-xs font-semibold bg-secondary rounded-2xl'>
                  Private
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
