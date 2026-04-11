const MyNabvar = ({ search, setSearch }) => {
  return (
     <nav className="navbar-container">
      <div className="search-box" style={{marginLeft:"60px"}}>
        <span className="icon-search" style={{fontSize:"20px"}}>🔍</span>
        <input 
        style={{marginTop:"30px", padding:"2px"}}
          type="text" 
          placeholder=" Search..." 
          name="search" 
          id="search" 
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </nav>
   
  );
};

export default MyNabvar;
