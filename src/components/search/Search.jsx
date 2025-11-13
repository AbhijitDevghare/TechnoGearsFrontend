import useDebounceHook from "../../hooks/useDebounceHook"

function Search({updateSearch})
{
  const debouncedCallback = useDebounceHook((e) => updateSearch(e.target.value))
  
  return(
        <>
            <div className="hidden sm:flex flex-1 justify-center">
                <div className="form-control w-full max-w-md">
                  <input
                    type="text"
                    placeholder="Search products"
                    className="input input-bordered w-full sm:w-72 md:w-96"
                    onChange={debouncedCallback}
                  />
                </div>
              </div>
        </>
    )
}

export default Search