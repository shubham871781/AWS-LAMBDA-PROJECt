import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import axios from 'axios'
import { API_URL, DELETEANNUALREPORT } from "../../../../Apiconstant/Apiconstant"
// ----------------------------------------------------------------------
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Loader from "../../../../commocomponent/Loader"
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function UserMoreMenu({ id }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const success = () => { }
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const deleteDonaton = (id) => {
    setLoading(true)
    const durl = `${API_URL}/${DELETEANNUALREPORT}`;
    axios.post(durl, {
      id: id,
    })
      .then((response) => {
        if (response.status === 200) {
          success(toast.success(response.data.message))
          navigate('/dashboard/annual-reports', { state: {status:'done'} });
        }
        setLoading(false)
      })
  };
  return (
    <>
      {loading && (
        <Loader />
      )}

      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} onClick={() => deleteDonaton(id)} />
          <ToastContainer />
        </MenuItem>
      </Menu>
    </>
  );
}
