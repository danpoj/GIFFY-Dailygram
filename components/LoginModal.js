import Button from './Button'
import { SiNaver, SiGithub } from 'react-icons/si'
import { FcGoogle } from 'react-icons/fc'
import { RiKakaoTalkFill } from 'react-icons/ri'
import Image from 'next/image'

export default function LoginModal({ isLoginModal, setIsLoginModal }) {
  if (!isLoginModal) return null

  const onClick = (e) => {
    if (e.target.id === 'login-modal') setIsLoginModal(false)
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setIsLoginModal(false)
    console.log('hello')
  })

  return (
    <div
      onClick={onClick}
      id='login-modal'
      className='fixed left-0 right-0 top-0 bottom-0 flex flex-col items-center justify-center z-50 bg-stone-900 bg-opacity-50'
    >
      <div className='flex flex-col items-center justify-center gap-1 bg-white pb-8 px-10 lg:px-20 rounded-xl z-10 relative'>
        <Image src='/nyan.gif' width={140} height={20} alt='nyan' />
        <h1 className='text-sm md:text-base mb-4 font-bold'>
          Giffy Dailygram 로그인
        </h1>
        <Button provider='google' text='Login with Google' Icon={FcGoogle} />
        <Button
          provider='github'
          text='Login with GitHub'
          color='text-stone-500'
          Icon={SiGithub}
        />
        <Button
          provider='kakao'
          text='Login with Kakao'
          color='text-[#3B1C1C] bg-[#F9E000]'
          Icon={RiKakaoTalkFill}
        />
        <Button
          provider='naver'
          text='Login with Naver'
          color='text-green-500'
          Icon={SiNaver}
        />
        <button
          onClick={() => setIsLoginModal(false)}
          className='absolute top-4 right-6 text-xl font-extrabold hover:text-rose-500'
        >
          &#10005;
        </button>
      </div>
    </div>
  )
}
