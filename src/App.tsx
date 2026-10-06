import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { AssessmentForm } from './features/assessment/components/AssessmentForm';


export default function App() {
  return (
    <MantineProvider >
      <DatesProvider settings={{}}>
        <AssessmentForm />
      </DatesProvider>
    </MantineProvider>
  );
}
