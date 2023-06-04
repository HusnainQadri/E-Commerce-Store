import { useState } from 'react';
import { signin_helper } from '../../helper';
import {useNavigate} from 'react-router-dom'
function SignIn() {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = async () => {
      const resp = await signin_helper(userName, password);
      console.log(resp);
      if (resp.message==="Authentication succeeded")
      {
        console.log(resp)
        localStorage.setItem("token",resp.token)
        localStorage.setItem("userid",resp.id)
        navigate("/home")
      }
    }
    data()
  };

  return (

    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 class="text-6xl font-extrabold text-gray-900 text-center  mb-12">
          Ecommerce Store
        </h1>
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Or{' '}
          <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            create an account
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                user name
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="user name"
                  type="username"
                  autoComplete="user name "
                  required
                  value={userName}
                  onChange={(event) => setUsername(event.target.value)}
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="h-5 w-5 text-gray-400 focus:outline-none"
                    onClick={() => setPassword('')}
                  >
                    {/* TODO: Replace with an icon */}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;