import { createContext, useContext } from 'react';

export const RoleContext = createContext({ openRole: () => {}, selectedId: null });
export const useRole = () => useContext(RoleContext);
