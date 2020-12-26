import StarRating from 'react-star-ratings';

const Star = ({starClick, numberOfStars}) => {

	return (
		<div>
		<StarRating 
			changeRating={() => starClick(numberOfStars)}
			numberOfStars={numberOfStars}
			srarDimension='20px'
			starSpacing='2px'
			starHoverColor='red'
			starEmptyColor='red'
		/>
		</div>
	)
} 

export default Star;