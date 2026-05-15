export function success(data: unknown, message = 'success') {
  return {
    code: 0,
    message,
    data,
  };
}

export function fail(message = 'fail', code = 400) {
  return {
    code,
    message,
    data: null,
  };
}
