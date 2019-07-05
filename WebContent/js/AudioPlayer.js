class AudioPlayer extends React.Component{
	constructor(){
		super();
		this.state={
				playlist:[],
				player:false
		}
	}
	
	componentWillMount(){
		this._fetchSongs();
	}
	
	componentDidMount(){
		
	}
	
	componentWillUnmount(){
		
	}
	
	_fetchSongs(){
		
		jQuery.ajax({
			method:'GET',
			dataType:'json',
			url:'data/playlist.json',
			success:(playlist)=>{
				this.setState({playlist})
			}
		});
	}
	
	
	render(){
		let songs=this._getSongs();
		
		return(	<div>
			 {songs}
			</div>
			
		)
		
	}
	
	_getSongs(){
		return this.state.playlist.map((song) =>{
			return(<div>	     	  
				    	<Song
						  song={song}
						  key={song.id}
						  name={song.name}
						  images={song.image}
						  connect={song.connect}
				    	  
						 
						  ></Song> </div>
					  );
				  });
		
	}
}
