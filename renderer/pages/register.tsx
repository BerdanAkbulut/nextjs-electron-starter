import React from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';
import Cookies from 'js-cookie';
import Link from 'next/link';

type Props = { data: any };

type FormValues = {
  email: string;
  name: string;
};
// const resolver: Resolver<FormValues> = async (values) => {
//   return {
//     values: values.email ? values : {},
//     errors: !values.email
//       ? {
//           firstName: {
//             type: 'required',
//             message: 'This is required.',
//           },
//         }
//       : {},
//   };
// };

const Register = (props: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch('api/createUser', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ email: data.email, name: data.name }),
    });
    const res2 = await res.json();
    console.log(res2);
    if ((res2.status = 200)) {
      Cookies.set(
        'user',
        JSON.stringify({ email: data.email, name: data.name })
      );
    }
    reset();
    window.location.reload();
  });
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Link href="/home">Come Back</Link>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 w-[500px] items-center"
      >
        <input
          {...register('email')}
          placeholder="Email"
          className="text-gray-900"
        />
        {errors?.email && <p>{errors.email.message}</p>}

        <input
          {...register('name')}
          placeholder="Name"
          className="text-gray-900"
        />

        <button className="bg-white text-gray-900 p-2 h-10 w-10" type="submit">
          Save
        </button>
      </form>

      <div></div>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   let data: any = fetch('https://jsonplaceholder.typicode.com/todos/1')
//     .then((response) => response.json())
//     .then((json) => console.log(json));

//   return {
//     props: {
//       data,
//     },
//   };
// };

export default Register;
