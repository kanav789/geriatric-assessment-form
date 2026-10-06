import { useState } from 'react';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import {
  Alert,
  Button,
  Checkbox,
  Code,
  Container,
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { sampleAssessment } from '../fixtures';
import {
  Assessment,
  AssessmentInput,
  emptyAssessmentValues,
  MOBILITY,
  assessmentSchema,
} from '../schema';

const DEFAULT_SAVE_DELAY_MS = 800;

export type AssessmentFormProps = {
  onSave?: (data: Assessment) => void | Promise<void>;
  /** Defaults to 800; tests can pass 0 */
  saveDelayMs?: number;
};

export function AssessmentForm({
  onSave,
  saveDelayMs = DEFAULT_SAVE_DELAY_MS,
}: AssessmentFormProps) {
  const [savedAssessment, setSavedAssessment] = useState<Assessment | null>(null);

  const form = useForm<AssessmentInput, Assessment>({
    mode: 'uncontrolled',
    initialValues: emptyAssessmentValues,
    validate: zod4Resolver(assessmentSchema),
    validateInputOnBlur: true,
    transformValues: (values) => assessmentSchema.parse(values),
  });

  const handleLoadSample = () => {
    form.setValues(sampleAssessment);
    setSavedAssessment(null);
  };

  return (
    <Container size="sm" py="xl">
      <Paper p="xl" withBorder>
        <form
          onSubmit={form.onSubmit(async (parsed) => {
            setSavedAssessment(null);
            await new Promise((resolve) => {
              setTimeout(resolve, saveDelayMs);
            });
            await onSave?.(parsed);
            setSavedAssessment(parsed);
          })}
        >
          <Stack>
            <Title order={2}>Geriatric Care Assessment</Title>

            <TextInput
              label="Medical record number"
              placeholder="MRN-004821"
              key={form.key('mrn')}
              {...form.getInputProps('mrn')}
            />

            <TextInput
              label="Patient name"
              key={form.key('patientName')}
              {...form.getInputProps('patientName')}
            />

            <DateInput
              label="Date of birth"
              valueFormat="YYYY-MM-DD"
              key={form.key('dateOfBirth')}
              {...form.getInputProps('dateOfBirth')}
            />

            <DateInput
              label="Assessment date"
              valueFormat="YYYY-MM-DD"
              maxDate={new Date()}
              key={form.key('assessmentDate')}
              {...form.getInputProps('assessmentDate')}
            />

            <Select
              label="Mobility"
              data={MOBILITY.map((value) => ({
                value,
                label: value.charAt(0).toUpperCase() + value.slice(1),
              }))}
              key={form.key('mobility')}
              {...form.getInputProps('mobility')}
            />

            <NumberInput
              label="Barthel Index"
              min={0}
              max={100}
              step={5}
              key={form.key('barthelIndex')}
              {...form.getInputProps('barthelIndex')}
            />

            <NumberInput
              label="Regular medications"
              min={0}
              max={30}
              key={form.key('medicationCount')}
              {...form.getInputProps('medicationCount')}
            />

            <Checkbox
              label="Pharmacist review requested"
              key={form.key('pharmacistReviewRequested')}
              {...form.getInputProps('pharmacistReviewRequested', {
                type: 'checkbox',
              })}
            />

            <DateInput
              label="Next review date"
              valueFormat="YYYY-MM-DD"
              key={form.key('followUpDate')}
              {...form.getInputProps('followUpDate')}
            />

            <Checkbox
              label="Patient or representative has given consent"
              key={form.key('consentObtained')}
              {...form.getInputProps('consentObtained', {
                type: 'checkbox',
              })}
            />

            <Group>
              <Button type="button" variant="default" onClick={handleLoadSample}>
                Load sample patient
              </Button>
              <Button type="submit" loading={form.submitting} disabled={form.submitting}>
                Save Assessment
              </Button>
            </Group>

            {savedAssessment && (
              <Alert title="Assessment saved" color="green">
                <Code block>{JSON.stringify(savedAssessment, null, 2)}</Code>
              </Alert>
            )}
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
