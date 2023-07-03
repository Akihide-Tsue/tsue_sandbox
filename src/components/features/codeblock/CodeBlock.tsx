import type { ReactNode } from 'react';
// @ts-ignore
import type { CodeComponent } from 'react-markdown/src/ast-to-react';
// @ts-ignore
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus';

import styles from './CodeBlock.module.scss';

type Props = {
  inline: string;
  className: string;
  children: ReactNode;
};

const CodeBlock: CodeComponent = ({ inline, className, children }: Props) => {
  if (inline) {
    return <code className={className}>{children}</code>;
  }
  const match = /language-(\w+)(:.+)/.exec(className || '');
  const lang = match && match[1] ? match[1] : '';
  const name = match && match[2] ? match[2].slice(1) : '';

  return (
    <div className={styles.codeblock_wrapper}>
      <div className={styles.codeblock_title}>{name}</div>
      <SyntaxHighlighter style={vscDarkPlus} language={lang}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
