export const removeToken = async () => {
  try {
    const response = await fetch('/api/removeToken', {
      method: 'DELETE',
    });

    await response.json();
    window.location.href = '/';
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};
