import { type ReactNode } from 'react';
import { RecordContext } from './record-context';

type Props = {
  value: unknown;
  children: ReactNode;
};

export function RecordProvider({ value, children }: Props) {
  return <RecordContext.Provider value={value}>{children}</RecordContext.Provider>;
}
