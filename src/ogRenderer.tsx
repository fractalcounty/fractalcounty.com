import type { RenderFunctionInput } from 'astro-opengraph-images'
import React from 'react'

export async function customOgMediaLayout({
  title,
}: RenderFunctionInput): Promise<React.ReactNode> {
  const twj = (await import('tw-to-css')).twj

  return (
    <div
      style={{
        ...twj('h-full w-full flex items-center'),
        backgroundImage: 'url("https://fractalcounty.com/images/grain.png")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}>
      <div style={twj('flex flex-col items-start text-left pl-20')}>
        <h1
          style={{
            ...twj('text-[60px] text-white uppercase mb-[-10px]'),
            fontFamily: 'AlteHaasGroteskBold, Arial, sans-serif',
          }}>
          FRACTAL COUNTY
        </h1>
        <h2
          style={{
            ...twj('text-[40px] text-white uppercase'),
            fontFamily: 'AlteHaasGroteskRegular, Arial, sans-serif',
          }}>
          {title}
        </h2>
      </div>
    </div>
  )
}
