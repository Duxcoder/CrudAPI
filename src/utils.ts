export const checkPathUser = (path: string) => {
  return path.split('/').length === 4 && path.startsWith('/api/users/');
};
