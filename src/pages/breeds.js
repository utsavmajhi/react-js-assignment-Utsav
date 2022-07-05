import React,{useState,useEffect} from 'react';
import axios from 'axios'
import HeaderWithIcon from '../components/Headers/headerIcon';
import '../css/card.css' 


const Breeds = () => {

  const [dogs,setDogs] = useState([])
  const [filter,setFilter] = useState('')
  const [sortDesc,setSort] = useState(false)

  useEffect(() => {
    const prevData = JSON.parse(window.localStorage.getItem("data"));
    const prevFilter = JSON.parse(window.localStorage.getItem("filterValue"))
    const prevSort = JSON.parse(window.localStorage.getItem("sort"))
    
    if(prevData){
      setDogs(JSON.parse(window.localStorage.getItem("data")));
      if(prevSort){
        const sortedData = !prevSort.sort ? prevData.sort() : prevData.reverse()
        setDogs(sortedData);
        setSort(prevSort.sort);
      }
    }else{
      getBreeds().then(items => {
        window.localStorage.setItem("data", JSON.stringify(items));
        if(prevSort){
          const sortedData = !prevSort.sort ? items.sort() : items.reverse()
          setDogs(sortedData);
          setSort(prevSort.sort);
        }
       })
    }
    if(prevFilter){
      setDogs(prevData.filter(item => (new RegExp(prevFilter.searchbar, "i")).test(item.name)))
      setFilter(prevFilter.searchbar)
    } 
    
  }, [sortDesc]);

  const sorting = (sortValue) => {
    setSort(!sortValue)
    // sortValue ? dogs.sort() : dogs.reverse()
    window.localStorage.setItem("sort", JSON.stringify({"sort":!sortValue}));
  }

  const getBreeds =  async() => {
    try{
      const resp = await axios.get('https://api.thedogapi.com/v1/breeds',
      {
        'x-api-key' : 'e47ee0a8-27cb-4798-8fa8-d3d74240ff92',
        'content-type' : 'application/json'
      })
      console.log('Resp',JSON.stringify(resp))
      console.log('Previous State',dogs)
      //setDogs(resp.data)
      return resp.data
    }catch(e){
      console.log('Error',e)
    }
  }


  const filterResults = (filterValue) => {
  
    const prevData = JSON.parse(window.localStorage.getItem("data"));
    console.log('FILTERED',filter)
    console.log('prev....data',prevData)
    if(prevData){
      const newData = prevData.filter(item => (new RegExp(filterValue, "i")).test(item.name));
      console.log('New data',newData)
      setDogs(newData);
      window.localStorage.setItem("filterValue", JSON.stringify({"searchbar":filterValue}));
     
    }else{
      getBreeds().then(items => {
        window.localStorage.setItem("data", JSON.stringify(items));
        const newData = items.filter(item => item.name.match(new RegExp(filterValue, "i")));
        console.log('New data',newData);
        setDogs(newData);
        window.localStorage.setItem("filterValue", JSON.stringify({"searchbar":filterValue}));

        })
    }

  }

  return (
    <div
      style={{
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20vh'
      }}
    >
      <div style ={{
        display: 'grid',
        padding: '1rem',
        justifyContent: 'center'
      }}>
      <HeaderWithIcon text = {'Love Dogs ?'} subText = {'Find your favourite breed'} iconName = 'heart' ></HeaderWithIcon>
      </div>
      <div className = 'ui container' style = {{
        display: 'flex',
        justifyContent: 'center',
        
      }}>
        <input type="text" value={filter} style = {{marginRight:'6px'}}onChange={(e) => setFilter(e.target.value)} />  
        <button className='button-t' onClick={() => filterResults(filter)}>
          Search
        </button>
      </div>   

      <div className='container'>
      <div style= {{
          marginLeft: '1rem',
          marginRight: '1rem'
        }}>
        <button className='button-sort' onClick={(e) => sorting(sortDesc)} >
          {`${sortDesc ? 'Sort Asc' : 'Sort Dsc'}`}
        </button>
          </div> 
<div className="card-container">
  {dogs.map((item) => (
    <div className="flip-card">
    <div className="flip-card-inner">
      <div className="flip-card-front">
        <img src={`${item.image.url}`} style={{width:"250px",height:"250px",borderRadius:'20px'}}/>
      </div>
      <div className="flip-card-back">
        <h2>{`${item.name}`}</h2>
        <p>{`${item.temperament}`}</p>
        <p>{`${item.life_span}`}</p>
      </div>
    </div>
  </div>
  
  )) }
</div>

      </div>

    </div>
  );
};

export default Breeds;
