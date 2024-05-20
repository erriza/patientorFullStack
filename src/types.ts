
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

interface BaseEntry {
  id?: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes? : Array<Diagnosis['code']>
}

export enum HealthCheckRating  {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: object;
}

interface HospitalEntry  extends BaseEntry {
  type: "Hospital";
  discharge: object;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry =
| HospitalEntry
| OccupationalHealthcareEntry
| HealthCheckEntry;

// type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntryForm = 
| (HospitalEntry & { id: string }) 
| (OccupationalHealthcareEntry & { id: string })
| (HealthCheckEntry & { id: string });
  // export type NewEntryForm = Entry;