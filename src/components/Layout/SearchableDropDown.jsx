import React, { useState, useRef, useEffect } from "react";

const SearchableDropdown = ({ options, placeholder = "Select...", onSelect }) => {
  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);
  

  // Filter options when search changes
  
  useEffect(() => {
    setFilteredOptions(
      options.filter((opt) =>
        opt.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, options]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Input box */}
      <input
        type="text"
        value={search}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md p-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onFocus={() => setShowDropdown(true)}
        style={{ padding: '10px', fontFamily: 'InterRegular', border: '1px solid #ccc', borderRadius: '4px' }}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Dropdown list */}
      {showDropdown && filteredOptions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md z-10">
          {filteredOptions.map((opt, index) => (
            <li
              key={index}
              onClick={() => {
                setSearch(opt);
                onSelect(opt);
                setShowDropdown(false);
              }}
              className="px-3 py-5 cursor-pointer hover:bg-gray-100"
              style={{paddingTop:15, paddingBottom:15, paddingLeft:5}}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}

      {/* No results */}
      {showDropdown && filteredOptions.length === 0 && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-md p-2 text-gray-500">
          No results found
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
