import React, {useState} from 'react';
import Box from '@mui/material/Box';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Input, Modal, Button, Stack, Popover, Typography} from '@mui/material';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function EditModal({isOpen, handleCloseEditModal, attendanceRecord}) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [popoverOpen, setIsPopoverOpen] = useState(false)
    const handlePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsPopoverOpen(!popoverOpen);
        if (anchorEl === null) {
            setAnchorEl(event.currentTarget);
        } else {
            setAnchorEl(null);
        }
    }
    return (
        <Modal
        open={isOpen}
        onClose={handleCloseEditModal}>
            <Box sx={style}>
                <Table>
                    <TableContainer>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Hours</TableCell>
                                <TableCell>Edit/Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Would want to make sure the student has data to render, otherwise show 'no data' */}
                            {attendanceRecord.map((record) => (
                                <TableRow key={record.Date}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{record.Date}</TableCell>
                                    <TableCell>{record.Hours}</TableCell>
                                    <Popover
                                        id={record.Date}
                                        open={popoverOpen}
                                        onClose={handlePopover}
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                        }}
                                    >
                                        
                                    </Popover>
                                    <TableCell>
                                        <Stack direction="row" spacing={2}>
                                            {/* Incomplete - wanted to have an edit button to edit the hours */}
                                            <Button variant='outlined' onClick={handlePopover}>Edit</Button>
                                            <Button variant='contained' color='error'>Delete</Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </TableContainer>
                    <Stack direction="row" spacing={2}>
                        {/* These buttons would save any changes the user has made */}
                        {/* Would need to implement a way to save any edits made and total hours back to Table Row component */}
                        <Button variant='outlined' onClick={handlePopover}>Save</Button>
                        <Button variant='contained' color='error'>Discard</Button>
                    </Stack>
                </Table>
            </Box>
        </Modal>
    );
}