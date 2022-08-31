import Link from 'next/link';

import type { NextPage } from 'next';

export const getStaticProps = () => {
  return {
    props: {},
  };
};

type Props = {
  any: any;
};

const Sandbox: NextPage<Props> = ({}) => {
  return (
    <>
      <Link href={`/sandbox/1`} passHref>
        <a>Sandbox</a>
      </Link>
    </>
  );
};

export default Sandbox;
