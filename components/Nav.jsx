'use client';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Nav() {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  console.log('providers ', providers);
  const isLoggedIn = true;

  useEffect(() => {
    const asyncProviders = async () => {
      const provider = await getProviders();
      setProviders(provider);
    };
    asyncProviders();
  }, []);

  return (
    <nav className='w-full flex-between mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src={'/assets/images/logo.svg'}
          width={30}
          height={30}
          alt='logo'
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Prompt
            </Link>
            <button type='button' className='outline_btn' onClick={signOut}>
              Sign Out
            </button>
            <Link href='/profile'>
              <Image
                src={session?.user?.image}
                width={37}
                height={37}
                alt='profile'
                className='rounded-full'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  onClick={() => signIn(provider?.id)}
                  type='button'
                  key={provider.name}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* mobile navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user?.image}
              width={37}
              height={37}
              alt='profile'
              className='rounded-full'
              onClick={() => setShowDropdown((prev) => !prev)}
            />
            {showDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setShowDropdown(false)}
                >
                  My profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setShowDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  className='w-full mt-3 black_btn'
                  onClick={() => {
                    setShowDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  onClick={() => signIn(provider?.id)}
                  type='button'
                  key={provider.name}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
