import { Link } from 'react-router-dom';

function Error404(){
    return (<>
    <main className="flex w-full pt-14 ">
        <div className="m-auto items-center gap-2 flex flex-col my-20">
            <img width="250" src="https://thumbs.dreamstime.com/b/broken-robot-fix-hand-drawn-vector-cartoon-illustration-trying-to-itself-81326219.jpg" alt="" />
            <span className='text-2xl'>404</span>
            <h1 className="text-xl text-center">This page isn't available. Sorry about that. <br />Please try searching something else.</h1>
            <Link to='/'><button className="my-1 bg-black w-fit px-3 py-1 text-lg  text-white rounded-sm">Home Page</button></Link>
        </div>
    </main>
    </>)
}

export default Error404;