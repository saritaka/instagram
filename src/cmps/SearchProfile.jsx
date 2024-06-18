export function SearchProfile() {
  // const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  // useEffect(() => {
  //   let activeFilterBy = {};
  //   for (const field in filterBy) {
  //     if (filterBy[field] != null) {
  //       activeFilterBy[field] = filterBy[field];
  //     }
  //   }
  //   setSearchParams(activeFilterBy);
  //   loadEmails();
  // }, [filterBy]);

  function onSubmitFilter() {}

  function handleChange() {}

  // function onSetFilter(fieldsToUpdate) {
  //   setFilterBy((prevFilter) => ({ ...prevFilter, ...fieldsToUpdate }));
  // }

  return (
    <section className="filter-modal">
      <h1>Search</h1>
      <div className="search-box">
        <form onSubmit={onSubmitFilter}>
          <div className="user-input">
            <input
              type="text"
              placeholder="Search"
              name="txt"
              // value={filterByToEdit.txt}
              // onChange={handleChange}
            ></input>
            {/* <button className="header-icon">
              <img src={searchIcon}></img>
            </button> */}
          </div>
        </form>
        {/* <button className="header-icon" onClick={onOpenFilter}>
          <img src={filterIcon}></img>
        </button> */}
      </div>
    </section>
  );

  //       <div>
  //       <span>{field.title}</span>
  //       <input
  //         type={field.type}
  //         id={field.title}
  //         name={field.title}
  //         onChange={handleChange}
  //         value={field.value}
  //       ></input>
  //     </div>
  //   );
  // })

  // <div className="filter-btn">
  //   <button>Search</button>
  // </div>
}
