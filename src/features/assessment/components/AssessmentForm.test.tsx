import { render, screen, userEvent, waitFor } from '@test-utils';
import { vi } from 'vite-plus/test';
import { sampleAssessment } from '../fixtures';
import { AssessmentForm } from './AssessmentForm';

describe('AssessmentForm', () => {
  it('loads the sample patient and calls onSave with parsed values', async () => {
    const onSave = vi.fn();
    const user = userEvent.setup();

    render(<AssessmentForm onSave={onSave} saveDelayMs={0} />);

    await user.click(screen.getByRole('button', { name: /load sample patient/i }));
    await user.click(screen.getByRole('button', { name: /save assessment/i }));

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledTimes(1);
    });

    expect(onSave).toHaveBeenCalledWith(sampleAssessment);
  });
});
