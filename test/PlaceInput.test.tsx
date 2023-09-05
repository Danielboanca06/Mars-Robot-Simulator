import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it } from 'vitest';

import PlaceInput from '../src/controls/inputs/ControlInput';
import { ControlsProvider } from '../src/controls/contexts/ControlsProvider';

describe('PlaceInput', () => {
  it('dispatches valid control data on submit', () => {
    const dispatchControls = vi.fn();

    render(
      <ControlsProvider value={{ dispatchControls }}>
        <PlaceInput />
      </ControlsProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/place/i), {
      target: { value: 'place 1 2 north' },
    });

    fireEvent.click(screen.getByText('Submit')); 

    expect(dispatchControls).toHaveBeenCalledWith({
      type: 'UPDATE_CONTROLS',
      data: ['place 1 2 north'],
    });
  });
});
