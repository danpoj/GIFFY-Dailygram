import { IoIosArrowDown } from 'react-icons/io'
import { TbSquarePlus } from 'react-icons/tb'
import Image from 'next/image'
import LoginModal from './LoginModal'
import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import UploadModal from './UploadModal'
import { MdOutlinePersonAddAlt } from 'react-icons/md'
import { CgLogOut } from 'react-icons/cg'
import Link from 'next/link'

export default function LandingPage() {
  const [isLoginModal, setIsLoginModal] = useState(false)
  const [isUploadModal, setIsUploadModal] = useState(false)
  const { data: session, status } = useSession()

  const userCheck = async () => {
    await fetch('/api/signUp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(session.user),
    })
  }

  useEffect(() => {
    if (status === 'authenticated') {
      userCheck()
    }
  }, [status])

  const onLoginBtnClick = () => {
    if (session) return

    setIsLoginModal(true)
  }

  const onAddPostBtnClick = () => {
    if (session == null) {
      setIsLoginModal(true)
    } else {
      setIsUploadModal(true)
    }
  }

  return (
    <div className='min-h-screen mx-auto'>
      <div className='grid gap-1 w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-4 '>
        <div className='font-extrabold text-3xl text-center pt-7 text-stone-600 flex items-center md:col-span-2 md:px-2 lg:col-span-3 lg:row-span-2 lg:flex-col lg:place-self-center lg:pt-0 lg2:col-span-2 xl:row-span-1 xl:col-span-2 mb-4 md:mb-0'>
          <Image
            className='w-[60%] h-16 object-cover lg:w-full lg:h-36'
            src='/nyan.gif'
            width={500}
            height={200}
            alt='nyan cat'
          />
          <h1 className='w-[40%] lg:w-full'>
            <span className='lg:text-6xl'>GIFFY </span>
            <span className='text-xl lg:text-3xl'>Dailygram</span>
          </h1>
        </div>

        <div className='h-32 overflow-hidden relative w-full group cursor-pointer md:h-auto md:aspect-square'>
          <span className='absolute inset-0 flex items-center justify-center text-xl font-bold z-10 text-white'>
            좋아요 순
          </span>
          <Image
            className='opacity-70 object-cover group-hover:scale-125 group-hover:opacity-100 transition'
            src='/gif1.webp'
            fill
            alt='gif1'
          />
        </div>
        {/* <div className='h-32 overflow-hidden relative group cursor-pointer md:h-auto md:aspect-square'>
          <span className='absolute inset-0 flex items-center justify-center text-xl font-bold z-10 text-white'>
            좋아요 순
          </span>
          <Image
            className='opacity-70 object-cover group-hover:scale-125 group-hover:opacity-100 transition'
            src='/gif2.webp'
            fill
            alt='gif2'
          />
        </div> */}

        <div className='h-32 overflow-hidden relative group cursor-pointer md:h-auto md:aspect-square lg2:col-start-3 lg2:row-start-2 xl:col-start-4'>
          <span className='absolute inset-0 flex items-center justify-center text-xl font-bold z-10 text-white'>
            조회수 순
          </span>
          <Image
            className='opacity-70 object-cover group-hover:scale-125 group-hover:opacity-100 transition'
            src='/gif3.webp'
            fill
            alt='gif3'
          />
        </div>

        {session ? (
          <div className='h-32 group md:h-auto md:aspect-square border flex items-center justify-center gap-2 border-stone-800 text-xs md:px-4 md:flex-col md:text-center'>
            <Image
              className='rounded-full w-[36px] h-[36px] object-cover'
              src={session.user.image}
              width={36}
              height={36}
              alt='user profile image'
            />
            <div>
              <div>{session.user.email}</div>
              <div className='font-bold'>{session.user.name}</div>
            </div>

            <div className='flex flex-col gap-2 mx-2'>
              <Link
                href='/my-posts'
                className='border border-black p-2 w-20 hover:bg-slate-600 hover:text-slate-100 transition duration-100'
              >
                내 게시글
              </Link>
              <Link
                href='#'
                className='border border-black p-2 w-20 hover:bg-slate-600 hover:text-slate-100 transition duration-100'
              >
                내 댓글
              </Link>
            </div>

            <button
              className=' text-rose-600 underline flex ml-4 md:ml-0 md:mt-3'
              onClick={() => signOut()}
            >
              <CgLogOut className='' />
              <span>로그아웃</span>
            </button>
          </div>
        ) : (
          <div
            onClick={onLoginBtnClick}
            className='h-32 overflow-hidden group cursor-pointer md:h-auto md:aspect-square border flex items-center justify-center gap-1 border-stone-400 text-stone-400 hover:border-stone-800 hover:text-stone-800 hover:border-2 hover:font-bold'
          >
            <MdOutlinePersonAddAlt className='text-xl' />
            <span>로그인</span>
          </div>
        )}

        <div
          onClick={onAddPostBtnClick}
          className='h-32 border md:h-auto md:aspect-square border-stone-400 text-stone-400 hover:font-bold hover:text-stone-800 hover:border-stone-800 hover:border-2 transition flex items-center justify-center gap-1 cursor-pointer md:col-start-1 md:row-start-2 lg:col-start-2 lg:col-span-3 lg:aspect-auto lg:row-start-3 lg2:aspect-square lg2:col-start-4 lg2:row-start-2 xl:col-start-1 xl:aspect-auto'
        >
          <span>게시글 작성</span>
          <TbSquarePlus className='text-xl' />
        </div>

        <div className='flex flex-col justify-end w-full items-center fixed bottom-2 xl2:w-auto xl2:right-10 -z-10'>
          <IoIosArrowDown className='text-xl animate-bounce' />
          <span className='text-sm'>모든 게시글 보러가기</span>
        </div>
      </div>

      {/* 로그인, 업로드 모달창 */}
      <LoginModal
        isLoginModal={isLoginModal}
        setIsLoginModal={setIsLoginModal}
      />
      <UploadModal
        isUploadModal={isUploadModal}
        setIsUploadModal={setIsUploadModal}
      />
    </div>
  )
}
