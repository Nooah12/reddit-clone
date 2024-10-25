import { createClient } from "@/utils/supabase/client"
import { notFound } from "next/navigation"

export default async function PostPage({params}: {params: { slug: string }}) {
  const supabase = createClient()
  const {data, error} = await supabase
    .from('posts')
    .select('users("email"), title, content')
    .eq('slug', params.slug) // letar upp kolumn "slug" o söker upp värdet vi letar efter?
    .single() // ist för array ifall endast ett objekt - slipper man skriva ut [0]

    if (!data || error) notFound()

    console.log({data})
  return (
    <section className='main'>
      <span className='mb-1 text-zinc-600'>{data.users?.email}</span>
      <h1 className='mb-4 text-2xl font-bold'>{data.title}</h1>
      <p>{data.content}</p>
    </section>
  )
}
 