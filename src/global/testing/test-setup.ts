export const res: any = {
  send: jest.fn(),
  json: jest.fn(),
  status: jest.fn(() => ({ send: jest.fn(), json: jest.fn() })),
};
