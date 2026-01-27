import React from 'react'
import type { MDXComponents } from 'mdx/types'
import { highlight } from 'sugar-high'

function Code({
  children,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
  const codeHTML = highlight(children as string)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    code: Code,
    ...components,
  }
}
