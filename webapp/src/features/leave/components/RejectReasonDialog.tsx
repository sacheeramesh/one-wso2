/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@wso2/oxygen-ui";
import { REJECTION_REASON_MAX, rejectionReasonProblem } from "../util/franceLeave";
import { OTHER_AUTHORIZED_APPROVE } from "../util/leaveCopy";

const COPY = OTHER_AUTHORIZED_APPROVE.rejectDialog;

// Asks the lead why they are rejecting an Other Authorized request. The text is
// validated inline and handed back trimmed; the parent mounts this fresh per
// request, so it always opens empty.
export default function RejectReasonDialog({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: (reason: string) => void;
}) {
  const [reason, setReason] = useState("");
  // The error appears once they have typed or tried, not on a fresh dialog.
  const [touched, setTouched] = useState(false);

  const problem = rejectionReasonProblem(reason);
  const showProblem = touched && problem !== "";

  const submit = () => {
    setTouched(true);
    if (problem) return;
    onConfirm(reason.trim());
  };

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontSize: 17, fontWeight: 700 }}>{COPY.title}</DialogTitle>
      <DialogContent dividers>
        <Typography sx={{ fontSize: 13, mb: 1.5 }}>{COPY.body}</Typography>
        <TextField
          autoFocus
          multiline
          minRows={3}
          fullWidth
          label={COPY.label}
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
            setTouched(true);
          }}
          error={showProblem}
          helperText={showProblem ? problem : undefined}
        />
        <Typography sx={{ fontSize: 11.5, color: "text.secondary", mt: 0.5, textAlign: "right" }}>
          {COPY.counter(reason.trim().length, REJECTION_REASON_MAX)}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button size="small" onClick={onCancel}>
          {COPY.cancel}
        </Button>
        <Button size="small" variant="contained" color="error" onClick={submit}>
          {COPY.confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
