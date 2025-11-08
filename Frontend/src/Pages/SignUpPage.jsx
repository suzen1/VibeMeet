//ERROR: FIX ALL FELDES EMAIL AND MORE

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../lib/api.js';
import useSignUp from '../hooks/useSignUp.js';

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    Fullname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // const queryClient = useQueryClient();
  // const { mutate:signupMutetion, isPending, error } = useMutation({
  //   mutationFn: signup,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["authUser"] });
  //     navigate("/"); // Redirect after success
  //   },
  // });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">

        {/* LEFT SIDE (Signup Form) */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 bg-base-200 flex items-center justify-center">
          <form className="w-full space-y-4" onSubmit={handleSignup}>
            <div>
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                Streamify
              </span>
              <h2 className="text-xl font-semibold">Create an Account</h2>
              <p className="text-sm opacity-70">
                Join Streamify and start your language learning adventure!
              </p>
            </div>

            <div className="space-y-3">
              {/* FULL NAME */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered w-full"
                  value={signupData.Fullname}
                  onChange={(e) =>
                    setSignupData({ ...signupData, Fullname: e.target.value })
                  }
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="john@gmail.com"
                  className="input input-bordered w-full"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="input input-bordered w-full"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                  required
                />
                <p className="text-xs opacity-70 mt-1">
                  Password must be at least 6 characters long
                </p>
              </div>

              {error && <p className="text-error text-sm">{error.message}</p>}

              <button className="btn btn-primary w-full" type="submit" >
                {isPending ? (<>
                  <samp className='loading loading-spinner loading-xs'></samp>
                  Loading..
                </>
                ) : ("Create Account")}
              </button>

              <div className="text-center mt-4">
                <p className="text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* RIGHT SIDE (Logo + Info) */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <div className="mb-4 flex items-center justify-start gap-2">
            <img src="/Images/Singup-image.png" alt="signup" />
          </div>
          <p className="opacity-70">
            Learn, chat, and grow with others on Streamify — your language-learning
            adventure begins here!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
