class Audio extends React.Component{
	constructor() {
		super();
		this.state = {
			player: false,
			playlist:[
{"id": "1", "connect": "songs/Kalimba.mp3", "name": "Kalimba", "image": "images/Chrysanthemum.jpg"},
{"id": "2", "connect": "songs/Maid with the Flaxen Hair.mp3", "name": "Maid with the Flaxen Hair" ,"image": "images/Desert.jpg"},
{"id": "3", "connect": "songs/Sleep Away.mp3", "name": "Sleep Away", "image": "images/Lighthouse.jpg"}
],
		    index:0,
		    timelineWidth :0,
		    duration:"",
		    	};
	}
	
	render(){
		let songs=this._fetchSongs();
		return(
			<div>
			<form className="songForm">
				
				<div className="player-area">
					<audio ref = {(audio) => this._song = audio  }
								  onTimeUpdate={this._timeUpdate.bind(this)}
								  onEnded={this._nextSong.bind(this)}
					>
						<source src={this.state.playlist[this.state.index].connect} type="audio/mpeg"/>
							
					</audio>
						
		        </div>
		        <div className="topPane">
		        <div className="audioplayer">
		            <h1><i>Music Box</i></h1><br/>
		        	<img className="pButton" src="images/prev.png"  onClick={this._prevSong.bind(this)}/>
		            <img className="pButton" src="images/play.png" ref = {(img) => this._play = img }   onClick={this.toggle.bind(this)}/>
		            <img className="pButton" src="images/next.png"  onClick={this._nextSong.bind(this)}/>
		            
		            <div className="timeline" ref = {(div) => this._timeline = div}
		        							  onClick={this._timelineScroll.bind(this)}>    
		           		<div className="playHead" ref = {(div) => this._playHead = div}>
		           		</div>
		           	</div>
		        </div>
		        </div><br/><hr/>
		       
		       <div className="leftPane">
		       {songs}
		       </div>
		     </form>
		     </div>
		        	
		);
	}
	
	_fetchSongs(){
		return this.state.playlist.map((song) =>{
			return(<div>	     	  
				    	<Song
						  song={song}
						  key={song.id}
						  name={song.name}
						  images={song.image}
						  connect={song.connect}
				    	  onPlay={this._selectSong.bind(this)}
				    	  >
				    	alert(connect)</Song> </div>
					  );
				  });
	}
	
	
	toggle(el){
	    if(this.state.player)
	    {
	        el.target.src='images/play.png';
	        this.setState({
				player: !this.state.player
			});
	        this._song.pause();
	    }
	    else if(!this.state.player)
	    {
	        el.target.src='images/pause.png';
	        this.setState({
				player: !this.state.player
			});
	        this._song.play();
	    }
	}
	
	_prevSong(event){
		event.preventDefault();
		if(this.state.index>0){
			--this.state.index;
			this._song.src=this.state.playlist[this.state.index].connect;
			this._song.load();
			if(this.state.player)
				this._song.play();
			else if(!this.state.player)
				this._song.pause();
			
		
		}
		else if(this.state.index==0){
			this.state.index=(this.state.playlist.length-1);
			this._song.src=this.state.playlist[this.state.index].connect;
			this._song.load();
			if(this.state.player)
				this._song.play();
			else if(!this.state.player)
				this._song.pause();
		}
	}
		
	_nextSong(event){
		event.preventDefault();
		if(this.state.index<(this.state.playlist.length-1)){
			++this.state.index;
			alert(this.state.playlist[this.state.index]);
			this._song.src=this.state.playlist[this.state.index].connect;
			this._song.load();
			if(this.state.player)
				this._song.play();
			else if(!this.state.player)
				this._song.pause();
			}
		else{
			this.state.index=0;
			this._song.src=this.state.playlist[this.state.index].connect;
			this._song.load();
			if(this.state.player)
				this._song.play();
			else if(!this.state.player)
				this._song.pause();
		}
			
	}
	
	 _selectSong(song){
		 this.state.index=(song.id)-1;
		 this._song.src=this.state.playlist[this.state.index].connect;
		 this._song.load();
		 if(this.state.player)
				this._song.play();
			else if(!this.state.player)
				this._song.pause();
	 }
	 
        _timeUpdate(event) {
        	event.preventDefault();
        	this.setState({duration:this._song.duration});
			this.setState({timelineWidth:(this._timeline.offsetWidth - this._playHead.offsetWidth)});
	        var playPercent = this.state.timelineWidth * (this._song.currentTime / this.state.duration);
	        this._playHead.style.marginLeft = playPercent + "px";
	    }
        
        _timelineScroll(event){
        	event.preventDefault();
        	this._movePlayHead(event); 
        	this._song.currentTime = this.state.duration * this.clickPercent(event);
        }
        
        
        _movePlayHead(event) {
            var newMargLeft = event.clientX - this.getPosition(this._timeline);

            if (newMargLeft >= 0 && newMargLeft <= this.state.timelineWidth) {
            	this._playHead.style.marginLeft = newMargLeft + "px";
            }
            if (newMargLeft < 0) {
            	this._playHead.style.marginLeft = "0px";
            }
            if (newMargLeft > this.state.timelineWidth) {
            	this._playHead.style.marginLeft = this._timelineWidth + "px";
            }
        }
        
        
        
        clickPercent(event) {
            return (event.clientX - this.getPosition(this._timeline)) / this.state.timelineWidth;
        }
        
        
         getPosition(el) {
        	 return el.getBoundingClientRect().left;
        }
         

	
}
ReactDOM.render(
		<Audio/>,
		document.getElementById('play')
	);

