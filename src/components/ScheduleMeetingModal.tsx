import React from 'react';
import styled from 'styled-components';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

const CustomDialog = styled(Dialog)`
  height: 700px;
  min-width: 320px;
`;

const ScheduleMeetingModal: React.FC<DialogProps> = (props) => {
  return (
    <CustomDialog {...props}>
      <DialogTitle>
        Meet with Me
      </DialogTitle>
    </CustomDialog>
  );
};

export default ScheduleMeetingModal;