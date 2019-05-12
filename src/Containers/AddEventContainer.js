import React, { Component } from 'react';
import ModalEvent from '../Components/ModalEvent'
import { Grid } from 'semantic-ui-react'
import SearchField from '../Components/SearchField'
import '../App.css'
import NoSearchItems from '../Components/NoSearchItems'
import Loading from '../Components/Loading'



class AddEventContainer extends Component {
  state = {
    locations: this.props.pictures,
    filteredLocations: this.props.pictures,
    search: '',
    city: '',
    category:'',
    price: '',
    loading: this.props.loading
  }

  searchHandler=(e)=>{
    console.log(e.target.value);
    this.setState({
      search: e.target.value
    })
  }

  submitSearch=()=>{
    console.log(this.state.search)
    console.log(this.state.filteredLocations)
    let newArr = [...this.state.filteredLocations].filter(locate=>{
      return locate.name.toLowerCase().includes(this.state.search)
    })
    this.setState({
      locations: newArr
    })
  }

  showLoading=()=>{
    this.setState({
      loading: true
    })
  }

  resetLoading=()=>{
    this.setState({
      loading: false
    })
  }

  renderEvent=()=>{
    console.log("render this", this.props.pictures)
    let showEvent = this.props.pictures.map(picture => {
      console.log("sushi",picture)
      return <ModalEvent singleEvent={picture}
      putInTimeline={this.props.putInTimeline}
      timeline={this.props.timeline}
      dateControl={this.props.dateControl}
      />
    })
    return this.props.pictures.length === 0 ? <NoSearchItems/> : showEvent
  }

  renderGrid=()=>{
    console.log("loading",this.props.loading)
    if(this.props.pictures.length===0 && !this.props.loading){
      return <NoSearchItems />
    } else if(this.props.loading){
      return <Loading />
    } else {
      return <Grid relaxed columns={2}>
        {this.renderEvent()}
      </Grid>
    }
  }

  render() {
    return (

      <div style={{"overflow-y":"scroll","paddingBottom":"50px","height":"100vh"}}>
        <div style={{"paddingBottom":"20px","textAlign":"center"}}>
        <SearchField
          searchHandler={this.searchHandler}
          submitSearch={this.submitSearch}
          cityControl={this.props.cityControl}
          searchControl={this.props.searchControl}
          fullFetch={this.props.fullFetch}
          setPrice={this.props.setPrice}
          showLoading={this.showLoading}
          setLoading={this.props.setLoading}
          resetLoading={this.resetLoading}
          />
        </div>
        {this.renderGrid()}
      </div>

    );
  }

}

export default AddEventContainer;
