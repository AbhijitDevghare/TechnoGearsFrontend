import React from "react"
import useDebounceHook from "../../hooks/useDebounceHook.js"

function Search({ updateSearch }) {
  const debouncedCallback = useDebounceHook(
    (e) => updateSearch(e.target.value)
  )

  return (
    <div className="h-[50px] rounded-2xl w-[90vw] lg:w-[50vw] md:w-[60vw] flex flex-row items-center justify-evenly relative top-10 bg-[#02305a] p-[10px]">
      <i className="fa-solid fa-magnifying-glass"></i>

      <input
        type="text"
        placeholder="Search products, brands, categories and more"
        className="w-[75%] outline-none focus:outline-none focus:ring-0 focus:border-transparent bg-transparent text-white"
        onChange={debouncedCallback}
      />

      <i className="fa-solid fa-microphone"></i>
    </div>
  )
}

export default Search
