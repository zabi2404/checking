import React from 'react'

export default function CustomDiv() {
  return (
    <>
    
    <div
      className=" h-[600px] md:w-[550px] aspect-square rounded-[20px] overflow-hidden
      xsm:h-[300px] xsm:-order-1 
      "
      style={{
        "--r": "20px",
        "--s": "30px",
        "--x": "20px",
        "--y": "10px",
        "--_m":
          "/calc(2*var(--r)) calc(2*var(--r)) radial-gradient(#000 70%,#0000 72%)",
        "--_g":
          "conic-gradient(at var(--r) var(--r),#000 75%,#0000 0)",
        "--_d": "(var(--s) + var(--r))",
        mask: `
          calc(var(--_d) + var(--x)) 0 var(--_m),
          0 calc(var(--_d) + var(--y)) var(--_m),
          radial-gradient(var(--s) at 0 0,#0000 99%,#000 calc(100% + 1px)) 
          calc(var(--r) + var(--x)) calc(var(--r) + var(--y)),
          var(--_g) calc(var(--_d) + var(--x)) 0,
          var(--_g) 0 calc(var(--_d) + var(--y))
        `,
        maskRepeat: "no-repeat",
      } as React.CSSProperties}
    >

        <img src="../../public/abstract-creative-illustration.jpg" alt="preview" className="w-full h-full object-cover " />
    
    </div></>
  )
}
