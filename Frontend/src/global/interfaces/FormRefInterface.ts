export interface FormRef<T> {
  validateForm: () => Promise<Partial<Record<keyof T, string>>>;
  getValues: () => T;
}
