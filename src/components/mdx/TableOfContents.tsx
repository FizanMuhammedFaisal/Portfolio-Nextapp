// 'use client'

// import { useEffect, useState, useRef } from 'react'

// type Heading = {
//   id: string
//   text: string
//   level: number
// }

// export default function TableOfContents() {
//   const [headings, setHeadings] = useState<Heading[]>([])
//   const [activeId, setActiveId] = useState<string | null>(null)
//   const observerRef = useRef<IntersectionObserver | null>(null)

//   useEffect(() => {
//     const selector = 'h2'
//     const nodes = Array.from(document.querySelectorAll(selector))

//     const headingData = nodes.map((el) => {
//       const level = parseInt(el.tagName.replace('H', ''))
//       const text = el.textContent ?? ''
//       let id = el.id
//       if (!id) {
//         // id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w]/g, '')
//         el.id = id
//       }

//       return { id, text, level }
//     })

//     setHeadings(headingData)

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setActiveId(entry.target.id)
//           }
//         })
//       },
//       {
//         rootMargin: '0px 0px -60% 0px',
//         threshold: 1.0,
//       }
//     )

//     nodes.forEach((node) => observer.observe(node))
//     observerRef.current = observer

//     return () => {
//       observer.disconnect()
//     }
//   }, [])

//   return (
//     <nav className="sticky top-24 p-4">
//       <h2 className="text-white font-bold mb-2 text-lg">On This Page</h2>
//       <ul className="space-y-2 text-sm text-zinc-400">
//         {headings.map((h) => (
//           <li key={h.id} className={`ml-${(h.level - 1) * 4}`}>
//             <a
//               href={`#${h.id}`}
//               className={`block transition-colors duration-200 ${
//                 h.id === activeId
//                   ? 'text-white font-semibold'
//                   : 'hover:text-white'
//               }`}
//             >
//               {h.text}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   )
// }
