import type { BaseEntity, Id } from '../packages/shared/types/index.js';

type Assert<Condition extends true> = Condition;
type Equal<Left, Right> =
  (<Value>() => Value extends Left ? 1 : 2) extends
  (<Value>() => Value extends Right ? 1 : 2) ? true : false;

export type SharedContractChecks = [
  Assert<Equal<Id, string>>,
  Assert<Equal<BaseEntity['id'], Id>>,
  Assert<Equal<BaseEntity['createdAt'], string | undefined>>,
  Assert<Equal<BaseEntity['updatedAt'], string | undefined>>,
  Assert<Equal<object extends Pick<BaseEntity, 'id'> ? true : false, false>>,
];