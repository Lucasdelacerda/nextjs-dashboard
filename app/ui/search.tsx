'use client'; //componente do cliente para usar listas de eventos e hooks

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useSearchParams,useRouter } from 'next/navigation';
import {  } from 'next/router';

export default function Search({ placeholder }: { placeholder: string }) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();//aplicando os parâmetros de pesquisa

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams)//manipulando os marâmetros da url conforme editado
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }// caso esteja vazio o input ele não prossegue
    replace(`${pathname}?${params.toString()}`)//transforma o input para um url-fliendly-format
  }
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        onChange={(e) => {
          handleSearch(e.target.value)
        }}//vai capturar o que foi editado
        defaultValue={searchParams.get('query')?.toString()}
        //sincronização do unput com url passando o defaultvalue para ser lido pelo searchParams
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
