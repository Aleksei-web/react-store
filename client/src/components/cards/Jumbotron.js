import React from 'react';
import Typewriter from 'typewriter-effect';

const Jombotron = ({text}) => {
	return(
		<Typewriter 
			options={{
				strings: text,
				autoStart: true,
				loop: true,
			}}
		/>
	)
}

export default Jombotron;