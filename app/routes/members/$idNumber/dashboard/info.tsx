import { LoaderFunction, useLoaderData } from 'remix';
import { db } from '~/utils/db.server';
import { User } from '.prisma/client';
export let loader: LoaderFunction = async ({}) => {
    let users = await db.user.findMany()
    console.log(users)
    return users
}

export default function Info(){
    let data = useLoaderData<User[]>();
    console.log("users",data)
    return <div>{data.map(user => <p>{user.name}</p>)}</div>
}