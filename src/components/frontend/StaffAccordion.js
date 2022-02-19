import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {IoMdArrowDropdown} from 'react-icons/io'

const StaffAccordion = ({active, inActive}) => {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<IoMdArrowDropdown />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography><strong>Active Staffs - [{active.length}]</strong></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{maxHeight: '80vh', overflowY: 'auto'}}>
            {Object.keys(active).length === 0 ? (
                <span>No active staff found</span>
            ): (
                active.map((data) => {
                  return (
                      <li key={data.id}>{data.name}</li>
                  )
                })
            )}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<IoMdArrowDropdown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography><strong>In-Active Staffs - [{inActive.length}]</strong></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{maxHeight: '80vh', overflowY: 'auto'}}>
           {Object.keys(inActive).length === 0 ? (
                <span>No in-active staff found</span>
            ): (
                inActive.map((data) => {
                  return (
                      <li key={data.id}>{data.name}</li>
                  )
                })
            )}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default StaffAccordion;