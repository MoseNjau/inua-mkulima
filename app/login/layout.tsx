import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Sign In – Inua Mkulima Subsidy Program',
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">

      {/* ── LEFT PANEL ── bg.png has the crest + triangle built in */}
      <div
        className="hidden lg:block flex-shrink-0 relative overflow-hidden"
        style={{ width: '43%' }}
      >
        <Image
          src="/images/bg.png"
          alt="Inua Mkulima farmer"
          fill
          className="object-cover object-top"
          priority
          sizes="43vw"
        />

        {/* Co-op Bank logo — top-left only */}
        <div className="absolute top-6 left-6 z-20">
          <Image
            src="/images/Coop.svg"
            alt="Co-op Bank"
            width={100}
            height={48}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex items-center justify-center bg-white relative px-8 py-12">

        {/* Card — overflow visible so leaves can spill out of the top-right edge */}
        <div
          className="relative z-10 w-full bg-white rounded-xl px-9 py-9"
          style={{
            maxWidth:  '370px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
            overflow:  'visible',
          }}
        >
          {/* Leaves — anchored to top-right corner of the CARD */}
          <div
            className="absolute pointer-events-none select-none"
            aria-hidden="true"
            style={{ top: '-30px', right: '-20px' }}
          >
            <Image
              src="/images/leaves.png"
              alt=""
              width={170}
              height={155}
              className="object-contain"
            />
          </div>

          {children}
        </div>
      </div>

    </div>
  )
}
