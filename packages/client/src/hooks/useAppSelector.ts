import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '../store/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
