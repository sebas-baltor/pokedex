import { useRouter } from 'next/router'

export default function Pokemon (){
    const router = useRouter();
    return (
        <div className='bg-slate-300'>
            {router.query.id}
        </div>
    )
}

