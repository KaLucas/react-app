import { useContext } from 'react';
import { RecordContext } from './record-context';

export function useRecordContext<T>() {
  const ctx = useContext(RecordContext);

  if (ctx === null) {
    throw new Error('useRecordContext deve ser usado dentro do provider');
  }

  return ctx as T;
}
