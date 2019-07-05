class Song extends React.Component{
	
	render(){
		return(
				
        		 <div onClick={this._handlePlay.bind(this)}>
				   <img src={this.props.images} width="50px" height="50px"/>
					   <h4><i>{this.props.name} </i></h4><hr/>		
				</div>
				
		);
	}
	_handlePlay(event){
		event.preventDefault();
		this.props.onPlay(this.props.song)
	}
	
	
}