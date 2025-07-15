import * as React from 'react';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { cleanToFilter } from '../../redux/actions/videoGame';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

export default function DisableElevation() {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(cleanToFilter());
  };

  return (
    <Button
      onClick={handleClick}
      variant="outlined"
      startIcon={<RotateLeftIcon />}
      size="small"
      sx={{
        mt: 2,
        px: 2,
        textTransform: 'none',
        fontWeight: 'medium',
        borderColor: 'secondary.main',
        color: 'secondary.main',
        '&:hover': {
          borderColor: 'secondary.dark',
          backgroundColor: 'action.hover',
        },
      }}
    >
      Clean filters
    </Button>
  );
}
