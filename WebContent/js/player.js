class Player extends React.Component{
	render(){
		return(
	
             <div>
				 <form className="songForm">

        		 <div className="player-area">
        		 	<audio ref = {(audio) => this._song = audio  }>
        		 		<source src={this.props.connect} type="audio/mpeg"/>
		 			</audio>
		 		</div>
		 		<div className="audioplayer">

		 		<img className="pButton" src="images/prev.png" />
		 		<img className="pButton" src="images/play.png" />
		 		<img className="pButton" src="images/next.png" />
		 			<div className="timeline" >    
		 				<div className="playHead">
		 				</div>
		 			</div>
		 		</div>

		 	</form>
</div>
	);
 }
}