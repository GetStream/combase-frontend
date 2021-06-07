import algoliasearch from 'algoliasearch/lite';

export const algolia = algoliasearch(process.env.REACT_APP_ALGOLIA_ID, process.env.REACT_APP_ALGOLIA_KEY);

export const agentsSearchIndex = algolia.initIndex('AGENTS');
export const usersSearchIndex = algolia.initIndex('USERS');
export const ticketsSearchIndex = algolia.initIndex('TICKETS');
