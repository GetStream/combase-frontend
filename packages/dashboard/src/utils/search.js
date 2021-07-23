import algoliasearch from 'algoliasearch/lite';

const env = import.meta.env;

export const algolia = algoliasearch(env.VITE_APP_ALGOLIA_ID, env.VITE_APP_ALGOLIA_KEY);

export const agentsSearchIndex = algolia.initIndex('AGENTS');
export const usersSearchIndex = algolia.initIndex('USERS');
export const ticketsSearchIndex = algolia.initIndex('TICKETS');
