import axios from "axios";
import { Entry, NewEntryForm, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getById =  async (id: string) : Promise<Patient> => {
  const response = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients/${id}`
  );
  return response.data[0];
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (object: NewEntryForm) => {
  const {data} = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${object.id}/entries`,
    object
  );

  return data;
};

export default {
  getAll, getById, create, createEntry
};

