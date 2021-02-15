import { getPage } from '../../../src';
import path from 'path';
import { screen } from '@testing-library/react';

describe('custom-render-page', () => {
  describe.each([
    'with-app-fn-enhancer',
    'with-app-object-enhancer',
    'with-component-object-enhancer',
    'with-empty-enhancer',
  ])('%s', (enhancerType) => {
    it("executes app's exports with expected env globals", async () => {
      const consoleError = jest
        .spyOn(console, 'error')
        .mockImplementation(() => null);

      const { render } = await getPage({
        nextRoot: path.join(__dirname, '__fixtures__', enhancerType),
        route: '/a',
        useDocument: true,
      });

      render();

      await screen.findByText('150');

      expect(consoleError).not.toBeCalled();
    });
  });
});
