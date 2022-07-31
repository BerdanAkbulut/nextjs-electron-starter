import React from 'react';
import Head from 'next/head';
import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next';


type Props = {
  data: any[];
};
function Home({ data }: Props) {
  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        {/* <Link href='/register'>Register</Link> */}
        <button
          onClick={() => {
            Cookies.remove('user');
            window.location.reload();
          }}
        >
          Logoutt
        </button>
       

        {/* <ReactPlayer config={{}} url='https://www.shazam.com/track/20066955/kiss-the-rain' /> */}
        {data.map((item) => (
          <img
            className="w-[250px] h-[250px] shrink object-contain"
            src={item.image}
          />
        ))}
      </div>
    </React.Fragment>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetch('http://hp-api.herokuapp.com/api/characters');
  const response = await data.json();

  return {
    props: { data: response },
  };
};
export default Home;
