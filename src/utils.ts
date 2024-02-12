export const checkPathUser = (path: string) => {
  return path.split('/').length === 4 && path.startsWith('/api/users/');
};

export const extractId = (path: string) => {
  const request = path.split('/');
  let id = '';
  if (request.length === 4) id = request[3] as string;
  return id;
};
