import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import SearchModal from './SearchModal'


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Search() {
  const [expanded, setExpanded] = React.useState(false);
  const [expandedDistance, setExpandedDistance] = React.useState(false);
  const [expandedRating, setExpandedRating] = React.useState(false);
  const [allRestaurant, setAllRestaurant] = React.useState([]);
  const [byArea, setByArea] = React.useState([])
  const [byDistance, setDistance] = React.useState([])
  const [byRating, setByRating] = React.useState([])
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [show, setShow] = React.useState(false);
  const[searchByRating,setSearchByRating]=React.useState([])

  const areas = ["pune", "sangli", "narhe", "delhi"]
  const distances = ["5", "10", "15", "20"]
  const ratings = ["1", "2", "3", "4","5"]

  const hideModal = () => {
    setShow(false);
    setIsModalOpen(false)
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleExpandClickOfDistance = () => {
    setExpandedDistance(!expandedDistance);
  };

  const handleExpandClickOfRating = ()=>{
    setExpandedRating(!expandedRating)
  }

  const searchRestaurant = (area) => {
    axios.get("http://localhost:8080/restaurant/allRestaurant")
      .then(response => {
        setAllRestaurant(response.data)
      })
  }

  const searchRestaurantByRating = (rating) => {
    console.log(typeof(rating))
    axios.get("http://localhost:8080/restaurant/searchByRating/"+parseInt(rating))
      .then(response => {
        setSearchByRating(response.data)
        setShow(true)
        setIsModalOpen(true)
      })
  }
 
  React.useEffect(() => {
    searchRestaurant()
  }, [])

  const findByArea = (area) => {
    setShow(true)
    setIsModalOpen(true)
    setByArea(allRestaurant.filter(element => {
      return element.address.area === area
    }))
  }
  // console.log("byArea",byArea)

  const findByDistance = (distance) => {
    setShow(true)
    setIsModalOpen(true)
    setDistance(allRestaurant.filter(element => {
      return element.distance === distance
    }))
  }
  

  return (
    <div className='d-flex m-10'>
      <Card sx={{ maxWidth: 700 }}>
        <CardHeader
          title="Area"
        />
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent >
            {areas.map(area => {
              return (
                <button className='btn btn-outline-danger' value={area} onClick={(event) => { findByArea(event.target.value) }}>{area}</button>
              )
            })}
          </CardContent>
        </Collapse>
      </Card>
      {isModalOpen && (<SearchModal show={show} handleClose={hideModal} data={byArea} />)}


      <Card sx={{ maxWidth: 700 }}>
        <CardHeader
          title="Distance"
        />
        <CardActions disableSpacing>
          <ExpandMore
            expand={expandedDistance}
            onClick={handleExpandClickOfDistance}
            aria-expanded={expandedDistance}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expandedDistance} timeout="auto" unmountOnExit>
          <CardContent >
            {distances.map(distance => {
              return(
              <button className='btn btn-outline-danger' value={distance} onClick={(event) => findByDistance(event.target.value) }>{distance} km</button>
             )})}
          </CardContent>
        </Collapse>
      </Card>
      {isModalOpen && (<SearchModal show={show} handleClose={hideModal} data={byDistance} />)}


      <Card sx={{ maxWidth: 700 }}>
        <CardHeader
          title="Rating"
        />
        <CardActions disableSpacing>
          <ExpandMore
            expand={expandedRating}
            onClick={handleExpandClickOfRating}
            aria-expanded={expandedRating}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expandedRating} timeout="auto" unmountOnExit>
          <CardContent >
            {ratings.map(rating => {
              return(
              <button className='btn btn-outline-danger' value={rating} onClick={(event) => searchRestaurantByRating(event.target.value) }>{rating}/5 </button>
             )})}
          </CardContent>
        </Collapse>
      </Card>
      {isModalOpen && (<SearchModal show={show} handleClose={hideModal} data={searchByRating} />)}
    
    </div>


  );
}
