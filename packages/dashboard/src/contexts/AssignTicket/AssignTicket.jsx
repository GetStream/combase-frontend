import React, { useState } from 'react';
import AssignTicketModal from './AssignTicketModal';
import { AssignTicketContext } from './context';

const AssignTicket = ({ children }) => {
	const state = useState();
	return (
		<AssignTicketContext.Provider value={state}>
			{children}
			<AssignTicketModal />
		</AssignTicketContext.Provider>
	);
};

export default AssignTicket;