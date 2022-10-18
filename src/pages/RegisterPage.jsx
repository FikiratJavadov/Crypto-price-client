import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, checkIsAuth } from '../redux/slice/auth/authSlice';
import { toast } from 'react-toastify';

export const RegisterPage = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    
  }, [status, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(
        registerUser({
          username,
          password,
          navigate
        }),
      );
      setUserName('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={(e) => e.preventDefault()} className='w-1/4 h-60 mx-auto mt-40'>
      <h1 className='text-lg text-black text-center'>Регистрация</h1>
      <label className='text-xs text-gray-400'>
        Username:
        <input
          type='text'
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder='Username'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
        />
      </label>

      <label className='text-xs text-gray-400'>
        Password:
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
        />
      </label>

      <div className='flex gap-8 justify-center mt-4'>
        <button
          type='submit'
          onClick={handleSubmit}
          className='flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4'>
          Подтвердить
        </button>
        <Link to='/login' className='flex justify-center items-center text-xs text-black'>
          Уже зарегистрированы ?
        </Link>
      </div>
    </form>
  );
};
