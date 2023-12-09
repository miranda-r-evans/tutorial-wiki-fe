import { Modal, Typography, Box } from '@mui/material'

export default function ErrorPopUp ({ saveError, onClose }) {
  return (
    <Modal
      className='error-popup'
      open={saveError}
      onClose={() => onClose()}
      aria-labelledby="error-modal-title"
      aria-describedby="error-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4
        }}>
        <Typography id="error-modal-title" variant="h6" component="h2">
          There was a problem saving your tutorial.
        </Typography>
        <Typography id="error-modal-description" sx={{ mt: 2 }}>
          Check your tutorial for problems and try again.
        </Typography>
      </Box>
    </Modal>
  )
}
