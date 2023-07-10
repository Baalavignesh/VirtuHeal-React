import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { GetColleges } from "../api_calls/GetCollege";


function SearchCollege(props) {
  const [allCollege, setAllCollege] = useState([]);

  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");



  let getAllCollege = async () => {
    let response = await GetColleges();
    const responseData = await response.json();
    console.log(responseData.data);
    setAllCollege(responseData.data);
  }
    useEffect(() => {
      props.change(selected);
      getAllCollege();
    },[])


    useEffect(() => {
        console.log(selected)
        props.change(selected.college_id);
    }, [selected])

  const filteredCollege =
    query === ""
      ? allCollege
      : allCollege.filter((college) =>
          college.college_name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className="relative ">
          <Combobox.Input
            className="p-2 mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-72 m-4"
            displayValue={(college) => college.college_name}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="College"
            name={props.name}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-6">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute -mt-4 max-h-60 w-72 overflow-auto rounded-md bg-white py-1 ml-4 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredCollege.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredCollege.map((college) => (
                <Combobox.Option
                  key={college.college_id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-teal-600 text-white" : "text-gray-900"
                    }`
                  }
                  value={college}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {college.college_name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
    </Combobox>
  );
}

export default SearchCollege;


// const people = [
//   { id: 1, name: "Wade Cooper" },
//   { id: 2, name: "Arlene Mccoy" },
//   { id: 3, name: "Devon Webb" },
//   { id: 4, name: "Tom Cook" },
//   { id: 5, name: "Tanya Fox" },
//   { id: 6, name: "Hellen Schmidt" },
// ];

// export default function Example() {
//   const [selected, setSelected] = useState(people[0]);
//   const [query, setQuery] = useState("");

//   const filteredPeople =
//     query === ""
//       ? people
//       : people.filter((person) =>
//           person.name
//             .toLowerCase()
//             .replace(/\s+/g, "")
//             .includes(query.toLowerCase().replace(/\s+/g, ""))
//         );

//   useEffect(() => {
//     console.log(selected)
//   }, [selected]);

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="fixed top-16 w-72">
//         <Combobox value={selected} onChange={setSelected}>
//           <div className="relative mt-1">
//             <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
//               <Combobox.Input
//                 className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
//                 displayValue={(person) => person.name}
//                 onChange={(event) => setQuery(event.target.value)}
//               />
//               <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
//                 <ChevronUpDownIcon
//                   className="h-5 w-5 text-gray-400"
//                   aria-hidden="true"
//                 />
//               </Combobox.Button>
//             </div>
//             <Transition
//               as={Fragment}
//               leave="transition ease-in duration-100"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//               afterLeave={() => setQuery("")}
//             >
//               <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                 {filteredPeople.length === 0 && query !== "" ? (
//                   <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
//                     Nothing found.
//                   </div>
//                 ) : (
//                   filteredPeople.map((person) => (
//                     <Combobox.Option
//                       key={person.id}
//                       className={({ active }) =>
//                         `relative cursor-default select-none py-2 pl-10 pr-4 ${
//                           active ? "bg-teal-600 text-white" : "text-gray-900"
//                         }`
//                       }
//                       value={person}
//                     >
//                       {({ selected, active }) => (
//                         <>
//                           <span
//                             className={`block truncate ${
//                               selected ? "font-medium" : "font-normal"
//                             }`}
//                           >
//                             {person.name}
//                           </span>
//                           {selected ? (
//                             <span
//                               className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
//                                 active ? "text-white" : "text-teal-600"
//                               }`}
//                             >
//                               <CheckIcon
//                                 className="h-5 w-5"
//                                 aria-hidden="true"
//                               />
//                             </span>
//                           ) : null}
//                         </>
//                       )}
//                     </Combobox.Option>
//                   ))
//                 )}
//               </Combobox.Options>
//             </Transition>
//           </div>
//         </Combobox>
//       </div>
//     </div>
//   );
// }
