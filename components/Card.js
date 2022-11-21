import Image from 'next/image'

export default function Card({ text, img }) {
  return (
    <div className='h-32 overflow-hidden relative'>
      <span className='absolute inset-0 flex items-center justify-center text-xl font-bold z-10 mix-blend-difference invert text-black bg-white'>
        {text}
      </span>
      <Image src={img} width={500} height={200} alt='gif1' />
    </div>
  )
}
