import { useSelector, useDispatch } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import { filterByRating } from '../../redux/reducers/videoGame';
import { Box, Rating, Typography } from '@mui/material';

export default function SelectRating() {
	const { rating } = useSelector((state) => state.videogames.filters);
	const dispatch = useDispatch();

	const handleRating = (event) => {
		dispatch(filterByRating(event.target.value));
	};

	return (
		<div>
			<FormControl sx={{ m: 1, minWidth: 100 }}>
				<Box sx={{display: 'flex', flexDirection:'column', alignItems: 'center' }}>
					<Typography variant='h6' color={"secondary.main"} sx={{fontSize:"15px"}}>RATING</Typography>
					<Rating
						name="simple-controlled"
						value={parseInt(rating)}
						onChange={handleRating}
					/>
				</Box>
			</FormControl>
		</div>
	);
}
