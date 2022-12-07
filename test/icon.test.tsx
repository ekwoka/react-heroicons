import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { ChevronRightSolid, CheckOutline } from '../.';

test('render icon', () => {
  render(<ChevronRightSolid />);
});

test('render icon with class', () => {
  render(<CheckOutline data-testid="blarg" class="floop" />);
  const el = screen.getByTestId('blarg');

  expect(el).toBeDefined();
  expect(el.className).toEqual('floop');
});
