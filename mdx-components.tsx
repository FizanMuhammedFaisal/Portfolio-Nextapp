import React, { ComponentPropsWithoutRef } from 'react'
import Link from 'next/link'
import { highlight } from 'sugar-high'

type ParagraphProps = ComponentPropsWithoutRef<'p'>
type ListProps = ComponentPropsWithoutRef<'ul'>
type ListItemProps = ComponentPropsWithoutRef<'li'>
type AnchorProps = ComponentPropsWithoutRef<'a'>
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>

const components = {
  h1: (props: ComponentPropsWithoutRef<'h1'>) => (
    <h1
      className="font-semibold text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight pb-4 md:pt-10 mb-6 md:mb-8 text-white"
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <h2
      className="text-zinc-100 text-2xl font-semibold mt-16 mb-6 leading-tight tracking-normal"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3
      className="text-zinc-200 text-1xl font-semibold mt-12 mb-4 leading-snug tracking-normal"
      {...props}
    />
  ),
  h4: (props: ComponentPropsWithoutRef<'h4'>) => (
    <h4 className="text-zinc-300 text-xl font-medium mt-8 mb-4" {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p className="text-zinc-300 leading-7 mb-6 md:mb-8 text-base " {...props} />
  ),
  ol: (props: ListProps) => (
    <ol
      className="text-zinc-300 list-decimal pl-8 space-y-3 mb-8 max-w-prose"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="text-zinc-300 list-disc pl-8 space-y-2 mb-8 max-w-prose"
      {...props}
    />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-medium text-zinc-200 not-italic" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-white" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      'text-blue-400 hover:text-blue-300 transition-colors duration-200'

    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      )
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      )
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    )
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string)
    const textContent = typeof children === 'string' ? children : ''

    return (
      <div className="relative my-8 rounded-lg bg-zinc-900 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 border-b border-zinc-700">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-zinc-600"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-600"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-600"></div>
          </div>
        </div>
        <div className="p-4 overflow-x-auto">
          <code
            className="text-sm font-mono text-zinc-200"
            dangerouslySetInnerHTML={{ __html: codeHTML }}
            {...props}
          />
        </div>
      </div>
    )
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <div className="my-8 overflow-hidden rounded-lg border border-zinc-800">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-800">
          <thead>
            <tr className="bg-zinc-900">
              {data.headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-800'}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="border-l-2 border-zinc-700 pl-6 italic text-zinc-400 my-8 max-w-prose"
      {...props}
    />
  ),
  hr: (props: ComponentPropsWithoutRef<'hr'>) => (
    <hr
      className="my-12 border-none h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"
      {...props}
    />
  ),
  // Inline code
  inlineCode: (props: ComponentPropsWithoutRef<'code'>) => (
    <code
      className="font-mono text-sm bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-200"
      {...props}
    />
  ),
}

declare global {
  type MDXProvidedComponents = typeof components
}

export function useMDXComponents(): MDXProvidedComponents {
  return components
}
