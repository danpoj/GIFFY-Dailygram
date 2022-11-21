import { useSession, signIn, signOut } from 'next-auth/react'

export default function Button({ text, color, Icon, provider }) {
  return (
    <button
      onClick={() => signIn(provider)}
      className='py-2 w-full px-8 border border-black rounded flex items-center gap-2 hover:bg-stone-700 hover:text-stone-100 transition duration-100'
    >
      <Icon className={`${color} text-lg`} />
      <h3>{text}</h3>
    </button>
  )
}
