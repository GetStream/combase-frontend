import { useEffect } from 'react';

const empty = [];

export const useOnce = effect => useEffect(effect, empty);
