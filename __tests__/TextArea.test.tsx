import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { TextArea } from '~/src/components/TextArea';

describe('TextArea', () => {
  it('should display a label and the for id is linked with input', () => {
    render(<TextArea label="My label" />);

    const label = screen.getByText('My label');

    const labelForId = label.getAttribute('for');

    expect(label).toBeInTheDocument();

    const textarea = screen.getByRole('textbox', { name: 'My label' });

    expect(textarea).toBeInTheDocument();

    expect(textarea.getAttribute('id')).toBe(labelForId);
  });
});
