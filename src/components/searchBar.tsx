'use client'
import { getPostsByQuery } from '@/utils/supabase/queries'
import { useQuery } from "@tanstack/react-query"
import { Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export const SearchBar = () => {
  const pathname = usePathname()
  const [query, setQuery] = useState('')
  const {data} = useQuery({
    queryKey: ['search', query], // query lite som en useEffect
    queryFn: async (event) => {
      const {data, error} = await getPostsByQuery(query)

      if (error) throw error
      return data
    },
    enabled: () => (query && query.length >= 3 ? true : false) // om längre än 3 tecken sök annars inte
  })

  // töm text i inputfältet?
  useEffect(() => {
    setQuery('')
  }, [pathname])

  console.log(data)

  return (
    <div className='relative w-full max-w-lg'>
      <div className='flex relative w-full items-center gap-2 rounded-full bg-white px-4 py-2 text-zinc-400'>
        <label htmlFor='search'>
          <Search size={20} />
        </label>
        <input
          id='search'
          type='text'
          value={query} // lägg till för useEffect ?
          placeholder='search...'
          className='text-zinc-800 outline-none'
          onChange={async (event) => {
            setQuery(event.target.value)
          }}
        />
        <div>
          {data && (
            <div className={searchResultClasses}>
              {data.length === 0 ? (
                <div>no posts found with that title</div>
              ) : (
                data.map(({id, title, slug}) => (
                  <Link key={id} href={`/post/${slug}`} className={searchResultItemClasses}>
                    {title}
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const searchResultClasses =
  'absolute top-[calc(100%+.5rem)] flex w-full flex-col gap-2 rounded-2xl bg-white py-4 shadow-md'
const searchResultItemClasses = 'w-full px-4 py-2 hover:bg-slate-50'
